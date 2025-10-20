import bg from "./../../assets/img/bg-home.webp";
import hero from "./../../assets/img/hero-home.webp";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const Auth = useAuth();
  const { register } = Auth;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
        await register(username, fullName, password);
        navigate("/login");
    } catch (error) {
        setError("Registration failed: " + error.message);
    }


  };
  return (
    <div
      className="h-screen w-screen flex flex-row items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-7xl flex items-center justify-between gap-24">
        <div className="flex flex-col w-full justify-end">
          {/* <div className="w-full h-fit flex flex-col pr-7">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Register</button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div> */}

          <div className="h-fit w-full bg-[#121212] text-white flex flex-col border-slate-200 border-2 rounded-2xl p-9">
            <h1 className="text-4xl font-bold">Register Using Your Student Registration Number</h1>
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
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
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
                Submit
              </button>
              {error && <p className="text-red-500">{error}</p>}
              <a href="/login" className="mt-4 text-blue-500 underline">
                Already have an account? Login here.
              </a>
            </form>
          </div>
        </div>

        <div className="w-full h-fit">
          <img src={hero} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Login;
