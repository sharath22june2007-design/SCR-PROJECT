# Worker Benefits Navigator

A responsive information portal for exploring selected Central Government and Karnataka worker welfare schemes. It offers preliminary matching only; it does not enroll applicants or guarantee eligibility. Scheme details change. Always confirm current terms with the linked official authority.

## Run locally

Requirements: Node.js 18+ and npm.

```sh
npm run install:all
npm install
npm run dev
```

Open the single Vite URL shown in the terminal (normally http://localhost:5173). The Express API runs on port 4000 behind the frontend proxy; you do not need to open it in a browser. To run the services separately, use `npm --prefix backend run dev` and `npm --prefix frontend run dev` in separate terminals. Copy `backend/.env.example` to `backend/.env` to customize the API port and allowed frontend origin.

## Project structure

- `frontend/` React, Vite, React Router, accessible responsive UI, shared language context and API service.
- `backend/` Express REST API, request validation, scheme matching logic and the local JSON dataset.
- `frontend/src/components/` shared navigation, notice, loading/error, and scheme-card UI.
- `frontend/src/pages/` one file per route: home, finder, results, browse, details, comparison, and about.

## Features

- Landing page, scheme finder with results, searchable/filterable scheme directory, individual details, two-scheme comparison, About and FAQ.
- English and Kannada interface toggle. Scheme translations are included only when reviewed; missing Kannada scheme text is explicitly marked.
- Express endpoints: `GET /api/health`, `GET /api/schemes`, `GET /api/schemes/:id`, `GET /api/schemes/search`, `POST /api/schemes/find`.
- Results explain the match and use cautious preliminary statuses. No sensitive identity, bank, or login information is collected.

## Scheme data and verification

Dataset records include source links, last checked date, and a verification status. Central scheme summaries were checked against Ministry of Labour & Employment, PFRDA, Jan Suraksha, and National Health Authority materials on 23 November 2026. Karnataka construction-worker pension is included as a discovery lead listed by the myScheme portal and linked to the Karnataka BOCW Board; current amount, documents, and application steps remain marked for manual verification. Values and terms may change; this student project is not an official government service.

## API examples

```sh
curl http://localhost:4000/api/health
curl "http://localhost:4000/api/schemes/search?q=pension"
curl -X POST http://localhost:4000/api/schemes/find -H "Content-Type: application/json" -d '{"age":30,"occupation":"construction","state":"Karnataka","category":"all"}'
```

## Deploy on Render

The root `render.yaml` defines one free Node web service that builds the Vite frontend and serves it from Express alongside the API. Push this project to a new private GitHub repository, connect that repository to Render, then create a Blueprint from its `render.yaml`. Render’s free web services are intended for demos and hobby projects; they can sleep when idle and may restart. This project stores no user profiles or application data.
