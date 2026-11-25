import { useLang } from '../context/LanguageContext.jsx';
import { Landmark, ArrowRight, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SchemeCard({ scheme, onCompare, selected = false }) {
  const { t, lang } = useLang();
  return (
    <article className="scheme-card">
      <div className="card-top">
        <span className="category-pill">{scheme.category}</span>
        <span className="level-label">
          <Landmark size={14} />
          {scheme.governmentLevel}
        </span>
      </div>
      <h3>{scheme.name}</h3>
      {lang === 'kn' && (
        <span className="translation-note">Kannada scheme translation needs review</span>
      )}
      <p>{scheme.description}</p>
      <div className="card-actions">
        <Link className="text-link" to={`/schemes/${scheme.id}`}>
          {t.details}
          <ArrowRight size={16} />
        </Link>
        <button
          className={selected ? 'compare-toggle selected' : 'compare-toggle'}
          onClick={() => onCompare(scheme.id)}
        >
          <Scale size={15} />
          {selected ? t.compareRemove : t.compareAdd}
        </button>
      </div>
    </article>
  );
}
