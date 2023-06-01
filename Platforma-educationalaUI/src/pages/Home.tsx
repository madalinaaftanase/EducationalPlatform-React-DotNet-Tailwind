import { useNavigate } from "react-router-dom";
import TextContainer from "../components/common/TextContainer";
import Button from "../components/navbar/components/Button";
import i1 from "../images/h4.png";
import i2 from "../images/h6.png";
import wheel1 from "../images/wheel1.png";
import wheel2 from "../images/wheel2.png";

function Home() {
  const navigator = useNavigate();
  return (
    <div className="border-t-2 border-[#A6D1E6] shadow-md bg-textColor">
      <div className="flex bg-[#8DCBE6] border-b-2 border-[#DFF6FF] h-[35%]">
        <div className="text-textColor flex flex-col justify-center px-4 font-bold">
          <h3>Descopera magia CSS, HTML și JavaScript!</h3>
          <h5>
            Invata, exploreaza si creeaza propriul tau univers digital. Nu exista limite pentru ceea
            ce poti realiza!
          </h5>
        </div>
        <img className=" " src={i1} alt="kids" />
      </div>
      <div className="flex justify-center gap-32 mt-8">
        <div>
          <img src={i2} alt="kid img" className="h-[70%]" />
        </div>
        <div className="p-8 font-bold">
          <h3 className="pb-4">Ce poti face?</h3>
          <TextContainer imgPath={wheel1} text={"Invata CSS,HTML,JavaScript"} />
          <TextContainer imgPath={wheel2} text={"Colaboreaza in echipa"} />
          <TextContainer imgPath={wheel1} text={"Creaza proiecte web"} />
          <TextContainer imgPath={wheel2} text={"Primeste feedback si evaluare"} />
          <TextContainer imgPath={wheel1} text={"Expune-ti creativitatea digitala"} />
        </div>
      </div>
      <div className="flex flex-col justify-center align-items-center">
        <h4 className="flex justify-center font-bold p-4">
          Ai incredere in tine si continua sa inveti, pentru ca nu există limita pentru ceea ce poti
          realiza!
        </h4>
        <div className="flex gap-8 mb-4">
          <Button
            variant="general"
            onClick={() => {
              navigator("/Login/Student");
            }}
          >
            <span>Intra in cont</span>
          </Button>
          <Button
            variant="general"
            onClick={() => {
              navigator("/Signin");
            }}
          >
            <span>Alatura-te</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
