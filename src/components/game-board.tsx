"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

const SQUARES = 100;

function dealSquare() {
  return 1 + Math.floor(Math.random() * SQUARES);
}

function columnOf(square: number) {
  return ((square - 1) % 10) + 1;
}

function rowOf(square: number) {
  return Math.floor((square - 1) / 10) + 1;
}

const subscribe = () => () => {};

export function GameBoard() {
  const dealt = useRef<number[]>([]);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState<number | null>(null);
  const statusId = useId();
  const resultRef = useRef<HTMLHeadingElement>(null);

  const target = useSyncExternalStore(
    subscribe,
    () => {
      const existing = dealt.current[round];
      if (existing !== undefined) {
        return existing;
      }
      const square = dealSquare();
      dealt.current[round] = square;
      return square;
    },
    () => null,
  );

  const revealed = guess !== null && target !== null;
  const hit = revealed && guess === target;

  useEffect(() => {
    if (revealed) {
      resultRef.current?.focus();
    }
  }, [revealed]);

  function pick(square: number) {
    if (target === null || guess !== null) {
      return;
    }
    setGuess(square);
  }

  function playAgain() {
    setGuess(null);
    setRound((current) => current + 1);
  }

  let status = "Dealing a square…";
  if (target !== null && guess === null) {
    status = "Pick a square. One guess.";
  } else if (hit && target !== null) {
    status = `Hit. Square ${target} was hiding it.`;
  } else if (revealed && target !== null && guess !== null) {
    status = `Miss. You picked ${guess}. It was square ${target}.`;
  }

  return (
    <section className="game" aria-labelledby="board-title">
      <div className="game-head">
        <h2 id="board-title">The board</h2>
        <p className="game-note">
          Tiles stay shut until you tap. Then the drawing opens and the real
          square gets a lime ring.
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
        <Image
          src="/illustration.png"
          alt="Stylized drawing of a figure, hidden under the numbered grid."
          fill
          priority
          sizes="(max-width: 860px) 100vw, 560px"
          className="board-art"
        />
        {target !== null ? (
          <div className="mark-layer" aria-hidden="true">
            <div
              className="mark-cell"
              style={{ gridColumn: columnOf(target), gridRow: rowOf(target) }}
            >
              <svg viewBox="0 0 64 64" className="nipple">
                <circle cx="32" cy="32" r="24" fill="#ff2d6a" stroke="#1a120c" strokeWidth="3" />
                <circle cx="32" cy="32" r="13" fill="#fff8e8" stroke="#1a120c" strokeWidth="3" />
                <circle cx="32" cy="32" r="5" fill="#1a120c" />
              </svg>
            </div>
          </div>
        ) : null}
        <div
          className="cells"
          role="group"
          aria-label="10 by 10 grid. Square 1 is top-left. Square 100 is bottom-right."
          aria-describedby={statusId}
        >
          {Array.from({ length: SQUARES }, (_, index) => {
            const square = index + 1;
            const isTarget = revealed && square === target;
            const isWrong = revealed && square === guess && !hit;
            const label = isTarget
              ? `Square ${square}, the hiding spot`
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
                disabled={target === null || revealed}
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
          Lime ring: the hiding spot
        </li>
        <li>
          <span className="swatch swatch-magenta" aria-hidden="true" />
          Magenta ring: your miss
        </li>
      </ul>
    </section>
  );
}
