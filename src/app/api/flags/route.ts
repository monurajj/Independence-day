import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

type FlagsData = {
  // ISO date -> count
  byDate: Record<string, number>;
  allTime: number;
};

type SupabaseFlagData = {
  result_date: string;
  today_count: number;
  all_time_count: number;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'flags.json');

// Fallback file system functions (in case Supabase is unavailable)
async function ensureFile(): Promise<FlagsData> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw) as FlagsData;
  } catch {
    const initial: FlagsData = { byDate: {}, allTime: 0 };
    await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
}

async function updateFile(data: FlagsData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function GET() {
  const key = todayKey();
  
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.rpc('get_flag_counts', { target_date: key });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const result = data[0] as SupabaseFlagData;
        return NextResponse.json({ 
          date: result.result_date, 
          today: result.today_count, 
          allTime: result.all_time_count 
        });
      }
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error);
    }
  }
  
  // Fallback to file system
  const fileData = await ensureFile();
  const today = fileData.byDate[key] || 0;
  return NextResponse.json({ date: key, today, allTime: fileData.allTime });
}

export async function POST() {
  const key = todayKey();
  
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.rpc('increment_flag_count', { target_date: key });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const result = data[0] as SupabaseFlagData;
        
        // Also update local file as backup
        try {
          const fileData = await ensureFile();
          fileData.byDate[key] = result.today_count;
          fileData.allTime = result.all_time_count;
          await updateFile(fileData);
        } catch (fileError) {
          console.error('Failed to update backup file:', fileError);
        }
        
        return NextResponse.json({ 
          date: result.result_date, 
          today: result.today_count, 
          allTime: result.all_time_count 
        });
      }
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error);
    }
  }
  
  // Fallback to file system
  const fileData = await ensureFile();
  fileData.byDate[key] = (fileData.byDate[key] || 0) + 1;
  fileData.allTime += 1;
  await updateFile(fileData);
  return NextResponse.json({ date: key, today: fileData.byDate[key], allTime: fileData.allTime });
}

