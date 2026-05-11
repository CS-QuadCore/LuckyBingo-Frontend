# API Integration

This document explains how the frontend integrates with the backend services, lists primary client functions, and explains common integration patterns and error handling strategies.

API surface
-----------
All HTTP and WebSocket interactions are centralized in `lib/api.ts`. The file exposes typed functions that map 1:1 with backend endpoints. Centralization simplifies error handling, retries, logging, and future migration.

Notable functions
-----------------
- `createRoom(hostName, hostId, visibility)` — POST `/rooms`. Returns `CreateRoomResponse` with `room` snapshot and initial card.
- `getPublicRooms()` — GET `/rooms/public`. Useful for a public lobby listing.
- `joinRoom(roomCode, playerId, playerName)` — POST `/players/join`. Returns the player's card and room snapshot.
- `getRoom(roomCode)` — GET `/rooms/{room_code}`. Poll or call once to get the current snapshot.
- `getRoomWebSocketUrl(roomCode, playerId, playerName)` — helper to build a WS URL for realtime updates.

WebSocket usage
---------------
The frontend initiates a WebSocket connection per client per room. The backend broadcasts `RoomSnapshot` messages and lightweight events (chat, player join/leave, call-number). The frontend should:

1. Open a WS after a successful join or when re-entering a room.
2. Listen for `room_snapshot`-style events and update the UI atomically.
3. Use HTTP for server-validated actions (call number, claim bingo) and rely on the subsequent snapshot to confirm results.

Error handling and retries
-------------------------
- For transient network failures, retry GET requests with exponential backoff.
- For WebSocket disconnects, attempt reconnection with a capped backoff and notify the user if reconnection fails for an extended period.
- Surface server error messages from API responses (`data.detail`) to users when safe and actionable.

Security considerations
-----------------------
- Do not store secret tokens in `NEXT_PUBLIC_*` variables — those are exposed to client-side code.
- Validate user inputs on both frontend and backend; never trust client-side validation alone.

Extending the integration
-------------------------
- If new endpoints are added, add small wrapper functions in `lib/api.ts` and corresponding TypeScript types in `lib/types.ts`.
- Prefer small, well-documented functions and include integration tests where possible.

