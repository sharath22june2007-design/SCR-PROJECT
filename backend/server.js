import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import schemes from './data/schemes.json' with { type: 'json' };
import { matchSchemes } from './utils/matchSchemes.js';

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', service: 'scheme-awareness-api' })
);
app.get('/api/schemes', (req, res) => {
  let rows = [...schemes];
  const { category, governmentLevel, occupation, q } = req.query;
  if (category && category !== 'all')
    rows = rows.filter(
      (x) => x.category.toLowerCase() === String(category).toLowerCase()
    );
  if (governmentLevel && governmentLevel !== 'all')
    rows = rows.filter(
      (x) => x.governmentLevel.toLowerCase() === String(governmentLevel).toLowerCase()
    );
  if (occupation && occupation !== 'all')
    rows = rows.filter(
      (x) =>
        !x.eligibility.occupations.length ||
        x.eligibility.occupations.includes(occupation)
    );
  if (q)
    rows = rows.filter((x) =>
      `${x.name} ${x.description} ${x.category}`
        .toLowerCase()
        .includes(String(q).toLowerCase())
    );
  res.json({ schemes: rows, total: rows.length });
});
app.get('/api/schemes/search', (req, res) => {
  const q = String(req.query.q || '')
    .toLowerCase()
    .trim();
  if (!q) return res.status(400).json({ error: 'Search query q is required.' });
  const rows = schemes.filter((x) =>
    `${x.name} ${x.description} ${x.category}`.toLowerCase().includes(q)
  );
  return res.json({ schemes: rows, total: rows.length });
});
app.get('/api/schemes/:id', (req, res) => {
  const item = schemes.find((x) => x.id === req.params.id);
  return item ? res.json(item) : res.status(404).json({ error: 'Scheme not found.' });
});
app.post('/api/schemes/find', (req, res) => {
  const { age, occupation, state, income, category = 'all' } = req.body || {};
  const validOccupations = [
    'construction',
    'street-vendor',
    'domestic',
    'daily-wage',
    'other',
  ];
  if (!Number.isInteger(age) || age < 16 || age > 120)
    return res.status(400).json({ error: 'Age must be a whole number from 16 to 120.' });
  if (!validOccupations.includes(occupation))
    return res.status(400).json({ error: 'Choose a valid occupation.' });
  if (!['Karnataka', 'Other'].includes(state))
    return res.status(400).json({ error: 'Choose a valid state option.' });
  if (income !== undefined && income !== null && (!Number.isFinite(income) || income < 0))
    return res
      .status(400)
      .json({ error: 'Monthly income must be a non-negative number.' });
  if (
    ![
      'all',
      'Pension',
      'Life Insurance',
      'Accident Insurance',
      'Health-related benefits',
    ].includes(category)
  )
    return res.status(400).json({ error: 'Choose a valid benefit category.' });
  res.json({
    results: matchSchemes(schemes, { age, occupation, state, income, category }),
  });
});
const frontendDist = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../frontend/dist'
);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(frontendDist));
  app.get('*', (_req, res, next) =>
    res.sendFile(path.join(frontendDist, 'index.html'), (error) => error && next())
  );
} else {
  app.get('/', (_req, res) =>
    res
      .type('text/plain')
      .send(
        'API is running. Open the app at http://localhost:5173/ (run npm run dev from the project root).'
      )
  );
}
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error.' });
});
const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`API service ready at http://localhost:${port}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log('Open the app at http://localhost:5173/');
  }
});
