import { useState } from "react";
import config from "../../config";
import logoImg from "../../images/dog-logo.png";
import { CreateAccount } from "../../services/userAPI";
import FormField from "./FormField";

function SignIn() {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [errors, setErrors] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

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

    var url = `${config.baseApiUrl}/Auth/Register/Student`;
    if (isTeacher) {
      url = `${config.baseApiUrl}/Auth/Register/Teacher`;
    }
    CreateAccount(url, { ...formInput });
  };

  const onChangeInput = (e: any) => {
    const actualFormInput = {
      ...formInput,
      [e.target.name]: e.target.value,
    };
    setFormInput(actualFormInput);
  };

  const onChangeCheckbox = (e: any) => {
    setIsTeacher(!isTeacher);
  };

  return (
    <section className="h-screen bg-try">
      <div className="grid grid-cols-2 p-8 w-[1200px] m-auto">
        <div>
          <img src={logoImg} className="" alt="dog image" />
        </div>
        <form onSubmit={onSubmit} className="bg-white drop-shadow-md p-8 rounded">
          <h3>Creaza un cont</h3>
          <div className="flex flex-col pt-8">
            <FormField
              text={"Nume"}
              type={"text"}
              name={"lastName"}
              required={true}
              className={"bg-gray-100"}
              onChange={onChangeInput}
            />
            <FormField
              text={"Prenume"}
              type={"text"}
              name={"firstName"}
              required={true}
              className={"bg-gray-100"}
              onChange={onChangeInput}
            />
            <FormField
              text={"Email"}
              type={"email"}
              name={"email"}
              required={true}
              className={"bg-gray-100"}
              onChange={onChangeInput}
            />
            <FormField
              text={"Parola"}
              type={"password"}
              name={"password"}
              required={true}
              className={"bg-gray-100"}
              onChange={onChangeInput}
            />
            <FormField
              text={"Confirmare Parola"}
              type={"password"}
              name={"checkPassword"}
              required={true}
              className={"bg-gray-100"}
              onChange={onChangeInput}
            />
          </div>
          <div className="flex gap-2 items-center">
            <FormField
              text={"Sunt profesor"}
              type={"checkbox"}
              name={"teacherCheck"}
              required={false}
              className={""}
              onChange={onChangeCheckbox}
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
                onClick={() => (window.location.href = "/Login/Student")}
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
