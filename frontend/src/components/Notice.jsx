import { useLang } from '../context/LanguageContext.jsx';
import { Info } from 'lucide-react';

export function Notice() {
  const { t } = useLang();
  return (
    <div className="notice">
      <Info size={18} />
      <span>{t.notice}</span>
    </div>
  );
}
