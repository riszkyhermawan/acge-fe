import { Link } from "react-router-dom";

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
};

const PrimaryButton = ({ text, type, primaryColor, onClick, iconUrl = "" }) => {
  const currentColorStyle = colorStyle[primaryColor] || colorStyle.green
  text = text || "Primary Button";
    return (
      <>
        <button
          type={type}
          onClick={onClick}
          className={`w-full mt-8 py-4 px-6 rounded-2xl shadow-md inline-flex justify-between items-center cursor-pointer ${currentColorStyle.bgColor} ${currentColorStyle.textColor} ${currentColorStyle.hover} transition-all duration-200 ease-in-out`}
        >
          <p className={`text-center mx-auto font-bold text-xl `}>{text}</p>
          {iconUrl && <img src={iconUrl} alt="button icon" className="w-6 h-6 ml-2" />}
        </button>
      </>
    );
};

export default PrimaryButton;
