-- Supabase SQL Schema for Flag Hosting Data
-- Run this in your Supabase SQL Editor

-- Create flag_hostings table
CREATE TABLE IF NOT EXISTS flag_hostings (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique index on date to prevent duplicate entries
CREATE UNIQUE INDEX IF NOT EXISTS flag_hostings_date_idx ON flag_hostings(date);

-- Create function to increment flag count for a given date
CREATE OR REPLACE FUNCTION increment_flag_count(target_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(date DATE, today_count BIGINT, all_time_count BIGINT) AS $$
BEGIN
  -- Insert or update the count for the target date
  INSERT INTO flag_hostings (date, count)
  VALUES (target_date, 1)
  ON CONFLICT (date)
  DO UPDATE SET 
    count = flag_hostings.count + 1,
    updated_at = NOW();
  
  -- Return the updated counts
  RETURN QUERY
  SELECT 
    target_date as date,
    (SELECT count FROM flag_hostings WHERE flag_hostings.date = target_date) as today_count,
    (SELECT COALESCE(SUM(count), 0) FROM flag_hostings) as all_time_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to get flag counts
CREATE OR REPLACE FUNCTION get_flag_counts(target_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(date DATE, today_count BIGINT, all_time_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    target_date as date,
    COALESCE((SELECT count FROM flag_hostings WHERE flag_hostings.date = target_date), 0) as today_count,
    (SELECT COALESCE(SUM(count), 0) FROM flag_hostings) as all_time_count;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE flag_hostings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to everyone
CREATE POLICY "Allow read access to flag_hostings" ON flag_hostings
  FOR SELECT USING (true);

-- Create policy to allow insert/update (for incrementing counts)
CREATE POLICY "Allow increment flag counts" ON flag_hostings
  FOR ALL USING (true);

-- Insert some initial data (migrate from existing data)
-- You can run this after setting up to migrate your current counts
INSERT INTO flag_hostings (date, count) VALUES 
  ('2025-08-14', 52),
  ('2025-08-15', 52)
ON CONFLICT (date) DO NOTHING;