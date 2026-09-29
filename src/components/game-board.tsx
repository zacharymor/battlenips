"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Level } from "@/lib/levels";

const SQUARES = 100;

function squareList(squares: number[]) {
  const sorted = [...squares].sort((a, b) => a - b);
  if (sorted.length === 1) {
    return `square ${sorted[0]}`;
  }
  if (sorted.length === 2) {
    return `squares ${sorted[0]} and ${sorted[1]}`;
  }
  const last = sorted[sorted.length - 1];
  return `squares ${sorted.slice(0, -1).join(", ")}, and ${last}`;
}

export function GameBoard({
  level,
  levelLabel,
  onPlayAgain,
}: {
  level: Level;
  levelLabel: string;
  onPlayAgain: () => void;
}) {
  const [guess, setGuess] = useState<number | null>(null);
  const statusId = useId();
  const resultRef = useRef<HTMLHeadingElement>(null);
  const winning = new Set(level.winningSquares);

  const revealed = guess !== null;
  const hit = revealed && winning.has(guess);

  useEffect(() => {
    if (revealed) {
      resultRef.current?.focus();
    }
  }, [revealed]);

  function pick(square: number) {
    if (guess !== null) {
      return;
    }
    setGuess(square);
  }

  function playAgain() {
    setGuess(null);
    onPlayAgain();
  }

  let status = "Pick a square. One guess.";
  if (hit && guess !== null) {
    status = `Hit. Square ${guess} was hiding it.`;
  } else if (revealed && guess !== null) {
    status = `Miss. You picked ${guess}. It was ${squareList(level.winningSquares)}.`;
  }

  return (
    <section className="game" aria-labelledby="board-title">
      <div className="game-head">
        <h2 id="board-title">The board</h2>
        <p className="game-note">
          {levelLabel}. The photograph stays in view. The grid covers the chest.
          Tiles open when you tap, and a winning square gets a lime ring.
        </p>
      </div>

      <div
        className={`result ${hit ? "result-hit" : ""} ${revealed && !hit ? "result-miss" : ""}`}
        aria-live="polite"
      >
        {revealed ? (
          <h3 id={statusId} ref={resultRef} tabIndex={-1} className="result-title">
            {status}
          </h3>
        ) : (
          <p id={statusId} className="result-title">
            {status}
          </p>
        )}
        {revealed ? (
          <button type="button" className="again" onClick={playAgain}>
            Play again
          </button>
        ) : null}
      </div>

      <div className="board">
        <img
          src={level.imageUrl}
          alt="Photograph for this level. The numbered grid covers the chest."
          className="board-art"
        />
        <div
          className="cells"
          style={{
            left: `${level.gridLeft * 100}%`,
            top: `${level.gridTop * 100}%`,
            width: `${level.gridSize * 100}%`,
          }}
          role="group"
          aria-label="10 by 10 grid over the chest. Square 1 is top-left. Square 100 is bottom-right."
          aria-describedby={statusId}
        >
          {Array.from({ length: SQUARES }, (_, index) => {
            const square = index + 1;
            const isTarget = revealed && winning.has(square);
            const isWrong = revealed && square === guess && !hit;
            const label = isTarget
              ? `Square ${square}, a winning square`
              : isWrong
                ? `Square ${square}, your guess`
                : `Square ${square}`;

            return (
              <button
                key={square}
                type="button"
                className={[
                  "cell",
                  revealed ? "cell-open" : "",
                  isTarget ? "cell-target" : "",
                  isWrong ? "cell-miss" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={revealed}
                aria-label={label}
                onClick={() => pick(square)}
              >
                <span className="num">{square}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="legend">
        <li>
          <span className="swatch swatch-lime" aria-hidden="true" />
          Lime ring: a winning square
        </li>
        <li>
          <span className="swatch swatch-magenta" aria-hidden="true" />
          Magenta ring: your miss
        </li>
      </ul>
    </section>
  );
}
