import logoImg from "../../images/dog-logo.png";

function Login() {
  return (
    <section className="h-screen bg-try">
      <div className="grid grid-cols-2 p-8 w-[1200px] m-auto">
        <div>
          <img src={logoImg} className="" alt="dog image" />
        </div>
        <form action="" className="bg-white drop-shadow-md p-8 rounded">
          <h3>Intra in contul tau</h3>
          <div className="flex flex-col pt-8">
            <label>Email</label>
            <input className="bg-gray-100" type="text" />
            <label>Parola</label>
            <input className="bg-gray-100" type="password" />
          </div>
          <div className="pt-8">
            <button className="bg-purple-500 hover:bg-purple-400 text-white py-2 px-4 border-b-4 border-purple-900 hover:border-purple-500 rounded">Login</button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Nu ai un cont?
              <a
                href="#!"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
              >
                {" "}
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
