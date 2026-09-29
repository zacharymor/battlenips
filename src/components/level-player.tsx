"use client";

import { useState } from "react";
import { GameBoard } from "@/components/game-board";
import type { Level } from "@/lib/levels";

export function LevelPlayer({ levels }: { levels: Level[] }) {
  const [index, setIndex] = useState(0);
  const level = levels[index] ?? levels[0];

  return (
    <GameBoard
      key={level.id}
      level={level}
      levelLabel={`Level ${index + 1} of ${levels.length}`}
      onPlayAgain={() => {
        setIndex((current) => (current + 1) % levels.length);
      }}
    />
  );
}
