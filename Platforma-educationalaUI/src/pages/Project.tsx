import {useState} from 'react'
import BlockyMain from '../components/blockyMain/BlockyMain';
import RightSideLayout from '../components/game/RightSideLayout';
function Project() {
  const [html, setHtml] = useState("");
  const url = window.location.href;

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

export default Project;
