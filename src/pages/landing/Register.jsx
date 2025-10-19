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
        <div className="w-full h-fit flex flex-col pr-7">
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
        </div>

        <div className="w-full h-fit">
          <img src={hero} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Login;
