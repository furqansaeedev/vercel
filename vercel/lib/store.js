// ⚠️ For demo only. Resets on serverless cold starts.
// Use a real DB (Vercel Postgres, MongoDB, Supabase) for production.

if (!global._users) global._users = [];
if (!global._applications) global._applications = [];

export const users = global._users;
export const applications = global._applications;