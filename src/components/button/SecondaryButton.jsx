import { Link } from "react-router-dom";

const colorStyle = {
  white: {
    text: "text-white",
    border: "border-white",
    hover: "hover:bg-white hover:text-black", 
  },
  green: {
    text: "text-primary-green",
    border: "border-2-primary-green",
    hover: "hover:bg-primary-green-dark ",
  },
};

const SecondaryButton = ({
  text="Secondary Button", 
  link,
  primaryColor="white"
}) => {
    const currentColorStyle = colorStyle[primaryColor] || colorStyle.white;
    return (
      <>
        <Link to={link}>
          <div
            className={`w-fit mt-8 py-4 px-6 rounded-full shadow-md inline-flex justify-between items-center border-2 cursor-pointer ${currentColorStyle.border} ${currentColorStyle.hover} ${currentColorStyle.text} transition-all duration-300 ease-in-out`}
          >
            <p className={`text-center mx-auto font-bold text-xl `}>{text}</p>
          </div>
        </Link>
      </>
    );
}


export default SecondaryButton;