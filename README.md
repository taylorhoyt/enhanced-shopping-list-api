# Enhanced Shopping List API

A REST API for managing shopping lists, meals, and items built with Node.js, Express, TypeScript, and Supabase.

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up Supabase:
   - Create a project at [supabase.com](https://supabase.com)

3. Create `.env` file:

   ```env
   PORT=3000
   NODE_ENV=development
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

API available at `http://localhost:3000`

## API Usage

All endpoints require authentication. Get a token from Supabase and include it in requests:

```bash
curl -X GET http://localhost:3000/api/items \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
