import { useState } from "react";
import BlockyMain from "../components/blockyMain/BlockyMain";
import Result from "../components/game/ResultCompiler";
import RightSideLayout from "../components/game/RightSideLayout";

function Game() {
  const [html, setHtml] = useState("");

  return (
    <main className="grid grid-rows-2  md:grid-cols-[3fr_2fr]">
      <section>
        <BlockyMain setHtml={setHtml} />
      </section>
      <section className="bg-gray-200">
        <RightSideLayout htmlText={html} />
      </section>
    </main>
  );
}

export default Game;
