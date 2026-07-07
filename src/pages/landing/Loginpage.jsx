import hero from "./../../assets/img/hero-home.webp";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SimpleInput from "../../components/input/SimpleInput";
import PrimaryBackground from "../../components/PrimaryBackground";
import PrimaryButton from "../../components/button/PrimaryButton";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Auth = useAuth();
  const { login } = Auth;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const userData = await login(username, password);
      if (userData.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      setError("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <PrimaryBackground>
      <div className="w-7xl flex items-center justify-center gap-24 ">
        <div className="flex flex-col w-full justify-end">
          <div className="h-fit w-full bg-[#121212] text-white flex flex-col border-slate-200 border-2 rounded-2xl p-9">
            <h1 className="text-4xl font-bold">Fill in Your Credential</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
              <SimpleInput
                label="NIM"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Please enter your NIM"
                disabled={isLoading}
              />
              <SimpleInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter your password"
                disabled={isLoading}
              />
              <PrimaryButton text="Login" type="submit" className="w-fit" loading={isLoading} />
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
    </PrimaryBackground>
  );
};
export default Login;
