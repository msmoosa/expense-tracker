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
- `src/App.jsx` owns the `transactions` state (seeded in `useState`; resets on reload) and the `categories` list, and passes them to three children in `src/`:
  - `Summary` derives income/expense/balance totals from `transactions`.
  - `TransactionForm` owns its input state and calls `onAdd(transaction)`; `App` appends it.
  - `TransactionList` owns the type/category filter state and renders the filtered table. Each row's Delete button asks `window.confirm`, then calls `onDelete(id)`; `App` removes the transaction.
- Transaction shape: `{ id, description, amount: number, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. The category list is a hard-coded array inside `App`.
- Styling is plain CSS in `src/App.css` (component) and `src/index.css` (global), with class names like `summary-card`, `income-amount`, `expense-amount`. `App.css` is imported only in `App.jsx` but styles all child components.

## Conventions

- One component per file in `src/` (flat, no subfolders), `function` component with a default export, imported without the `.jsx` extension.
- Shared data lives in `App` and flows down as props; children report changes through callbacks (`onAdd`). UI-only state (form inputs, filters) stays in the component that uses it. Derived values (totals, filtered lists) are computed during render, not stored in state.
- Keep `amount` numeric: parse form input with `parseFloat` before it enters `transactions`, or totals break.

## Lint notes

ESLint uses `js.configs.recommended`, `react-hooks`, and `react-refresh` (Vite preset). `no-unused-vars` ignores names matching `^[A-Z_]`.