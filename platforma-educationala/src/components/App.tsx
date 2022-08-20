import BlockyMain from "./BlockyMain";
import Result from "./compiler/Result";

function App() {
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

export default App;
