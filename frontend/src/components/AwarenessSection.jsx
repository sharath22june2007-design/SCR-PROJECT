import { ArrowRight, Heart, ShieldAlert, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext.jsx';

const topics = [
  { icon: Heart, label: 'awarenessLifeTitle' },
  { icon: ShieldAlert, label: 'awarenessAccidentTitle' },
  { icon: Wallet, label: 'awarenessPensionTitle' },
];

export function AwarenessSection() {
  const { t } = useLang();

  return (
    <section className="section container awareness-section" aria-labelledby="awareness-title">
      <div className="awareness-preview">
        <div className="awareness-preview-copy">
          <div className="eyebrow">{t.awarenessEyebrow}</div>
          <h2 id="awareness-title">{t.awarenessTitle}</h2>
          <p>{t.awarenessIntro}</p>
          <div className="awareness-topics">
            {topics.map(({ icon: Icon, label }) => (
              <span className="awareness-topic" key={label}>
                <Icon size={17} aria-hidden="true" />
                {t[label]}
              </span>
            ))}
          </div>
          <Link className="btn primary" to="/learn">
            {t.awarenessRead}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
