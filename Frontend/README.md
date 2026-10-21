# Portfolio frontend

## Run with the FastAPI backend

Start the backend from the `Backend` directory:

```bash
source venv/bin/activate
uvicorn app.main:app --reload
```

Then start the frontend from this directory:

```bash
npm install
npm run dev
```

During local development, Vite proxies `/api` requests to `http://127.0.0.1:8000`.
For a separately hosted backend, set `VITE_API_BASE_URL` to its origin before building. See `.env.example`.
