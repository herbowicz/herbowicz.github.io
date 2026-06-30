import React from "react";
import { useLang } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-stone-900/10 py-12 md:py-16 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-serif text-3xl tracking-tighter">Herbowicz</p>
          <p className="caption text-stone-500 mt-2">{t.footer.tagline}</p>
        </div>
        <div>
          <p className="caption text-stone-500 mb-3">{t.nav.contact}</p>
          <a
            href="mailto:herbowicz@gmail.com"
            className="text-sm hover:opacity-60 transition-opacity block"
            data-testid="footer-email"
          >
            herbowicz@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/gherbowicz"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-linkedin"
            className="text-sm hover:opacity-60 transition-opacity block mt-1"
          >
            linkedin.com/in/gherbowicz
          </a>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} Grzegorz Herbowicz. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
