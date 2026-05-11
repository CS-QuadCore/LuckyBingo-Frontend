# Frontend Architecture

This file summarizes the architectural choices behind the LuckyBingo frontend and explains how components, data, and realtime synchronization interact.

Architectural goals
-------------------
- Predictability: the server is the source of truth for room state.
- Simplicity: small components, single-purpose modules, and centralized API client.
- Resilience: graceful handling of reconnects and server errors.

Routing and composition
-----------------------
- Next.js App Router provides route-based code splitting and server components for SEO or static content pages.
- Pages:
	- `app/page.tsx` — landing
	- `app/room/[roomCode]/page.tsx` — primary interactive view for gameplay

State and data flow
-------------------
- Local UI state (form inputs, ephemeral UI toggles) is kept in component state.
- Authoritative room state is pulled from the backend via `getRoom` and maintained using WebSocket snapshots.
- UI updates resulting from user actions that affect game state (call number, claim bingo) are performed via REST endpoints; the server validates actions and subsequently broadcasts updated snapshots.

Realtime and synchronization
----------------------------
- A single WebSocket connection per client-room is used to receive broadcast snapshots and events. The client should treat snapshots as the canonical representation of the room.
- To avoid UI jank, apply minor optimistic updates only when an immediate local response is required; always reconcile with the server snapshot returned afterward.

Scalability considerations
-------------------------
- Current implementation uses an in-memory store on the server. For production-scale deployments consider:
	- Moving state into Redis for cross-instance consistency.
	- Using a message broker (e.g., Redis Pub/Sub or Kafka) to coordinate broadcasts across replicas.

Testing and reliability
-----------------------
- Unit tests: component rendering and pure utilities in `lib/`.
- Integration tests: backend + frontend interactions and WebSocket flows (recommended via test runner that supports WebSocket testing).

