# RSU Loan Prototype

This project is a Vite + React prototype for a waitlist and analytics demo backed by Supabase.

## Quick local setup

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

## Supabase

- Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in your environment (see `.env`).
- The project uses Supabase for the `waitlist` table and collects lightweight page view analytics into `page_views`.

## Technologies

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
