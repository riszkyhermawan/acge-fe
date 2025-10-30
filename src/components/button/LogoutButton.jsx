import { useAuth } from "./../../context/AuthContext";
import icon from "./../../assets/icon/logout-icon.svg";


const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={() => logout()}
      className="flex flex-row items-center justify-center bg-error-dark text-error font-bold px-6 py-3 rounded-2xl text-xl hover:outline-4 hover:outline-red-300 cursor-pointer transition-all duration-200 ease-in-out "
    >
      Logout
      <img src={icon} alt="logout icon" className="inline-block ml-2 w-6 h-6" />
    </button>
  );
};

export default LogoutButton;
