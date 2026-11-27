import { ArrowDown, Heart, ShieldAlert, Wallet } from 'lucide-react';
import { useLang } from '../context/LanguageContext.jsx';

const topics = [
  {
    icon: Heart,
    title: 'awarenessLifeTitle',
    summary: 'learnLifeShort',
    id: 'learn-life',
  },
  {
    icon: ShieldAlert,
    title: 'awarenessAccidentTitle',
    summary: 'learnAccidentShort',
    id: 'learn-accident',
  },
  {
    icon: Wallet,
    title: 'awarenessPensionTitle',
    summary: 'learnPensionShort',
    id: 'learn-pension',
  },
];

const details = [
  {
    id: 'learn-life',
    title: 'awarenessLifeTitle',
    icon: Heart,
    groups: [
      { heading: 'learnLifeWhatTitle', items: 'learnLifeWhat' },
      { heading: 'learnLifeHelpTitle', items: 'learnLifeHelp' },
      { heading: 'learnLifeCheckTitle', items: 'learnLifeChecks' },
    ],
  },
  {
    id: 'learn-accident',
    title: 'awarenessAccidentTitle',
    icon: ShieldAlert,
    groups: [
      { heading: 'learnAccidentWhatTitle', items: 'learnAccidentWhat' },
      { heading: 'learnAccidentHelpTitle', items: 'learnAccidentHelp' },
      { heading: 'learnAccidentCheckTitle', items: 'learnAccidentChecks' },
    ],
  },
  {
    id: 'learn-pension',
    title: 'awarenessPensionTitle',
    icon: Wallet,
    groups: [
      { heading: 'learnPensionWhatTitle', items: 'learnPensionWhat' },
      { heading: 'learnPensionHelpTitle', items: 'learnPensionHelp' },
      { heading: 'learnPensionCheckTitle', items: 'learnPensionChecks' },
    ],
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
        {topics.map(({ icon: Icon, title, summary, id }, index) => (
          <article className="learn-card" key={id}>
            <div className="learn-card-top">
              <span className="awareness-icon" aria-hidden="true">
                <Icon size={21} />
              </span>
              <span className="learn-number">0{index + 1}</span>
            </div>
            <h2>{t[title]}</h2>
            <p className="learn-explanation">{t[summary]}</p>
            <a className="text-link learn-link" href={`#${id}`}>
              {t.learnMore}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>

      <div className="learn-detail-list">
        {details.map(({ id, title, icon: Icon, groups }) => (
          <section
            className="learn-detail"
            id={id}
            key={id}
            aria-labelledby={`${id}-title`}
          >
            <div className="learn-detail-heading">
              <span className="awareness-icon" aria-hidden="true">
                <Icon size={21} />
              </span>
              <div>
                <div className="eyebrow">{t.learnFullDetails}</div>
                <h2 id={`${id}-title`}>{t[title]}</h2>
              </div>
            </div>
            <div className="learn-detail-grid">
              {groups.map(({ heading, items }) => (
                <section className="learn-detail-block" key={heading}>
                  <h3>{t[heading]}</h3>
                  {Array.isArray(t[items]) ? (
                    <ul>
                      {t[items].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{t[items]}</p>
                  )}
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="notice learn-notice">{t.learnNotice}</div>
    </div>
  );
}
