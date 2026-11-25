import { useLang } from '../context/LanguageContext.jsx';
import { Info, CheckCircle2, Users, ChevronDown } from 'lucide-react';

export function About() {
  const { t } = useLang();
  return (
    <div className="page container">
      <div className="page-intro">
        <div className="eyebrow">INFORMATION WITH CARE</div>
        <h1>{t.aboutTitle}</h1>
        <p>{t.aboutText}</p>
      </div>
      <div className="about-grid">
        <section className="about-card">
          <div className="benefit-icon">
            <Info />
          </div>
          <h2>{t.problem}</h2>
          <p>{t.problemText}</p>
        </section>
        <section className="about-card">
          <div className="benefit-icon">
            <CheckCircle2 />
          </div>
          <h2>{t.objective}</h2>
          <p>{t.objectiveText}</p>
        </section>
        <section className="about-card">
          <div className="benefit-icon">
            <Users />
          </div>
          <h2>{t.audience}</h2>
          <p>{t.audienceText}</p>
        </section>
      </div>
      <section className="faq">
        <h2>{t.faq}</h2>
        {[
          [t.faq1, t.faq1a],
          [t.faq2, t.faq2a],
          [t.faq3, t.faq3a],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <ChevronDown size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <div className="notice">
        <Info size={18} />
        {t.notice}
      </div>
    </div>
  );
}
