import { ArrowRight, Heart, ShieldAlert, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext.jsx';

const topics = [
  {
    icon: Heart,
    category: 'Life Insurance',
    title: 'awarenessLifeTitle',
    text: 'awarenessLifeText',
    link: 'awarenessLifeLink',
  },
  {
    icon: ShieldAlert,
    category: 'Accident Insurance',
    title: 'awarenessAccidentTitle',
    text: 'awarenessAccidentText',
    link: 'awarenessAccidentLink',
  },
  {
    icon: Wallet,
    category: 'Pension',
    title: 'awarenessPensionTitle',
    text: 'awarenessPensionText',
    link: 'awarenessPensionLink',
  },
];

export function AwarenessSection() {
  const { t } = useLang();

  return (
    <section className="section container awareness-section" aria-labelledby="awareness-title">
      <div className="section-head awareness-heading">
        <div>
          <div className="eyebrow">{t.awarenessEyebrow}</div>
          <h2 id="awareness-title">{t.awarenessTitle}</h2>
          <p>{t.awarenessIntro}</p>
        </div>
      </div>
      <div className="cards three awareness-grid">
        {topics.map(({ icon: Icon, category, title, text, link }) => (
          <article className="awareness-card" key={category}>
            <div className="awareness-icon" aria-hidden="true">
              <Icon size={21} />
            </div>
            <h3>{t[title]}</h3>
            <p>{t[text]}</p>
            <Link
              className="text-link"
              to={`/schemes?category=${encodeURIComponent(category)}`}
            >
              {t[link]}
              <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
      <p className="awareness-note">{t.awarenessNote}</p>
    </section>
  );
}
