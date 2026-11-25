import { useLang } from '../context/LanguageContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { findSchemes } from '../services/api.js';
import { ArrowRight, RotateCcw, LockKeyhole } from 'lucide-react';
import { occupations, categories } from '../data/options.js';

export function Finder() {
  const { t } = useLang();
  const nav = useNavigate();
  const [form, setForm] = useState({
      age: '',
      occupation: '',
      state: 'Karnataka',
      income: '',
      category: 'all',
    }),
    [err, setErr] = useState(''),
    [busy, setBusy] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.age || Number(form.age) < 16 || Number(form.age) > 120) {
      setErr('Enter an age from 16 to 120.');
      return;
    }
    if (!form.occupation) {
      setErr('Choose an occupation.');
      return;
    }
    setErr('');
    setBusy(true);
    try {
      const d = await findSchemes({
        age: Number(form.age),
        occupation: form.occupation,
        state: form.state,
        income: form.income === '' ? null : Number(form.income),
        category: form.category,
      });
      sessionStorage.setItem('finderResults', JSON.stringify(d.results));
      nav('/results');
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="page container narrow">
      <div className="page-intro">
        <div className="eyebrow">A FEW DETAILS, HELPFUL GUIDANCE</div>
        <h1>{t.finderTitle}</h1>
        <p>{t.finderDesc}</p>
      </div>
      <form className="finder-form" onSubmit={submit}>
        <div className="form-grid">
          <label>
            {t.age}
            <span className="field-help">Enter your age in completed years.</span>
            <input
              name="age"
              type="number"
              min="16"
              max="120"
              required
              value={form.age}
              onChange={change}
              placeholder="e.g. 32"
            />
          </label>
          <label>
            {t.occupation}
            <span className="field-help">Choose the closest description.</span>
            <select name="occupation" required value={form.occupation} onChange={change}>
              <option value="">{t.select}</option>
              {occupations.map(([v, l]) => (
                <option value={v} key={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.stateLabel}
            <select name="state" value={form.state} onChange={change}>
              <option>Karnataka</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            {t.income}
            <span className="field-help">{t.incomeHelp}</span>
            <input
              name="income"
              type="number"
              min="0"
              value={form.income}
              onChange={change}
              placeholder="₹ per month"
            />
          </label>
          <label className="wide">
            {t.benefit}
            <select name="category" value={form.category} onChange={change}>
              <option value="all">{t.all}</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        {err && (
          <div className="form-error" role="alert">
            {err}
          </div>
        )}
        <div className="form-actions">
          <button className="btn primary" disabled={busy}>
            {busy ? 'Checking…' : t.apply}
            <ArrowRight size={17} />
          </button>
          <button
            className="btn secondary"
            type="reset"
            onClick={() => {
              setForm({
                age: '',
                occupation: '',
                state: 'Karnataka',
                income: '',
                category: 'all',
              });
              setErr('');
            }}
          >
            <RotateCcw size={16} />
            {t.reset}
          </button>
        </div>
        <p className="privacy-note">
          <LockKeyhole size={15} /> Your answers are used to produce this result in your
          browser session and are not saved to a database.
        </p>
      </form>
    </div>
  );
}
