import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { UserContext } from "../../hooks/UserContext";
import logoImg from "../../images/dog-logo.png";
import { LoginAccount } from "../../services/userAPI";
import FormField from "./FormField";

function Login() {
  const { setToken } = useContext(UserContext);
  const navigator = useNavigate();
  const [isStudent, setIsStudent] = useState(false);
  const [errors, setErrors] = useState("");
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (window.location.href.includes("student")) {
      setIsStudent(true);
    }
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setErrors("");

    if (!loginInput.email && !loginInput.password) {
      return setErrors("Toate campurile sunt obligatorii");
    }

    let url = `${config.baseApiUrl}/auth/login/teacher`;
    if (isStudent) {
      url = `${config.baseApiUrl}/auth/login/student`;
    }

    
    let response = await LoginAccount(url, { ...loginInput });
    if(response.status == 200){
      document.cookie = `token=${response.token}; path=/;`;
      setToken(response.token);
      navigator("/");
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
            <button
              type="submit"
              value="submit"
              className="bg-purple-500 hover:bg-purple-400 text-white py-2 px-4 border-b-4 border-purple-900 hover:border-purple-500 rounded"
            >
              Login
            </button>
            {isStudent && (
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Esti profesor?
                <a
                  href="#!"
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  onClick={() => (window.location.href = "/login/teacher")}
                >
                  Login cont profesor
                </a>
              </p>
            )}
            {!isStudent && (
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Esti student?
                <a
                  href="#!"
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  onClick={() => (window.location.href = "/login/student")}
                >
                  Login cont student
                </a>
              </p>
            )}
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Nu ai un cont?
              <a
                href="#!"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                onClick={() => (window.location.href = "/signin")}
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
