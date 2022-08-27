function Signin() {
    return ( 
        <main className="flex bg-red-200">
            <section className="flex flex-col justify-center bg-yellow-100">
                <img src="https://i0.wp.com/techweez.com/wp-content/uploads/2018/05/minion.gif?fit=748%2C561&ssl=1" alt="logo-dog"/>
                <h3>Welcome</h3>
            </section>
            <section className=" flex flex-col border-solid border-2  h-64 w-64">
                <h2>Sign In</h2>
                <p>Name</p>
                <input type="text" />
                <button>Click</button>
            </section>
        </main>
     );
}

export default Signin;