import { Link } from "react-router-dom";

const Spinner = () => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const colorStyle = {
  white: {
    text: "text-white",
    bgColor: "bg-white",
    textColor: "text-green-600",
    hover: "hover:border-green-600 border-2 hover:text-white",
  },
  green: {
    text: "text-green-600",
    bgColor: "bg-green-600",
    textColor: "text-white",
    hover: "hover:outline-green-200 hover:outline-4  ",
  },
  noColor: {
    bgColor: "bg-transparent",
    textColor: "text-green-600",
    border: "border-2 border-green-600",
    hover: "hover:outline-green-200  hover:bg-green-200 "
  }
};

const PrimaryButton = ({ text, type, primaryColor, onClick, iconUrl = "", disabled = false, loading = false }) => {
  const currentColorStyle = colorStyle[primaryColor] || colorStyle.green
  text = text || "Primary Button";
  const isDisabled = disabled || loading;
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`w-full mt-8 py-4 px-6 rounded-2xl shadow-md inline-flex justify-between items-center cursor-pointer ${currentColorStyle.bgColor} ${currentColorStyle.textColor} ${currentColorStyle.hover} ${currentColorStyle.border} transition-all duration-200 ease-in-out ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <p className={`text-center mx-auto font-bold text-xl flex items-center gap-2`}>
          {loading && <Spinner />}
          {text}
        </p>
        {iconUrl && !loading && <img src={iconUrl} alt="button icon" className="w-6 h-6 ml-2" />}
      </button>
    </>
  );
};

export default PrimaryButton;
