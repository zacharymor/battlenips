import { GameBoard } from "@/components/game-board";

export default function Home() {
  return (
    <div className="page">
      <header className="mast">
        <p className="eyebrow">County fair card · one guess only</p>
        <h1 className="wordmark">
          <span className="word-battle">Battle</span>
          <span className="word-nips">nips</span>
        </h1>
        <p className="lede">
          A drawn sumo wrestler under a hundred squares. Find the one hiding the nipple.
        </p>
        <p className="stamp" aria-hidden="true">
          One
          <br />
          tap
        </p>
      </header>

      <div className="stage">
        <article className="brochure">
          <section>
            <h2>What it is</h2>
            <p>
              Battlenips is a one-guess picture game. A stylized sumo
              wrestler sits under a 10×10 grid. The nipple is a printed
              bullseye dealt onto that drawing — a graphic mark, not a
              photograph of a real athlete.
            </p>
          </section>
          <section>
            <h2>How to play</h2>
            <ol className="steps">
              <li>
                <span>Squares run from 1 to 100. 1 is the top-left. Numbers
                go left to right, then down a row. 100 is the bottom-right.</span>
              </li>
              <li>
                <span>Tap the square you think is covering the bullseye. You
                get one tap.</span>
              </li>
              <li>
                <span>The board calls hit or miss, opens the drawing, and rings
                the real square in lime.</span>
              </li>
              <li>
                <span>Play again deals the bullseye onto a new square.</span>
              </li>
            </ol>
          </section>
        </article>
        <GameBoard />
      </div>
    </div>
  );
}
