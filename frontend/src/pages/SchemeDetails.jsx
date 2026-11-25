import { useParams, Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext.jsx';
import { useState, useEffect } from 'react';
import { getScheme } from '../services/api.js';
import {
  Landmark,
  HeartPulse,
  Users,
  Wallet,
  BookOpen,
  ArrowRight,
  Info,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { LoadingError } from '../components/LoadingError.jsx';

export function Details() {
  const { id } = useParams(),
    { t, lang } = useLang();
  const [s, setS] = useState(null),
    [error, setError] = useState('');
  useEffect(() => {
    getScheme(id)
      .then(setS)
      .catch((e) => setError(e.message));
  }, [id]);
  if (error)
    return (
      <div className="page container">
        <LoadingError error={error} />
        <Link to="/schemes" className="text-link">
          {t.explore}
        </Link>
      </div>
    );
  if (!s)
    return (
      <div className="page container">
        <div className="loading">{t.loading}</div>
      </div>
    );
  const elig = s.eligibility;
  return (
    <div className="page container detail-layout">
      <div className="detail-main">
        <div className="breadcrumbs">
          <Link to="/schemes">{t.browse}</Link>
          <span>/</span>
          {s.name}
        </div>
        <div className="detail-heading">
          <span className="category-pill">{s.category}</span>
          <span className="level-label">
            <Landmark size={14} />
            {s.governmentLevel} Government
          </span>
          <h1>{s.name}</h1>
          {lang === 'kn' && (
            <span className="translation-note">
              Kannada scheme translation needs review
            </span>
          )}
          <p>{s.description}</p>
        </div>
        <section className="detail-section">
          <h2>
            <HeartPulse />
            {t.benefits}
          </h2>
          <ul>
            {s.benefits.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section className="detail-section">
          <h2>
            <Users />
            {t.eligibility}
          </h2>
          <ul>
            {elig.minAge != null && (
              <li>
                Minimum age: {elig.minAge} years
                {elig.maxAge ? ` · Maximum age: ${elig.maxAge} years` : ''}
              </li>
            )}
            {elig.occupations.length > 0 && (
              <li>
                Worker groups listed: {elig.occupations.join(', ').replaceAll('-', ' ')}
              </li>
            )}
            {elig.incomeLimit != null && (
              <li>Monthly income limit: ₹{elig.incomeLimit.toLocaleString('en-IN')}</li>
            )}
            {elig.otherConditions.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section className="detail-section">
          <h2>
            <Wallet />
            {t.contribution}
          </h2>
          <p>{s.contribution}</p>
        </section>
        <section className="detail-section">
          <h2>
            <BookOpen />
            {t.documents}
          </h2>
          <ul>
            {s.documents.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section className="detail-section">
          <h2>
            <ArrowRight />
            {t.procedure}
          </h2>
          <ol>
            {s.applicationSteps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </section>
        <section className="detail-section">
          <h2>
            <Info />
            {t.conditions}
          </h2>
          <p>{s.verificationStatus}</p>
          <p className="muted">
            {t.verified}: {s.lastVerified}
          </p>
        </section>
      </div>
      <aside className="official-card">
        <div className="official-icon">
          <ShieldCheck />
        </div>
        <h3>Check the latest details</h3>
        <p>
          Scheme information and enrolment steps can change. Confirm current terms with
          the official authority.
        </p>
        <a
          className="btn primary full"
          href={s.officialUrl}
          target="_blank"
          rel="noreferrer"
        >
          {t.official}
          <ExternalLink size={16} />
        </a>
        <div className="source-list">
          <strong>Sources checked</strong>
          {s.sources.map((x) => (
            <a href={x} target="_blank" rel="noreferrer" key={x}>
              {new URL(x).hostname}
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
