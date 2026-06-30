import React, { useState } from "react";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { useLang } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { X } from "lucide-react";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
function startGoogleAuth() {
  const redirectUrl = window.location.origin + "/dashboard";
  window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
}

function formatErr(detail) {
  if (!detail) return "Something went wrong.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return String(detail);
}

export default function AuthModal({ open, onClose, onSuccess }) {
  const { t } = useLang();
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
    setBusy(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      reset();
      onClose();
      onSuccess?.();
    } catch (err) {
      setError(formatErr(err.response?.data?.detail) || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-testid="auth-modal"
        className="max-w-md p-0 bg-[#FAF9F6] border border-black/10 rounded-none shadow-2xl"
      >
        <div className="p-10 relative">
          <button
            onClick={onClose}
            data-testid="auth-close-btn"
            className="absolute top-5 right-5 text-stone-500 hover:text-stone-900"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <p className="caption text-stone-500">{t.auth.title}</p>
          <h2 className="font-serif text-4xl mt-2 tracking-tighter">
            {mode === "login" ? t.auth.subtitleLogin : t.auth.subtitleRegister}
          </h2>

          <div className="flex gap-6 mt-8 border-b border-stone-900/10">
            <button
              data-testid="auth-tab-login"
              onClick={() => setMode("login")}
              className={`pb-3 text-sm transition-colors ${
                mode === "login" ? "text-stone-900 border-b border-stone-900 -mb-px" : "text-stone-500"
              }`}
            >
              {t.auth.tabLogin}
            </button>
            <button
              data-testid="auth-tab-register"
              onClick={() => setMode("register")}
              className={`pb-3 text-sm transition-colors ${
                mode === "register" ? "text-stone-900 border-b border-stone-900 -mb-px" : "text-stone-500"
              }`}
            >
              {t.auth.tabRegister}
            </button>
          </div>

          <button
            onClick={startGoogleAuth}
            data-testid="auth-google-btn"
            className="w-full mt-6 py-3 border border-stone-900/20 hover:border-stone-900 transition-colors flex items-center justify-center gap-3 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#1C1B1A"
                d="M21.35 11.1H12v3.2h5.35c-.23 1.2-1.42 3.5-5.35 3.5-3.22 0-5.85-2.66-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.06.78 3.77 1.45l2.57-2.48C16.85 3.45 14.7 2.5 12 2.5 6.96 2.5 2.9 6.55 2.9 11.85c0 5.3 4.06 9.35 9.1 9.35 5.26 0 8.74-3.7 8.74-8.9 0-.6-.07-1.05-.39-1.2z"
              />
            </svg>
            {t.auth.google}
          </button>

          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-stone-900/10" />
            <span className="caption text-stone-400">{t.auth.or}</span>
            <span className="flex-1 h-px bg-stone-900/10" />
          </div>

          <form onSubmit={submit} className="space-y-5">
            {mode === "register" && (
              <div>
                <label className="caption text-stone-500 block mb-2">{t.auth.name}</label>
                <input
                  data-testid="auth-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-stone-900/20 py-2 focus:outline-none focus:border-stone-900 transition-colors"
                />
              </div>
            )}
            <div>
              <label className="caption text-stone-500 block mb-2">{t.auth.email}</label>
              <input
                data-testid="auth-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-stone-900/20 py-2 focus:outline-none focus:border-stone-900 transition-colors"
              />
            </div>
            <div>
              <label className="caption text-stone-500 block mb-2">{t.auth.password}</label>
              <input
                data-testid="auth-password-input"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-stone-900/20 py-2 focus:outline-none focus:border-stone-900 transition-colors"
              />
            </div>
            {error && (
              <p data-testid="auth-error" className="text-sm text-red-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              data-testid="auth-submit-btn"
              className="w-full bg-stone-900 text-[#FAF9F6] py-3 caption hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {busy ? "…" : mode === "login" ? t.auth.submitLogin : t.auth.submitRegister}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            data-testid="auth-switch-btn"
            className="mt-6 text-sm text-stone-500 hover:text-stone-900 transition-colors block"
          >
            {mode === "login" ? t.auth.switchToRegister : t.auth.switchToLogin}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
