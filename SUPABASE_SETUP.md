# Supabase Setup Guide for Independence Day App

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Wait for the project to be provisioned

## 2. Get Your Credentials

From your Supabase project dashboard:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxx.supabase.co`)
   - **Anon key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **Service role key** (optional, for enhanced security)

## 3. Set Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Replace the placeholder values with your actual Supabase credentials.**

## 4. Create Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-setup.sql`
3. Click **Run** to execute the schema

## 5. Test the Integration

1. Restart your development server: `npm run dev`
2. Visit your app and try hosting a flag
3. Check your Supabase dashboard → **Table Editor** → `flag_hostings` to see the data

## Current Data Migration

Your existing data will be migrated when you run the SQL setup:
- 2025-08-14: 52 flag hostings
- 2025-08-15: 52 flag hostings
- Total: 104 flag hostings

## Fallback System

The app includes a robust fallback system:
- If Supabase is unavailable, it falls back to the local JSON file
- Both systems are kept in sync when possible
- No data loss if Supabase has issues

## Benefits of Supabase Integration

✅ **Persistent Data**: Data survives deployments and server restarts
✅ **Scalability**: Handle thousands of concurrent flag hostings
✅ **Real-time**: Potential for real-time updates across users
✅ **Reliability**: Professional database with backups
✅ **Analytics**: Better insights into usage patterns

## Next Steps (Optional Enhancements)

1. Add real-time subscriptions for live flag count updates
2. Add user authentication to track individual contributions
3. Add geographic data to see flag hostings by region
4. Add analytics dashboard in the admin panel