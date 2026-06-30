from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import uuid
import logging
import bcrypt
import jwt
import resend
import httpx
from datetime import datetime, timezone, timedelta
from typing import Optional, List

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field

# ---------------- Config ----------------
JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ["JWT_SECRET"]
RESEND_API_KEY = os.environ["RESEND_API_KEY"]
CONTACT_RECIPIENT = os.environ.get("CONTACT_RECIPIENT", "herbowicz@gmail.com")
FROM_EMAIL = os.environ.get("FROM_EMAIL", "onboarding@resend.dev")

resend.api_key = RESEND_API_KEY

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("herbowicz")

# ---------------- Database ----------------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# ---------------- App ----------------
app = FastAPI(title="Herbowicz Consulting API")
api = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- Helpers ----------------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7 * 24 * 60 * 60,
        path="/",
    )


def clear_auth_cookie(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("session_token", path="/")


async def get_current_user(request: Request) -> dict:
    # 1) Try JWT cookie / Bearer
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if token:
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            if payload.get("type") == "access":
                user = await db.users.find_one(
                    {"user_id": payload["sub"]}, {"_id": 0, "password_hash": 0}
                )
                if user:
                    return user
        except jwt.PyJWTError:
            pass

    # 2) Try session_token (Emergent Google Auth)
    session_token = request.cookies.get("session_token")
    if not session_token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            session_token = auth[7:]
    if session_token:
        session = await db.sessions.find_one({"session_token": session_token}, {"_id": 0})
        if session:
            expires_at = session.get("expires_at")
            if isinstance(expires_at, str):
                expires_at = datetime.fromisoformat(expires_at)
            if expires_at and expires_at.tzinfo is None:
                expires_at = expires_at.replace(tzinfo=timezone.utc)
            if expires_at and expires_at > datetime.now(timezone.utc):
                user = await db.users.find_one(
                    {"user_id": session["user_id"]}, {"_id": 0, "password_hash": 0}
                )
                if user:
                    return user

    raise HTTPException(status_code=401, detail="Not authenticated")


def send_email(subject: str, html: str, to: str = None):
    try:
        resend.Emails.send({
            "from": f"Herbowicz Consulting <{FROM_EMAIL}>",
            "to": [to or CONTACT_RECIPIENT],
            "subject": subject,
            "html": html,
            "reply_to": CONTACT_RECIPIENT,
        })
        return True
    except Exception as e:
        logger.error(f"Resend error: {e}")
        return False


# ---------------- Models ----------------
class RegisterReq(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str = Field(min_length=1)


class LoginReq(BaseModel):
    email: EmailStr
    password: str


class ContactReq(BaseModel):
    name: str
    email: EmailStr
    message: str
    company: Optional[str] = ""


class BookingReq(BaseModel):
    date: str  # YYYY-MM-DD
    time: str  # HH:MM
    topic: str
    notes: Optional[str] = ""


# ---------------- Routes ----------------
@api.get("/")
async def root():
    return {"status": "ok", "service": "herbowicz-consulting"}


# ---- Auth: JWT ----
@api.post("/auth/register")
async def register(payload: RegisterReq, response: Response):
    email = payload.email.lower().strip()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    user_doc = {
        "user_id": user_id,
        "email": email,
        "name": payload.name.strip(),
        "password_hash": hash_password(payload.password),
        "provider": "password",
        "picture": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.users.insert_one(user_doc)
    token = create_access_token(user_id, email)
    set_auth_cookie(response, token)
    return {
        "user_id": user_id,
        "email": email,
        "name": payload.name.strip(),
        "picture": None,
        "token": token,
    }


@api.post("/auth/login")
async def login(payload: LoginReq, response: Response):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not user.get("password_hash"):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["user_id"], email)
    set_auth_cookie(response, token)
    return {
        "user_id": user["user_id"],
        "email": user["email"],
        "name": user.get("name"),
        "picture": user.get("picture"),
        "token": token,
    }


@api.post("/auth/logout")
async def logout(response: Response, request: Request):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.sessions.delete_one({"session_token": session_token})
    clear_auth_cookie(response)
    return {"ok": True}


@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


# ---- Auth: Emergent Google ----
@api.post("/auth/google/session")
async def google_session(request: Request, response: Response):
    body = await request.json()
    session_id = body.get("session_id")
    if not session_id:
        raise HTTPException(status_code=400, detail="Missing session_id")

    async with httpx.AsyncClient(timeout=15.0) as http:
        r = await http.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id},
        )
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session")
    data = r.json()
    email = (data.get("email") or "").lower()
    name = data.get("name") or email.split("@")[0]
    picture = data.get("picture")
    session_token = data["session_token"]

    user = await db.users.find_one({"email": email})
    if not user:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user_doc = {
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "provider": "google",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.users.insert_one(user_doc)
    else:
        user_id = user["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}},
        )

    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.sessions.update_one(
        {"session_token": session_token},
        {"$set": {
            "session_token": session_token,
            "user_id": user_id,
            "expires_at": expires_at,
            "created_at": datetime.now(timezone.utc),
        }},
        upsert=True,
    )
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7 * 24 * 60 * 60,
        path="/",
    )
    return {"user_id": user_id, "email": email, "name": name, "picture": picture}


