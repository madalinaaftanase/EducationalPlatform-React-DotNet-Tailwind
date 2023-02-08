import {useState} from 'react'
import BlockyMain from '../components/blockyMain/BlockyMain';
import RightSideLayout from '../components/game/RightSideLayout';
function Project() {
  const [html, setHtml] = useState("");
  const url = window.location.href;

  // const url = `${config.baseApiUrl}/Projects/${project.id}`;
  // useEffect(() => {
  //   init();
  // }, []);

  // let init = async () => {
  //   const response = await getById(url);
  //   if (response.responseStatus == 200) {
  //     //setProjects(response.projects);
  //   }
  // };

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
