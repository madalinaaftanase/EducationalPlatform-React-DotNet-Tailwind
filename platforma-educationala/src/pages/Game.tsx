import { useState } from "react";
import BlockyMain from "../components/blockyMain/BlockyMain";
import Result from "../components/compiler/Result";

function Game() {
  const [html, setHtml] = useState("");

  return (
    <main className="grid grid-rows-2 md:grid-cols-2">
      <section>
        <BlockyMain setHtml={setHtml} />
      </section>
      <section className="bg-gray-200">
        <Result htmlText={html} />
      </section>
    </main>
  );
}

export default Game;
