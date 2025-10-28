import { Link } from "react-router-dom";
import arrow from "./../../assets/icon/arrow-narrow-up-right.svg";

const SpecialButton = ({ text, link }) => {
    return (
      <div className="mt-8 w-fit group bg-gradient-to-l from-yellow-400 to-teal-800 p-0.5 rounded-full shadow-md inline-flex justify-between items-center cursor-pointer ">
        <Link
          to={link}
          className=" w-full pl-8 pr-2.5 py-1.5 bg-stone-900 group-hover:bg-transparent rounded-full shadow-md inline-flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out "
        >
          <div className="justify-center text-2xl font-bold leading-tight ">
            {
              text ? text : "Special Button"
            }
          </div>
          <div className="p-1.5 ml-8 bg-gradient-to-l from-yellow-400 to-teal-800 rounded-full flex justify-start items-center gap-2.5">
            <div className="w-10 h-10 relative overflow-hidden group-hover:rotate-45 transition-all duration-500 ease-in-out">
              <img
                src={arrow}
                alt="Arrow Icon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Link>
      </div>
    );
};

export default SpecialButton;