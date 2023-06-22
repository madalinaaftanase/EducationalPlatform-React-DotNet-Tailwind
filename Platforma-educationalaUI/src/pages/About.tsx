import Question from "../components/about/components/Question";
import placeholderImg from "../images/placeholder.jpg";
function About() {
  return (
    <div className="px-[10%] pt-4 bg-[#F8F6F4] h-auto pb-4">
      <h1>Despre aplicatie</h1>
      <div className="flex justify-center mt-16 gap-x-2">
        <div>
          <p>
            Web Academy este o platforma educationala de programare vizuala prin care copii isi pot
            dezvolta abilitatile de gandire computationala. Aceasta se bazeaza pe o metoda
            interactiva de invatare, care incurajeaza experimentarea si invatarea prin practica.
          </p>
          <p>
            Prin intermediul blocurilor vizuale de codare, copiii pot crea site-uri web simple si
            atractive, fara a fi nevoie sa cunoasca limbajul de programare. Această metoda de
            invatare intuitiva si usor de utilizat ii ajuta sa inteleaga principiile de baza ale
            programarii si sa-si dezvolte abilitatile digitale inca de la o varsta frageda.
          </p>
          <p>
            Aplicatia este special creata pentru copii cu varste intre 9 si 16 ani si pentru toti
            cei care doresc sa-si dezvolte abilitatile in domeniul web-ului.
          </p>
        </div>
        <img src={placeholderImg} />
      </div>
      <div className="mt-4 flex gap-x-2">
        <div className="bg-blue-100 ring-2 ring-blue-400 rounded w-[50%]">
          <h5 className="bg-blue-300 p-2">Pentru Parinti</h5>
          <Question text={"De ce sa imi las copilul sa foloseasca platforma?"} />
          <p className="px-1">
            Platforma ofera oportunitatea copiilor de a invata programarea web intr-un mod
            distractiv si interesant. Copiii vor fi capabili sa creeze propriile lor site-uri web,
            ceea ce le va permite sa-și dezvolte creativitatea. In plus, cunostintele de programare
            sunt o abilitate importantă in lumea digitala de astazi si pot oferi oportunitati de
            cariera in viitor.
          </p>
          <Question text={"Cat de sigura este?"} />
          <p className="px-1">
            Platforma este conceputa pentru copiii cu varstele intre 9 și 16 ani si respecta cele
            mai inalte standarde de securitate. Toate datele copiilor sunt protejate si pastrate in
            siguranta, iar copiii au acces doar la continutul adecvat varstei lor.
          </p>
          <Question text={"Cat costa?"} />
          <p className="px-1">Vesti bune, platforma este gratuita pentru toti utilizatorii.</p>
        </div>
        <div className="bg-blue-100 ring-2 ring-blue-400 rounded w-[50%]">
          <h5 className="bg-blue-300 p-2">Pentru Profesori</h5>
          <Question text={"De ce sa folosesc platforma?"} />
          <p className="px-1">
            Deoarece este conceputa pentru a face programarea accesibila pentru toti elevii,
            indiferent de nivelul de cunostinte anterioare in programare. De asemenea, este
            concepută pentru a fi usor de utilizat, chiar si pentru persoanele care nu au experienta
            anterioara in programare. Interfata intuitiva si sistemul de blocuri vizuale permit
            utilizatorilor sa creeze si să editeze proiecte fara a fi nevoie să scrie cod.
          </p>
          <Question text={"Pot vedea ce lucreaza elevii?"} />
          <p className="px-1">
            Aceasta aplicatie ofera un sistem de management al claselor si al elevilor care permite
            profesorilor sa creeze si sa administreze clase si proiecte. Acasta caracteristica
            permite profesorilor sa urmareasca progresul fiecarui elev in timp real si sa le ofere
            ajutor individualizat acolo unde este necesar.
          </p>
          <Question text={"Cat costa?"} />
          <p className="px-1">
            Este gratuita pentru toti utilizatorii, atat profesori cat si studenti.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
