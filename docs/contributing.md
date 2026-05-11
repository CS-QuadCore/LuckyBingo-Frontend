# Contributing

Thank you for contributing to LuckyBingo! This document outlines the recommended workflow, style and quality expectations, and the review process.

Getting started
---------------
1. Fork the repository and create a feature branch off `main`.
2. Keep branches focused around a single change or feature.

Development workflow
--------------------
- Install dependencies: `npm ci`
- Run dev server: `npm run dev`
- Format code and run linters before committing: `npm run lint` (and `npm run format` if available)

Commit messages
---------------
- Use clear, descriptive commit messages. Example: `feat(ui): add quick-play banner to home page`.

Pull requests
-------------
- Open PRs against `main` with a succinct description of the change, rationale, and any migration notes.
- Include screenshots or GIFs for visual changes and describe how to validate the change locally.

Code quality
------------
- Follow TypeScript typing rules — avoid `any` unless explicitly justified.
- Reuse components from `components/ui` and keep components small and testable.

Review process
--------------
- Maintainters will review for correctness, clarity, accessibility, and tests.
- Address review comments with follow-up commits on the same branch.

Testing
-------
- Add unit tests for critical logic where feasible. For UI changes, include at least one manual validation step in the PR description.

Thanks and contact
------------------
If you need help, open an issue or reach out to a maintainer listed in the repository README.

