import hero from "./../../assets/img/hero-home.webp";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SimpleInput from "../../components/input/SimpleInput";
import PrimaryBackground from "../../components/PrimaryBackground";
import PrimaryButton from "../../components/button/PrimaryButton";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState({
    username: "",
  })
  const [formError, setFormError] = useState(null);
  const Auth = useAuth();
  const { register } = Auth;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "username") {
        setUsername(value);
    } else if (name === "password") {
        setPassword(value);
    } else if (name === "fullName") {
        setFullName(value);
    }

    validateField(name, value);
  }

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "username") {
        if (!value) {
            errorMsg = "NIM is required";
        }
        if (value && !/^\d{10}$/.test(value)) {
            errorMsg = "Don't try to be sneaky, You must provide a valid NIM.";
        }
    } 
    else if (name === "fullName") {
      if (!value) {
        errorMsg = "Use your full name otherwise Pak Med won't be able to credit your exam.";
      }
    } 
    else if (name === "password") {
      if (!value) {
        errorMsg = "Password is required, do not use your home address neither your pet's name.";
    }
  }

    setError((prevError) => ({
        ...prevError,
        [name]: errorMsg,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    
    const isFormEmpty = !username 
    const hasErrors = Object.values(error).some((errorMsg) => errorMsg !== "");
    if (hasErrors || isFormEmpty) {
        validateField("username", username);
        setFormError("Please fix the errors in the form before submitting.");
        return;
    }
    
    try {
        await register(username, fullName, password);
        navigate("/login");
    } catch (error) {
        setFormError("Registration failed: " + error.message);
    }


  };
  return (
    <PrimaryBackground>
      <div className="w-7xl flex items-center justify-between gap-24">
        <div className="flex flex-col w-full justify-end">
          <div className="h-fit w-full bg-[#121212] text-white flex flex-col border-slate-200 border-2 rounded-2xl p-9">
            <h1 className="text-4xl font-bold">Register Using Your Student Registration Number</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
              <SimpleInput
                label="NIM"
                type="text"
                value={username}
                onChange={(e) => handleChange(e)}
                placeholder="Please enter your NIM"
                error={error.username}
                name="username"
              />
              <SimpleInput
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => handleChange(e)}
                placeholder="Please enter your full name"
                name="fullName"
              />
              <SimpleInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => handleChange(e)}
                placeholder="Please enter your password"
                name="password"
              />
              {/* <button
                className="w-full p-6 bg-emerald-500 text-white font-bold text-md rounded-xl mt-4"
                type="submit"
              >
                Submit
              </button> */}
              <PrimaryButton 
                text="Submit"
                type="submit"
                className="w-fit"
              />
              {formError && <p className="text-red-500">{formError}</p>}
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
    </PrimaryBackground>
  );
};
export default RegisterPage;
