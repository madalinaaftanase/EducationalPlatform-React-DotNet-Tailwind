import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { UserContext } from "../../hooks/UserContext";
import logoImg from "../../images/dog-logo.png";
import { LoginAccount } from "../../services/userAPI";
import FormField from "./FormField";
import Button from "../navbar/components/Button";

function Login() {
  const { setToken, setUsername, setIsTeacher, setIdTeacher } = useContext(UserContext);
  const navigator = useNavigate();
  const [isStudent, setIsStudent] = useState(false);
  const [errors, setErrors] = useState("");
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (window.location.href.includes("Student")) {
      setIsStudent(true);
    }
  }, []);

  const setLocalStorage = (name: string, id: string) => {
    localStorage.setItem("username", name);
    localStorage.setItem("idTeacher", id);
    setUsername(name);
    setIdTeacher(id);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setErrors("");

    if (!loginInput.email && !loginInput.password) {
      return setErrors("Toate campurile sunt obligatorii");
    }

    let url = `${config.baseApiUrl}/Auth/Login/Teacher`;
    if (isStudent) {
      url = `${config.baseApiUrl}/Auth/Login/Student`;
    }

    let response = await LoginAccount(url, { ...loginInput });
    if (response.status == 200) {
      let token = response.data.token;
      document.cookie = `token=${token}; path=/;`;
      setToken(token);
      setIsTeacher(!isStudent);
      setLocalStorage(response.data.username, response.data.id);
      navigator("/Proiecte");
    } else {
      setErrors(response.errors[0]);
    }
  };

  const onChange = (e: any) => {
    const actualLoginInput = {
      ...loginInput,
      [e.target.name]: e.target.value,
    };

    setLoginInput(actualLoginInput);
  };

  return (
    <section className="h-screen bg-try">
      <div className="grid grid-cols-2 p-8 w-[1200px] m-auto">
        <div>
          <img src={logoImg} className="" alt="dog image" />
        </div>
        <form onSubmit={onSubmit} className="bg-white drop-shadow-md p-8 rounded">
          <h3>Intra in contul tau</h3>
          <div className="flex flex-col pt-8">
            <FormField
              text={"Email"}
              type={"email"}
              name={"email"}
              required={true}
              className={"bg-gray-100"}
              onChange={onChange}
            />
            <FormField
              text={"Parola"}
              type={"password"}
              name={"password"}
              required={true}
              className={"bg-gray-100"}
              onChange={onChange}
            />
          </div>
          {errors && <span className="text-red-600">{errors}</span>}
          <div className="pt-8">
            <Button type="submit" variant="purple" value="submit">
              <span> Login</span>
            </Button>
            {isStudent && (
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Esti profesor?&nbsp;
                <a
                  href="#!"
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  onClick={() => (window.location.href = "/Login/Profesor")}
                >
                  Login cont profesor
                </a>
              </p>
            )}
            {!isStudent && (
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Esti student?&nbsp;
                <a
                  href="#!"
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  onClick={() => (window.location.href = "/Login/Student")}
                >
                  Login cont student
                </a>
              </p>
            )}
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Nu ai un cont?&nbsp;
              <a
                href="#!"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                onClick={() => (window.location.href = "/Signin")}
              >
                Inregistreaza-te acum!
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
