import { useLang } from '../context/LanguageContext.jsx';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShieldCheck, Menu, ChevronDown } from 'lucide-react';

export function AppLayout({ children }) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <Link className="brand" to="/">
            <span className="brandmark">
              <ShieldCheck size={21} />
            </span>
            <span>
              Worker Benefits Navigator
              <span className="brand-sub">{t.homeSub}</span>
            </span>
          </Link>
          <button
            className="mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <Menu />
          </button>
          <nav className={open ? 'navlinks open' : 'navlinks'}>
            <NavLink to="/">{t.home}</NavLink>
            <NavLink to="/find">{t.find}</NavLink>
            <NavLink to="/schemes">{t.browse}</NavLink>
            <NavLink to="/compare">{t.compare}</NavLink>
            <NavLink to="/about">{t.about}</NavLink>
          </nav>
          <button className="lang" onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}>
            {lang === 'en' ? 'ಕನ್ನಡ' : 'English'} <ChevronDown size={14} />
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="container foot">
          <div>
            <Link className="brand light" to="/">
              <span className="brandmark">
                <ShieldCheck size={20} />
              </span>
              <span>Worker Benefits Navigator</span>
            </Link>
            <p>{t.footer}</p>
          </div>
          <div className="footlinks">
            <Link to="/find">{t.find}</Link>
            <Link to="/schemes">{t.browse}</Link>
            <Link to="/about">{t.about}</Link>
          </div>
        </div>
        <div className="container footnote">© 2026 Worker Benefits Navigator</div>
      </footer>
    </>
  );
}
