import { getCookie } from "../utilities/cookieFunctions";

function Profile() {
  const logout = () => {
    localStorage.removeItem("username");
    document.cookie = "token=; expires=" + new Date(0).toUTCString() + "; path=/";
    window.location.href = "/";
  };

  return <button onClick={logout} className="bg-blue-400 p-2 hover:bg-blue-200">Log out</button>;
}

export default Profile;
