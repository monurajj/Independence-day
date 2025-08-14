import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type FlagsData = {
  // ISO date -> count
  byDate: Record<string, number>;
  allTime: number;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'flags.json');

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

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function GET() {
  const data = await ensureFile();
  const key = todayKey();
  const today = data.byDate[key] || 0;
  return NextResponse.json({ date: key, today, allTime: data.allTime });
}

export async function POST() {
  const data = await ensureFile();
  const key = todayKey();
  data.byDate[key] = (data.byDate[key] || 0) + 1;
  data.allTime += 1;
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  return NextResponse.json({ date: key, today: data.byDate[key], allTime: data.allTime });
}

