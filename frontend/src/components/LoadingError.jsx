import { useLang } from '../context/LanguageContext.jsx';
import { Info } from 'lucide-react';

export function LoadingError({ error }) {
  const { t } = useLang();
  return error ? (
    <div className="empty">
      <Info />
      <h3>{t.error}</h3>
      <p>{error}</p>
    </div>
  ) : (
    <div className="loading">{t.loading}</div>
  );
}
