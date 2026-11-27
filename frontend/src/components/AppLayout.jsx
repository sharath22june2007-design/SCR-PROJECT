import { useLang } from '../context/LanguageContext.jsx';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, ChevronDown } from 'lucide-react';

export function AppLayout({ children }) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

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
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="primary-navigation"
          >
            <Menu />
          </button>
          <nav
            id="primary-navigation"
            className={open ? 'navlinks open' : 'navlinks'}
          >
            <NavLink to="/" onClick={() => setOpen(false)}>
              {t.home}
            </NavLink>
            <NavLink to="/find" onClick={() => setOpen(false)}>
              {t.find}
            </NavLink>
            <NavLink to="/schemes" onClick={() => setOpen(false)}>
              {t.browse}
            </NavLink>
            <NavLink to="/compare" onClick={() => setOpen(false)}>
              {t.compare}
            </NavLink>
            <NavLink to="/learn" onClick={() => setOpen(false)}>
              {t.learn}
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              {t.about}
            </NavLink>
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
            <Link to="/learn">{t.learn}</Link>
            <Link to="/about">{t.about}</Link>
          </div>
        </div>
        <div className="container footnote">© 2026 Worker Benefits Navigator</div>
      </footer>
    </>
  );
}
