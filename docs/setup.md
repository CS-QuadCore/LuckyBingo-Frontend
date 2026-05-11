# Setup & Local Development

This page documents recommended local development steps and environment variables for the LuckyBingo frontend. It is optimized for new contributors and CI/debug workflows.

Prerequisites
-------------
- Node.js 18+ (LTS recommended)
- npm 8+ or yarn 1/2
- A running backend (LuckyBingo FastAPI) at `NEXT_PUBLIC_API_URL` (defaults to `http://127.0.0.1:8000`)

Quick start
-----------
1. Clone the repository and change into the frontend folder (if working from the mono-repo root):

```bash
cd luckybingo
```

2. Install dependencies:

```bash
npm ci
```

3. Start the development server with hot reload:

```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser.

Environment variables
---------------------
- `NEXT_PUBLIC_API_URL` — base URL for the backend API (default: `http://127.0.0.1:8000`).
- You can define environment variables in a `.env.local` file at the project root (do not commit secrets).

Example `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Common commands
---------------
- `npm run dev` — Run Next.js development server
- `npm run build` — Build production assets
- `npm start` — Start production server after build
- `npm run lint` — Run ESLint

Debugging tips
--------------
- If the app cannot reach the backend, check `NEXT_PUBLIC_API_URL` and the browser console network tab for failed requests.
- For WebSocket issues, ensure the backend server is running on the same host/port and that the WS path `/ws/rooms/{room_code}` is reachable.

Recommended editor & tooling
----------------------------
- VSCode with TypeScript and ESLint extensions
- Tailwind CSS IntelliSense for class autocompletion

