# Development Notes

This page is a collection of practical notes and conventions to help developers make consistent, maintainable changes to the frontend.

API client
----------
- Use `lib/api.ts` as the single integration point for HTTP and WebSocket helpers. Adding new endpoints should be done by extending this file and the corresponding TypeScript types in `lib/types.ts`.

Styling
-------
- Tailwind CSS is the primary styling method. Prefer utility classes over bespoke CSS where possible.
- Use `globals.css` for theme tokens, color variables, and shared layout utilities.

Accessibility
-------------
- All interactive elements must support keyboard interaction and have accessible labels.
- Modals must trap focus and provide a clear escape method (e.g., ESC key).

Performance
-----------
- Avoid expensive computations in render paths; memoize derived values and use `React.useMemo`/`useCallback` where helpful.
- Use code-splitting for heavy components if they are not needed immediately on page load.

Observability
-------------
- Add informative error messages when API calls fail, and log details to the console with a consistent prefix to aid debugging.

Local testing and utilities
--------------------------
- Use the browser devtools for network and WebSocket inspection. Maintain small scripts that can seed test rooms when debugging multi-player flows.

PR and review checklist
-----------------------
1. Does the change include required type updates in `lib/types.ts`?
2. Are all new components covered by a small unit test (if applicable)?
3. Is accessibility considered and tested?
4. Is styling consistent with existing patterns?

