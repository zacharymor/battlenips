import { LevelPlayer } from "@/components/level-player";
import { listLevels } from "@/lib/levels";

export const dynamic = "force-dynamic";

export default async function Home() {
  const levels = await listLevels();
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
              photograph with a 10×10 grid on the chest. Niptagger saves each
              picture, grid, and winning squares as a level. The lime ring
              marks every winning square. The starter picture is a
              public-domain photograph of Konishiki Yasokichi from Wikimedia
              Commons.
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
                <span>Play again loads the next level. With one level, it covers
                the same photograph.</span>
              </li>
            </ol>
          </section>
        </article>
        <LevelPlayer levels={levels} />
      </div>
    </div>
  );
}
