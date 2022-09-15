import { useEffect, useState } from "react";
import config from "../../config";
import logoImg from "../../images/dog-logo.png";
import { LoginAccount } from "../../services/userAPI";

function Login() {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [isStudent, setIsStudent] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (window.location.href.includes("student")) {
      setIsStudent(true);
    }
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setErrors("");
    
    if (!loginInput.email && !loginInput.password) {
      return setErrors("Toate campurile sunt obligatorii");
    }

    let url = `${config.baseApiUrl}/auth/login/teacher`;
    if (isStudent) {
      url = `${config.baseApiUrl}/auth/login/student`;
    }
    LoginAccount(url, { ...loginInput });
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
        <form
          onSubmit={onSubmit}
          className="bg-white drop-shadow-md p-8 rounded"
        >
          <h3>Intra in contul tau</h3>
          <div className="flex flex-col pt-8">
            <label>Email</label>
            <input
              className="bg-gray-100"
              type="email"
              name="email"
              onChange={onChange}
              required
            />
            <label>Parola</label>
            <input
              className="bg-gray-100"
              type="password"
              name="password"
              onChange={onChange}
              required
            />
          </div>
          {errors && <span>{errors}</span>}
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
