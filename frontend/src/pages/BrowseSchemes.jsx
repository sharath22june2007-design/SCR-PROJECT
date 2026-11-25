import { useLang } from '../context/LanguageContext.jsx';
import { useState, useEffect } from 'react';
import { getSchemes as apiSchemes } from '../services/api.js';
import { Search, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, occupations } from '../data/options.js';
import { LoadingError } from '../components/LoadingError.jsx';
import { SchemeCard } from '../components/SchemeCard.jsx';

export function Browse() {
  const { t } = useLang();
  const [rows, setRows] = useState([]),
    [q, setQ] = useState(''),
    [category, setCategory] = useState('all'),
    [level, setLevel] = useState('all'),
    [occupation, setOccupation] = useState('all'),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(''),
    [compare, setCompare] = useState(() =>
      JSON.parse(localStorage.getItem('compare') || '[]')
    );
  useEffect(() => {
    setLoading(true);
    apiSchemes({ q, category, governmentLevel: level, occupation })
      .then((d) => {
        setRows(d.schemes);
        setError('');
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [q, category, level, occupation]);
  const toggle = (id) =>
    setCompare((prev) => {
      const n = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 2
          ? [...prev, id]
          : [prev[1], id];
      localStorage.setItem('compare', JSON.stringify(n));
      return n;
    });
  return (
    <div className="page container">
      <div className="page-intro">
        <div className="eyebrow">SCHEME DIRECTORY</div>
        <h1>{t.browseTitle}</h1>
        <p>{t.browseDesc}</p>
      </div>
      <div className="filter-panel">
        <label className="search-box">
          <Search size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search}
          />
        </label>
        <label>
          <span>{t.category}</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">{t.all}</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.level}</span>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="all">{t.all}</option>
            <option value="Central">{t.central}</option>
            <option value="Karnataka">{t.state}</option>
          </select>
        </label>
        <label>
          <span>{t.occupation}</span>
          <select value={occupation} onChange={(e) => setOccupation(e.target.value)}>
            <option value="all">{t.all}</option>
            {occupations.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>
      {compare.length > 0 && (
        <div className="compare-banner">
          <Scale size={17} />
          {compare.length} schemes selected{' '}
          <Link to="/compare">
            {t.compare} <ArrowRight size={15} />
          </Link>
        </div>
      )}
      {loading ? (
        <div className="loading">{t.loading}</div>
      ) : error ? (
        <LoadingError error={error} />
      ) : rows.length ? (
        <div className="cards three">
          {rows.map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              onCompare={toggle}
              selected={compare.includes(s.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Search />
          <h3>{t.empty}</h3>
          <p>{t.emptyHelp}</p>
          <button
            className="btn secondary"
            onClick={() => {
              setQ('');
              setCategory('all');
              setLevel('all');
              setOccupation('all');
            }}
          >
            {t.clear}
          </button>
        </div>
      )}
    </div>
  );
}
