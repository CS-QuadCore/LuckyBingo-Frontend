# LuckyBingo — Frontend Overview

This document provides a comprehensive overview of the LuckyBingo frontend. It is intended for new contributors, maintainers, and reviewers who need a concise, accurate map of the codebase, architecture, and key implementation details.

Table of contents
- Purpose
- High-level architecture
- Core directories and files
- Data flow and realtime handling
- Environment and configuration
- Common development tasks
- Contribution notes

Purpose
--------
The frontend is a Next.js application (App Router) that provides the user-facing interface for LuckyBingo: room creation, joining, live gameplay, chat, and session management. It focuses on responsive UI, predictable state updates, and seamless realtime synchronization with the backend.

High-level architecture
-----------------------
- Framework: Next.js (App Router) using server and client components where appropriate.
- UI: React + Tailwind CSS + small design system primitives located in `components/ui`.
- Networking: HTTP REST calls for one-off requests (create/join room, fetch snapshot) and WebSocket connections for live room updates and quick chat.
- State: Local per-page React state combined with authoritative room snapshots from the backend. The frontend treats backend snapshots as the source of truth and applies optimistic UI only for short-lived interactions.

Core directories and files
------------------------
- `app/` — top-level pages and route handlers. Notable entries:
	- `app/page.tsx` — landing/home page.
	- `app/room/[roomCode]/page.tsx` — room view and gameplay surface.
	- `app/how-to-play/page.tsx` — rules and help.
- `components/` — reusable UI and feature components organized by domain:
	- `components/home` — lobby components (create/join forms, quick play)
	- `components/room` — gameplay components (BingoCard, CalledNumbers, PlayerList)
	- `components/modals` — modal dialogs used across flows
	- `components/ui` — small, accessible primitives (Button, Input, Dialog)
- `lib/` — client-side libraries and helpers:
	- `lib/api.ts` — typed API client wrapper and WebSocket URL builder.
	- `lib/types.ts` — shared TypeScript types describing room snapshots and DTOs.
	- `lib/utils.ts` — shared utility helpers.

Data flow and realtime handling
-----------------------------
1. Room lifecycle begins when a host calls `createRoom(...)` (HTTP POST) — backend returns initial `RoomSnapshot` and card.
2. Players join by calling `joinRoom(...)` (HTTP POST) and then open a WebSocket connection to `/ws/rooms/{room_code}` using the URL from `getRoomWebSocketUrl`.
3. Backend pushes authoritative `RoomSnapshot` updates over the WebSocket whenever numbers are called, players join/leave, or sessions change state.
4. Frontend components subscribe to snapshot updates and render the UI. UI actions that require server validation (call number, claim bingo) are performed via HTTP endpoints to ensure consistency.

Environment and configuration
-----------------------------
- `NEXT_PUBLIC_API_URL`: base URL for the backend API. Defaults to `http://127.0.0.1:8000` during development.
- Tailwind configuration is driven by `globals.css` and `postcss.config.mjs`.

Common development tasks
------------------------
- Install dependencies: `npm install`
- Run the dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`

Contribution notes
------------------
- Prefer small, focused pull requests. Document behavioral changes in the changelog and update relevant docs.
- When changing room state logic, coordinate with backend changes. Test WebSocket flows locally using the backend dev server.
- Keep UI components accessible and responsive; include screenshot or visual tests when modifying major UI flows.

Contact and ownership
---------------------
If you have questions about frontend design decisions, contact the maintainers listed in the repository README.