# ---- Contact ----
@api.post("/contact")
async def contact(payload: ContactReq):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "company": payload.company or "",
        "message": payload.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_messages.insert_one(doc)

    html = f"""
    <div style="font-family:Manrope,Arial,sans-serif;color:#1C1B1A">
      <h2 style="font-family:Georgia,serif;font-weight:300">New inquiry — herbowicz.com</h2>
      <p><strong>Name:</strong> {doc['name']}</p>
      <p><strong>Email:</strong> {doc['email']}</p>
      <p><strong>Company:</strong> {doc['company'] or '—'}</p>
      <hr style="border:none;border-top:1px solid #E8E5DF;margin:24px 0"/>
      <p style="white-space:pre-wrap;line-height:1.6">{doc['message']}</p>
    </div>
    """
    send_email(f"Inquiry from {doc['name']} — herbowicz.com", html)
    return {"ok": True}


# ---- Bookings (authenticated) ----
@api.post("/bookings")
async def create_booking(payload: BookingReq, user: dict = Depends(get_current_user)):
    doc = {
        "id": str(uuid.uuid4()),
        "user_id": user["user_id"],
        "user_email": user["email"],
        "user_name": user.get("name"),
        "date": payload.date,
        "time": payload.time,
        "topic": payload.topic.strip(),
        "notes": (payload.notes or "").strip(),
        "status": "requested",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.bookings.insert_one(doc)
    doc.pop("_id", None)

    # Email to consultant
    html = f"""
    <div style="font-family:Manrope,Arial,sans-serif;color:#1C1B1A">
      <h2 style="font-family:Georgia,serif;font-weight:300">New consultation request</h2>
      <p><strong>{user.get('name')}</strong> ({user['email']}) requested a consultation.</p>
      <p><strong>Date:</strong> {doc['date']} at {doc['time']}</p>
      <p><strong>Topic:</strong> {doc['topic']}</p>
      <p><strong>Notes:</strong></p>
      <p style="white-space:pre-wrap;line-height:1.6">{doc['notes'] or '—'}</p>
    </div>
    """
    send_email(f"Consultation request — {doc['date']} {doc['time']}", html)

    # Confirmation to user
    confirm = f"""
    <div style="font-family:Manrope,Arial,sans-serif;color:#1C1B1A">
      <h2 style="font-family:Georgia,serif;font-weight:300">Thank you, {user.get('name')}.</h2>
      <p>Your consultation request has been received.</p>
      <p><strong>Date:</strong> {doc['date']} at {doc['time']}</p>
      <p><strong>Topic:</strong> {doc['topic']}</p>
      <p>Grzegorz will personally confirm your slot shortly.</p>
      <hr style="border:none;border-top:1px solid #E8E5DF;margin:24px 0"/>
      <p style="font-style:italic;color:#57534E">"We live in the best of possible worlds." — Leibniz</p>
    </div>
    """
    send_email("Your consultation request — Herbowicz Consulting", confirm, to=user["email"])

    return {"ok": True, "booking": doc}


@api.get("/bookings")
async def list_bookings(user: dict = Depends(get_current_user)):
    items = await db.bookings.find(
        {"user_id": user["user_id"]}, {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    return items


# ---------------- Startup ----------------
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.users.create_index("user_id", unique=True)
    await db.sessions.create_index("session_token", unique=True)
    await db.bookings.create_index("user_id")

    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL")
    admin_password = os.environ.get("ADMIN_PASSWORD")
    if admin_email and admin_password:
        existing = await db.users.find_one({"email": admin_email.lower()})
        if not existing:
            await db.users.insert_one({
                "user_id": f"user_{uuid.uuid4().hex[:12]}",
                "email": admin_email.lower(),
                "name": "Grzegorz Herbowicz",
                "password_hash": hash_password(admin_password),
                "provider": "password",
                "picture": None,
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            })


@app.on_event("shutdown")
async def shutdown():
    client.close()


app.include_router(api)
