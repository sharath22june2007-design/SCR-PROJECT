import { ArrowRight, Heart, ShieldAlert, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext.jsx';

const topics = [
  {
    icon: Heart,
    title: 'awarenessLifeTitle',
    explanation: 'learnLifeWhy',
    checks: 'learnLifeChecks',
    category: 'Life Insurance',
    link: 'awarenessLifeLink',
  },
  {
    icon: ShieldAlert,
    title: 'awarenessAccidentTitle',
    explanation: 'learnAccidentWhy',
    checks: 'learnAccidentChecks',
    category: 'Accident Insurance',
    link: 'awarenessAccidentLink',
  },
  {
    icon: Wallet,
    title: 'awarenessPensionTitle',
    explanation: 'learnPensionWhy',
    checks: 'learnPensionChecks',
    category: 'Pension',
    link: 'awarenessPensionLink',
  },
];

export function Learn() {
  const { t } = useLang();

  return (
    <div className="page container learn-page">
      <header className="page-intro learn-intro">
        <div className="eyebrow">{t.learnEyebrow}</div>
        <h1>{t.learnTitle}</h1>
        <p>{t.learnIntro}</p>
      </header>

      <div className="learn-grid">
        {topics.map(({ icon: Icon, title, explanation, checks, category, link }, index) => (
          <article className="learn-card" key={title}>
            <div className="learn-card-top">
              <span className="awareness-icon" aria-hidden="true">
                <Icon size={21} />
              </span>
              <span className="learn-number">0{index + 1}</span>
            </div>
            <h2>{t[title]}</h2>
            <p className="learn-explanation">{t[explanation]}</p>
            <h3>{t.learnBeforeJoining}</h3>
            <ul>
              {t[checks].map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
            <Link
              className="text-link learn-link"
              to={`/schemes?category=${encodeURIComponent(category)}`}
            >
              {t[link]}
              <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>

      <section className="learn-next" aria-labelledby="learn-next-title">
        <div className="eyebrow">{t.learnNextEyebrow}</div>
        <h2 id="learn-next-title">{t.learnNextTitle}</h2>
        <div className="learn-next-steps">
          {t.learnSteps.map((step, index) => (
            <div className="learn-step" key={step}>
              <span className="step-num">0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="notice learn-notice">{t.learnNotice}</div>
    </div>
  );
}
