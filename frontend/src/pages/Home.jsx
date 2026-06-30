import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useLang } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const PORTRAIT = "https://customer-assets.emergentagent.com/job_c0fbfacb-64e4-422f-8e9d-db0fd4293650/artifacts/1ggdtw3h_gh-shirt2.png";
const ABOUT_BG = "https://images.unsplash.com/photo-1668410788478-8507c28d220c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGlnaHQlMjBzaGFkb3dzJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4MjgyOTYwMHww&ixlib=rb-4.1.0&q=85";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Home({ onOpenAuth, onBook }) {
  const { t } = useLang();
  const { user } = useAuth();
  const location = useLocation();

  // scroll-to from nav
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [location.state]);

  return (
    <main className="bg-[#FAF9F6] text-stone-900">
      <Hero t={t} user={user} onOpenAuth={onOpenAuth} onBook={onBook} />
      <About t={t} bg={ABOUT_BG} />
      <Services t={t} />
      <Approach t={t} />
      <Contact t={t} />
    </main>
  );
}

function Hero({ t, user, onOpenAuth, onBook }) {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 reveal-up">
          <p data-testid="hero-eyebrow" className="caption text-stone-500 mb-8">
            {t.hero.eyebrow}
          </p>
          <h1
            data-testid="hero-quote"
            className="font-serif font-light text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[0.95]"
          >
            {t.hero.quoteMain}
            <br />
            <span className="italic text-stone-700">{t.hero.quoteAccent}</span>
            <span className="font-sans text-base font-normal text-stone-400 align-top ml-3">*</span>
          </h1>
          <p className="caption mt-6 text-stone-500" data-testid="hero-author">
            {t.hero.quoteAuthor}
          </p>

          <div className="mt-12 max-w-xl reveal-up delay-2">
            <p className="font-serif text-2xl md:text-3xl tracking-tight leading-snug">
              {t.hero.name}
            </p>
            <p className="mt-3 text-stone-600 text-base md:text-lg leading-relaxed">
              {t.hero.tagline}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={user ? onBook : onOpenAuth}
                data-testid="hero-book-btn"
                className="bg-stone-900 text-[#FAF9F6] px-8 py-4 caption hover:bg-stone-700 transition-colors"
              >
                {t.hero.ctaBook}
              </button>
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="hero-learn-btn"
                className="border border-stone-900/30 px-8 py-4 caption hover:border-stone-900 hover:bg-stone-900 hover:text-[#FAF9F6] transition-all"
              >
                {t.hero.ctaLearn}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 reveal-up delay-3 relative flex flex-col items-center lg:items-end">
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden bg-[#F2EFE9] ring-1 ring-stone-900/10 shadow-sm">
            <img
              src={PORTRAIT}
              alt="Grzegorz Herbowicz"
              data-testid="hero-portrait"
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <p className="caption text-stone-500 mt-4">Grzegorz Herbowicz · Warsaw</p>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-stone-900/5" />
    </section>
  );
}

function About({ t, bg }) {
  return (
    <section id="about" className="py-24 md:py-40 bg-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4">
          <p className="caption text-stone-500">{t.about.eyebrow}</p>
          <div className="mt-6 aspect-[3/4] overflow-hidden">
            <img src={bg} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-8 md:pl-8">
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.05]">
            {t.about.title}
          </h2>
          <div className="mt-10 space-y-6 text-stone-700 text-base md:text-lg leading-relaxed max-w-2xl">
            <p>{t.about.body1}</p>
            <p>{t.about.body2}</p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl">
            <Stat value={t.about.stat1Value} label={t.about.stat1Label} />
            <Stat value={t.about.stat2Value} label={t.about.stat2Label} />
            <Stat value={t.about.stat3Value} label={t.about.stat3Label} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-serif text-4xl md:text-5xl tracking-tighter">{value}</p>
      <p className="caption text-stone-500 mt-2 leading-snug">{label}</p>
    </div>
  );
}

function Services({ t }) {
  return (
    <section id="services" className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="caption text-stone-500">{t.services.eyebrow}</p>
            <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tighter mt-4 leading-tight max-w-2xl">
              {t.services.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-900/10">
          {t.services.items.map((s, i) => (
            <div
              key={i}
              data-testid={`service-card-${i}`}
              className="bg-[#FAF9F6] p-10 md:p-12 hover:bg-[#F2EFE9] transition-colors duration-500 group"
            >
              <p className="font-serif text-stone-400 text-3xl mb-8">{s.n}</p>
              <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-4">{s.name}</h3>
              <p className="text-stone-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach({ t }) {
  return (
    <section id="approach" className="py-24 md:py-40 bg-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="caption text-stone-500">{t.approach.eyebrow}</p>
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tighter mt-4 leading-[1.05]">
            {t.approach.title}
          </h2>
          <p className="mt-8 text-stone-700 text-base md:text-lg leading-relaxed max-w-md">
            {t.approach.body}
          </p>
        </div>
        <div className="md:col-span-7 md:pl-10 grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone-900/10">
          {t.approach.pillars.map((p, i) => (
            <div key={i} className="bg-[#F2EFE9] p-8 md:p-10">
              <p className="caption text-stone-400">0{i + 1}</p>
              <h4 className="font-serif text-2xl mt-3 tracking-tight">{p.title}</h4>
              <p className="text-stone-600 mt-3 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState(""); // '', 'sending', 'success', 'error'

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, form, { withCredentials: true });
      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="caption text-stone-500">{t.contact.eyebrow}</p>
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tighter mt-4 leading-[1.05]">
            {t.contact.title}
          </h2>
          <p className="mt-8 text-stone-700 text-base md:text-lg leading-relaxed max-w-md">
            {t.contact.body}
          </p>
          <p className="mt-10 caption text-stone-500">Direct</p>
          <a
            href="mailto:herbowicz@gmail.com"
            className="font-serif text-2xl md:text-3xl tracking-tight mt-2 inline-block hover:opacity-60 transition-opacity"
          >
            herbowicz@gmail.com
          </a>
        </div>

        <form onSubmit={submit} className="md:col-span-7 md:pl-10 space-y-8" data-testid="contact-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label={t.contact.name} testid="contact-name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label={t.contact.email} testid="contact-email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          </div>
          <Field label={t.contact.company} testid="contact-company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
          <div>
            <label className="caption text-stone-500 block mb-2">{t.contact.message}</label>
            <textarea
              data-testid="contact-message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border-b border-stone-900/20 py-2 focus:outline-none focus:border-stone-900 transition-colors resize-none"
            />
          </div>
          {status === "success" && (
            <p data-testid="contact-success" className="text-stone-700 font-serif italic">{t.contact.success}</p>
          )}
          {status === "error" && (
            <p data-testid="contact-error" className="text-red-700 text-sm">{t.contact.error}</p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            data-testid="contact-submit-btn"
            className="bg-stone-900 text-[#FAF9F6] px-10 py-4 caption hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {status === "sending" ? t.contact.sending : t.contact.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required = false, testid }) {
  return (
    <div>
      <label className="caption text-stone-500 block mb-2">{label}</label>
      <input
        data-testid={testid}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-stone-900/20 py-2 focus:outline-none focus:border-stone-900 transition-colors"
      />
    </div>
  );
}
