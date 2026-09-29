import { createClient } from "@supabase/supabase-js";

export type Level = {
  id: string;
  imageUrl: string;
  gridLeft: number;
  gridTop: number;
  gridSize: number;
  winningSquares: number[];
};

export const builtinLevel: Level = {
  id: "konishiki",
  imageUrl: "/photo.jpg",
  gridLeft: 0.2734,
  gridTop: 0.2801,
  gridSize: 0.4253,
  winningSquares: [33],
};

function readEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }
  return undefined;
}

export function supabasePublic() {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL");
  const key = readEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
  );
  if (!url || !key) {
    return null;
  }
  return createClient(url, key);
}

export async function listLevels(): Promise<Level[]> {
  const supabase = supabasePublic();
  if (!supabase) {
    return [builtinLevel];
  }

  const { data, error } = await supabase
    .from("levels")
    .select("id, image_url, grid_left, grid_top, grid_size, winning_squares")
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return [builtinLevel];
  }

  return data.map((row) => ({
    id: String(row.id),
    imageUrl: String(row.image_url),
    gridLeft: Number(row.grid_left),
    gridTop: Number(row.grid_top),
    gridSize: Number(row.grid_size),
    winningSquares: (row.winning_squares as number[]).map(Number),
  }));
}
