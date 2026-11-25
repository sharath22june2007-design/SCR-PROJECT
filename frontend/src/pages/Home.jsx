import { useLang } from '../context/LanguageContext.jsx';
import { useState, useEffect } from 'react';
import { getSchemes } from '../services/api.js';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  LockKeyhole,
  Info,
  BookOpen,
} from 'lucide-react';
import { Notice } from '../components/Notice.jsx';
import { LoadingError } from '../components/LoadingError.jsx';
import { SchemeCard } from '../components/SchemeCard.jsx';
import { toggleCompare } from '../utils/compare.js';

export function Home() {
  const { t } = useLang();
  const [rows, setRows] = useState([]),
    [error, setError] = useState('');
  useEffect(() => {
    getSchemes()
      .then((x) => setRows(x.schemes.slice(0, 3)))
      .catch((e) => setError(e.message));
  }, []);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> PUBLIC BENEFITS, MADE CLEAR
            </div>
            <h1>{t.hero}</h1>
            <p>{t.intro}</p>
            <div className="hero-actions">
              <Link className="btn primary" to="/find">
                {t.findBtn}
                <ArrowRight size={18} />
              </Link>
              <Link className="btn secondary" to="/schemes">
                {t.explore}
              </Link>
            </div>
            <div className="trustline">
              <ShieldCheck size={17} /> Informational guidance · Official sources linked ·
              No enrolment here
            </div>
          </div>
          <div className="hero-art">
            <div className="art-circle"></div>
            <div className="art-card main-art">
              <div className="art-icon">
                <ShieldCheck />
              </div>
              <div className="tiny-label">SCHEME EXPLORER</div>
              <strong>Security for every stage</strong>
              <div className="art-bars">
                <i />
                <i />
                <i />
              </div>
              <div className="art-row">
                <span>Verified sources</span>
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="art-card float-art">
              <div className="round-icon">
                <Wallet size={18} />
              </div>
              <div>
                <small>Plan with confidence</small>
                <b>Clear next steps</b>
              </div>
            </div>
            <div className="art-stamp">
              <LockKeyhole size={17} />
              <span>
                YOUR DETAILS
                <br />
                <b>STAY PRIVATE</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="container notice-wrap">
        <Notice />
      </div>
      <section className="section container">
        <div className="section-head">
          <div>
            <div className="eyebrow">START EXPLORING</div>
            <h2>{t.featured}</h2>
            <p>{t.featuredSub}</p>
          </div>
          <Link className="text-link" to="/schemes">
            {t.explore}
            <ArrowRight size={16} />
          </Link>
        </div>
        {error ? (
          <LoadingError error={error} />
        ) : (
          <div className="cards three">
            {rows.map((s) => (
              <SchemeCard key={s.id} scheme={s} onCompare={toggleCompare} />
            ))}
          </div>
        )}
      </section>
      <section className="how-band">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">SIMPLE STEPS</div>
              <h2>{t.how}</h2>
            </div>
          </div>
          <div className="steps">
            {t.steps.map((x, i) => (
              <div className="step" key={x}>
                <div className="step-num">0{i + 1}</div>
                <p>{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="center-head">
          <div className="eyebrow">BUILT AROUND YOUR NEEDS</div>
          <h2>{t.why}</h2>
          <p>{t.whySub}</p>
        </div>
        <div className="cards three benefits">
          <div>
            <div className="benefit-icon">
              <LockKeyhole />
            </div>
            <h3>{t.privacy}</h3>
            <p>{t.privacySub}</p>
          </div>
          <div>
            <div className="benefit-icon">
              <Info />
            </div>
            <h3>{t.caution}</h3>
            <p>{t.cautionSub}</p>
          </div>
          <div>
            <div className="benefit-icon">
              <BookOpen />
            </div>
            <h3>{t.sources}</h3>
            <p>{t.sourcesSub}</p>
          </div>
        </div>
      </section>
    </>
  );
}
