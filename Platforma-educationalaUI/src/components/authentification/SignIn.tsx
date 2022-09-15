import { useState } from "react";
import useSWR from "swr";
import config from "../../config";
import logoImg from "../../images/dog-logo.png";
import { CreateAccount } from "../../services/userAPI";

function SignIn() {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [errors, setErrors] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    setErrors("");
    if (!formInput.lastName) return setErrors("Numele este obligatoriu");
    if (!formInput.email) return setErrors("Email obligatoriu");
    if (!formInput.password) return setErrors("Parola obligatorie");
    if (!formInput.checkPassword) return setErrors("Confirma parola");
    if (formInput.password !== formInput.checkPassword)
      return setErrors("Parola si Confirma parola nu corespund");
    if (formInput.password.length < 8)
      return setErrors("Parola trebuie sa aibe cel putin 8 caractere");
    CreateAccount(`${config.baseApiUrl}/auth/register`, { ...formInput });
  };

  const onChangeInput = (e: any) => {
    const actualFormInput = {
      ...formInput,
      [e.target.name]: e.target.value,
    };
    setFormInput(actualFormInput);
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
            <label>Nume</label>
            <input
              className="bg-gray-100"
              type="text"
              name="lastName"
              required
              onChange={onChangeInput}
            />
            <label>Prenume</label>
            <input
              className="bg-gray-100"
              type="text"
              name="firstName"
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
          {errors && <span className="text-red-500">{errors}</span>}
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
                onClick={()=>window.location.href = "/login/student"}
              >
                Logheaza-te acum!
              </a>
            </p>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Esti profesor?
              <a
                href="#!"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
              >
                Cont nou de profesor!
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
