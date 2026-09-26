# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course: a React expense tracker that **intentionally** ships with a bug, poor UI, and messy code, all meant to be fixed over time. Expect to find and fix problems rather than preserve existing patterns.

## Commands

```bash
npm install        # required first; `vite` is not global
npm run dev        # Vite dev server at http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the built dist/
npm run lint       # ESLint (flat config, eslint.config.js)
```

There is no test framework configured yet.

## Architecture

Plain React 19 + Vite 7, JavaScript/JSX (no TypeScript), no router, no state library, no backend or persistence.

- `src/main.jsx` mounts `<App />` in `StrictMode`.
- `src/App.jsx` holds the **entire app in one component**: seed transactions in `useState`, add-transaction form state, type/category filter state, derived totals (income, expenses, balance), and the rendered summary cards, form, and table. Data resets on reload.
- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. The category list is a hard-coded array inside `App`.
- Styling is plain CSS in `src/App.css` (component) and `src/index.css` (global), with class names like `summary-card`, `income-amount`, `expense-amount`.

## Known issues in the starter code

- `amount` is stored as a **string** (in the seed data and from the form input), so the `reduce` totals concatenate strings instead of adding numbers.
- The "Freelance Work" seed entry has `type: "expense"` but `category: "salary"`.

## Lint notes

ESLint uses `js.configs.recommended`, `react-hooks`, and `react-refresh` (Vite preset). `no-unused-vars` ignores names matching `^[A-Z_]`.