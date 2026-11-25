import { useLang } from '../context/LanguageContext.jsx';
import { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Landmark,
  CheckCircle2,
  Info,
  ArrowRight,
  Scale,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Notice } from '../components/Notice.jsx';

export function Results() {
  const { t, lang } = useLang();
  const [rows, setRows] = useState(() =>
    JSON.parse(sessionStorage.getItem('finderResults') || '[]')
  );
  const [status, setStatus] = useState('all'),
    [sort, setSort] = useState('default'),
    [compare, setCompare] = useState(() =>
      JSON.parse(localStorage.getItem('compare') || '[]')
    );
  const filtered = useMemo(() => {
    let a = status === 'all' ? rows : rows.filter((r) => r.status === status);
    if (sort === 'name')
      a = [...a].sort((x, y) => x.scheme.name.localeCompare(y.scheme.name));
    return a;
  }, [rows, status, sort]);
  const toggle = (id) =>
    setCompare((p) => {
      const n = p.includes(id)
        ? p.filter((x) => x !== id)
        : p.length < 2
          ? [...p, id]
          : [p[1], id];
      localStorage.setItem('compare', JSON.stringify(n));
      return n;
    });
  return (
    <div className="page container">
      <div className="page-intro">
        <div className="eyebrow">YOUR STARTING POINT</div>
        <h1>{t.results}</h1>
        <p>{t.resultsFor}</p>
      </div>
      <Notice />
      <div className="result-controls">
        <label>
          <SlidersHorizontal size={16} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All match statuses</option>
            <option value="Potentially Eligible">{t.matched}</option>
            <option value="Some Conditions Need Verification">{t.verify}</option>
            <option value="Not Matching Known Criteria">{t.noMatch}</option>
          </select>
        </label>
        <label>
          Sort{' '}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Recommended</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>
      {filtered.length ? (
        <div className="result-list">
          {filtered.map((r) => (
            <article className="result-card" key={r.scheme.id}>
              <div className="result-main">
                <span
                  className={`status ${r.status === 'Potentially Eligible' ? 'good' : r.status === 'Not Matching Known Criteria' ? 'bad' : 'caution'}`}
                >
                  {r.status === 'Potentially Eligible'
                    ? t.matched
                    : r.status === 'Not Matching Known Criteria'
                      ? t.noMatch
                      : t.verify}
                </span>
                <div className="card-top">
                  <span className="category-pill">{r.scheme.category}</span>
                  <span className="level-label">
                    <Landmark size={14} />
                    {r.scheme.governmentLevel}
                  </span>
                </div>
                <h2>{r.scheme.name}</h2>
                {lang === 'kn' && (
                  <span className="translation-note">
                    Kannada scheme translation needs review
                  </span>
                )}
                <p>{r.scheme.description}</p>
                <div className="explain">
                  <strong>{t.match}</strong>
                  {r.reasons.map((x) => (
                    <span key={x}>
                      <CheckCircle2 size={15} />
                      {x}
                    </span>
                  ))}
                  {r.checks.map((x) => (
                    <span key={x}>
                      <Info size={15} />
                      {x}
                    </span>
                  ))}
                </div>
                <div className="card-actions">
                  <Link className="text-link" to={`/schemes/${r.scheme.id}`}>
                    {t.details}
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    className={
                      compare.includes(r.scheme.id)
                        ? 'compare-toggle selected'
                        : 'compare-toggle'
                    }
                    onClick={() => toggle(r.scheme.id)}
                  >
                    <Scale size={15} />
                    {compare.includes(r.scheme.id) ? t.compareRemove : t.compareAdd}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          <Info />
          <h3>{t.empty}</h3>
          <p>{t.emptyHelp}</p>
          <Link className="btn secondary" to="/schemes">
            {t.explore}
          </Link>
        </div>
      )}
    </div>
  );
}
