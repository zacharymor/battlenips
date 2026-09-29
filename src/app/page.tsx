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
          The photograph stays in view. A hundred squares cover the chest.
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
              Battlenips is a one-guess picture game. A public-domain
              photograph from 1896–1901 shows sumo wrestler Konishiki
              Yasokichi shirtless, in a mawashi. The 10×10 grid sits on his
              chest, and the rest of the picture stays visible. The lime ring
              marks one square there. The picture is from Wikimedia Commons.
            </p>
          </section>
          <section>
            <h2>How to play</h2>
            <ol className="steps">
              <li>
                <span>The grid covers the chest. Squares run from 1 to 100.
                1 is the top-left of that grid. 100 is the bottom-right.</span>
              </li>
              <li>
                <span>Tap the square you think is covering it. You get one
                tap.</span>
              </li>
              <li>
                <span>The board calls hit or miss, opens the photograph, and
                rings the real square in lime.</span>
              </li>
              <li>
                <span>Play again covers the same photograph. The square stays
                put.</span>
              </li>
            </ol>
          </section>
        </article>
        <GameBoard />
      </div>
    </div>
  );
}
