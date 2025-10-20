import bg from "./../../assets/img/bg-home.webp";
import hero from "./../../assets/img/hero-home.webp";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Auth = useAuth();
  const { login } = Auth;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userData = await login(username, password);
      if (userData.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      setError("Login failed: " + error.message);
      throw error;
    }
  };
  return (
    <div
      className="h-screen w-screen flex flex-row items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-7xl flex items-center justify-center gap-24 ">
        <div className="flex flex-col w-full justify-end">
          

          <div className="h-fit w-full bg-[#121212] text-white flex flex-col border-slate-200 border-2 rounded-2xl p-9">
            <h1 className="text-4xl font-bold">Fill in Your Credential</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
              <div className="w-full h-full border-b-2 border-slate-400 p-4 flex flex-col text-[#828282] text-base">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="w-full h-full border-b-2 border-slate-400 p-4 flex flex-col text-[#828282] text-base">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button
                className="w-full p-6 bg-emerald-500 text-white font-bold text-md rounded-xl mt-4"
                type="submit"
              >
                Login
              </button>
              {error && <p className="text-red-500">{error}</p>}
              <a href="/register" className="mt-4 text-blue-500 underline">
                Don't have an account? Register here.
              </a>
            </form>
          </div>
        </div>

        <div className="w-full h-fit mx-auto">
          <img src={hero} alt="" className="mx-auto" />
        </div>
      </div>
    </div>
  );
};
export default Login;
