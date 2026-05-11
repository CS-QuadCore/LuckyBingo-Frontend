# Components Guide

This guide explains component organization, conventions, and best practices for the LuckyBingo frontend. The goal is to keep components consistent, testable, and accessible.

Directory layout
----------------
- `components/home` — components used by the home and lobby pages (CreateRoomForm, JoinRoomForm, HomeHero).
- `components/room` — core gameplay components (BingoCard, CalledNumbers, PlayerList, QuickChatMenu, RoomHeader).
- `components/modals` — modal dialogs used to manage sessions and user interactions (WelcomeModal, WinnerModal, RestartSessionModal, etc.).
- `components/ui` — shared primitives and design tokens (Button, Input, Dialog, Select, Card). These are intentionally simple and unopinionated.

Component design principles
---------------------------
1. Single responsibility: each component should have a clear, narrow purpose.
2. Controlled vs uncontrolled: prefer controlled inputs where the parent is authoritative for form state.
3. Composition: favor composing small primitives from `components/ui` instead of duplication.
4. Accessibility: interactive components must have accessible labels, keyboard behavior, and focus management.
5. Style isolation: use Tailwind utility classes and avoid heavy global CSS overrides. Keep style choices consistent with `globals.css`.

Patterns and examples
--------------------
- Presentational components: purely UI rendering based on props — place these in `components/ui` or a `presentational` subfolder.
- Container components / hooks: handle effects, data fetching, and subscriptions. Put data logic in `app/` pages/hooks or `lib/` helpers, not directly in presentational components.

Testing and Storybook
---------------------
- Add unit tests for complex rendering logic (e.g., BingoCard rendering, win-state display).
- If integrating Storybook later, prefer stories for interactive UI states (empty room, host view, winner view).

Example: `BingoCard` responsibilities
------------------------------------
- Render 5x5 grid of numbers/markers
- Provide callbacks for selecting or highlighting cells (if applicable)
- Avoid holding global game state — consume the card prop and emit events for actions that require server validation

Code review checklist for components
-----------------------------------
- Is the component small and focused?
- Are props typed with clear interfaces (`lib/types.ts` when appropriate)?
- Are ARIA attributes and keyboard interactions handled?
- Is styling consistent with existing components?
- Are side effects and subscriptions cleaned up?

