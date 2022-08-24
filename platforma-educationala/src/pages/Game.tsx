import BlockyMain from "../components/BlockyMain";
import Result from "../components/compiler/Result";

function Game() {
  return (
    <main className="grid grid-cols-2">
      <section>
        <BlockyMain />
      </section>
      <section className="bg-gray-200">
        <Result />
      </section>
    </main>
  );
}

export default Game;
