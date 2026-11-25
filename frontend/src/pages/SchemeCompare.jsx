import { useLang } from '../context/LanguageContext.jsx';
import { useState, useEffect } from 'react';
import { getSchemes } from '../services/api.js';
import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Compare() {
  const { t } = useLang();
  const [all, setAll] = useState([]),
    [ids, setIds] = useState(() => JSON.parse(localStorage.getItem('compare') || '[]'));
  useEffect(() => {
    getSchemes().then((d) => setAll(d.schemes));
  }, []);
  const add = (i, v) => {
    const n = [...ids];
    n[i] = v;
    setIds(n);
    localStorage.setItem('compare', JSON.stringify(n.filter(Boolean)));
  };
  const items = ids.map((id) => all.find((x) => x.id === id)).filter(Boolean);
  const values = [
    ['Government level', (s) => s.governmentLevel],
    ['Category', (s) => s.category],
    ['Main benefits', (s) => s.benefits.join(' · ')],
    [
      'Eligibility',
      (s) =>
        [
          s.eligibility.minAge != null ? `Minimum age ${s.eligibility.minAge}` : '',
          s.eligibility.maxAge ? `Maximum age ${s.eligibility.maxAge}` : '',
          s.eligibility.occupations.join(', '),
          ...(s.eligibility.otherConditions || []),
        ]
          .filter(Boolean)
          .join(' · '),
    ],
    ['Contribution / premium', (s) => s.contribution],
    ['Documents', (s) => s.documents.join(' · ')],
    ['Application process', (s) => s.applicationSteps.join(' ')],
  ];
  return (
    <div className="page container">
      <div className="page-intro">
        <div className="eyebrow">SIDE-BY-SIDE OVERVIEW</div>
        <h1>{t.compareTitle}</h1>
        <p>{t.compareHelp}</p>
      </div>
      <div className="select-compare">
        {[0, 1].map((i) => (
          <label key={i}>
            {t.choose} {i + 1}
            <select value={ids[i] || ''} onChange={(e) => add(i, e.target.value)}>
              <option value="">{t.select}</option>
              {all.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      {items.length === 2 ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{t.field}</th>
                {items.map((s) => (
                  <th key={s.id}>{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {values.map(([label, fn]) => (
                <tr key={label}>
                  <th>{label}</th>
                  {items.map((s) => (
                    <td key={s.id}>{fn(s)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">
          <Scale />
          <h3>Select two schemes to compare</h3>
          <p>
            Use the selectors above, or add schemes from the browse and results pages.
          </p>
          <Link to="/schemes" className="btn secondary">
            {t.explore}
          </Link>
        </div>
      )}
    </div>
  );
}
