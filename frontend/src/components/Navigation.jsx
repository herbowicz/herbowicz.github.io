import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation({ onOpenAuth }) {
  const { t, lang, toggle } = useLang();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      data-testid="main-nav"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-[#FAF9F6]/85 border-b border-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <Link to="/" data-testid="brand-link" className="flex items-center gap-3 group">
          <span className="font-serif text-2xl tracking-tighter">Herbowicz</span>
          <span className="caption text-stone-500 hidden md:inline">Consulting</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => scrollTo("about")} data-testid="nav-about" className="text-sm hover:opacity-60 transition-opacity">
            {t.nav.about}
          </button>
          <button onClick={() => scrollTo("services")} data-testid="nav-services" className="text-sm hover:opacity-60 transition-opacity">
            {t.nav.services}
          </button>
          <button onClick={() => scrollTo("approach")} data-testid="nav-approach" className="text-sm hover:opacity-60 transition-opacity">
            {t.nav.approach}
          </button>
          <button onClick={() => scrollTo("contact")} data-testid="nav-contact" className="text-sm hover:opacity-60 transition-opacity">
            {t.nav.contact}
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={toggle}
            data-testid="lang-toggle"
            className="caption text-stone-700 hover:text-stone-900 transition-colors"
            aria-label="Switch language"
          >
            <span className={lang === "en" ? "text-stone-900" : "text-stone-400"}>EN</span>
            <span className="mx-1.5 text-stone-300">/</span>
            <span className={lang === "pl" ? "text-stone-900" : "text-stone-400"}>PL</span>
          </button>

          {user ? (
            <>
              <Link
                to="/dashboard"
                data-testid="nav-portal-link"
                className="hidden sm:inline text-sm hover:opacity-60 transition-opacity"
              >
                {t.nav.portal}
              </Link>
              <button
                onClick={logout}
                data-testid="nav-logout-btn"
                className="caption px-4 py-2 border border-stone-900/20 hover:border-stone-900 transition-colors"
              >
                {t.nav.logout}
              </button>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              data-testid="nav-login-btn"
              className="caption px-4 py-2 border border-stone-900/20 hover:border-stone-900 transition-colors"
            >
              {t.nav.login}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
