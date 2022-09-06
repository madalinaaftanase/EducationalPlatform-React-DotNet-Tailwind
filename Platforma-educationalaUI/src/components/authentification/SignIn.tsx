import { useState } from "react";
import logoImg from "../../images/dog-logo.png";

function SignIn() {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    alert(JSON.stringify(formInput, null, 2));
    //TODO: validare input 
  };

  const onChangeInput = (e: any) => {
    const actualFormInput = {
      ...formInput,
      [e.target.name]: e.target.value,
    };
    setFormInput(actualFormInput)
  };

  return (
    <section className="h-screen bg-try">
      <div className="grid grid-cols-2 p-8 w-[1200px] m-auto">
        <div>
          <img src={logoImg} className="" alt="dog image" />
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-white drop-shadow-md p-8 rounded"
        >
          <h3>Creaza un cont</h3>
          <div className="flex flex-col pt-8">
            <label>Nume </label>
            <input
              className="bg-gray-100"
              type="text"
              name="name"
              required
              onChange={onChangeInput}
            />
            <label>Email</label>
            <input
              className="bg-gray-100"
              type="email"
              name="email"
              required
              onChange={onChangeInput}
            />
            <label>Parola</label>
            <input
              className="bg-gray-100"
              type="password"
              name="password"
              required
              onChange={onChangeInput}
            />
            <label>Confirmare Parola</label>
            <input
              className="bg-gray-100"
              type="password"
              name="checkPassword"
              required
              onChange={onChangeInput}
            />
          </div>
          <div className="pt-8">
            <button
              type="submit"
              value="submit"
              className="bg-purple-500 hover:bg-purple-400 text-white py-2 px-4 border-b-4 border-purple-900 hover:border-purple-500 rounded"
            >
              Inregistrare
            </button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Ai deja un cont?
              <a
                href="#!"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
              >
                Logheaza-te acum!
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
