# Herbowicz Consulting — PRD

## Original problem
Build a classic website for AI business consultant Grzegorz Herbowicz at herbowicz.com.
- White, pale, minimalistic colors
- Use the Leibniz motto: "We live in the best of possible worlds"
- Use provided portrait
- Allow login for users (JWT + Google), redirecting to a booking flow
- Bilingual EN/PL with switch
- Contact messages routed to herbowicz@gmail.com via Resend

## Personas
- **Visitor / Prospect** — browses site, learns about services, sends contact inquiry.
- **Authenticated Client** — registers/logs in, books a consultation slot via calendar.
- **Owner (Grzegorz)** — receives contact + booking emails, manages incoming requests.

## Implemented (2026-02)
- FastAPI backend with:
  - JWT auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
  - Emergent Google session exchange: `/api/auth/google/session`
  - Contact form: `/api/contact` (stored in Mongo + emailed via Resend)
  - Bookings: `POST /api/bookings`, `GET /api/bookings` (auth-gated; emails owner + user confirmation)
  - Admin seeded on startup; indexes created
- React frontend (editorial Cormorant Garamond + Manrope, warm off-white palette):
  - Hero with portrait + Leibniz quote
  - About with stats
  - Services (3 specialisms)
  - Approach (4 pillars)
  - Contact form
  - Auth modal (Login/Register tabs + Google sign-in)
  - Auth callback handler for Emergent OAuth
  - Protected Dashboard with shadcn Calendar + time slots + booking list
  - EN/PL language switcher
  - Sticky scroll-aware navigation
  - Footer with email + LinkedIn

## Backlog
- P1: Custom verified Resend domain (FROM_EMAIL) once DNS is configured for herbowicz.com
- P1: Admin view of all bookings/contact messages
- P2: Calendar integration (Google Calendar sync of confirmed bookings)
- P2: Articles / Blog section
- P2: Testimonials section
- P2: Reschedule / cancel booking flow

## Next actions
- User can review preview, share domain, and we can wire production Resend domain.
