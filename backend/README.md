# Backend (Algorithms) — Quick Start

Install dependencies and start the server:

```bash
cd backend
npm install
npm run dev   # or `npm start` for production
```

API endpoints (mounted at `/api/sorting`):

- `GET /` — list available algorithms
- `POST /start` — start a simulation; body: `{ "algorithm": "bubble", "array": [5,3,2,4] }`
- `GET /:id` — get current session state
- `POST /:id/step` — perform one step of the algorithm
- `POST /:id/run` — run to completion

Use these endpoints from the frontend to create an interactive visualization.
