"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

const SQUARES = 100;
const TARGET = 34;

export function GameBoard() {
  const [guess, setGuess] = useState<number | null>(null);
  const statusId = useId();
  const resultRef = useRef<HTMLHeadingElement>(null);
  const target = TARGET;

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
          Tiles stay shut until you tap. Then the photograph opens and the real
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
          src="/photo.jpg"
          alt="Public-domain photograph of shirtless sumo wrestler Konishiki Yasokichi, hidden under the numbered grid."
          fill
          priority
          sizes="(max-width: 860px) 100vw, 560px"
          className="board-art"
        />
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
