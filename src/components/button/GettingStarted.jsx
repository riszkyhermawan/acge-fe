import { Link } from "react-router-dom";
import arrow from "./../../assets/icon/arrow-narrow-up-right.svg";

const GettingStarted = () => {
    return (
      <div className="mt-8 w-2/3  bg-gradient-to-l from-yellow-400 to-teal-800 p-0.5 rounded-full shadow-md inline-flex justify-between items-center cursor-pointer">
        <Link
          to="/login"
          className=" w-full pl-8 pr-2.5 py-1.5 bg-stone-900 rounded-full shadow-md inline-flex justify-between items-center cursor-pointer "
        >
          <div className="justify-center text-2xl font-bold  leading-tight ">
            Start Coding as Student
          </div>
          <div className="p-1.5 bg-gradient-to-l from-yellow-400 to-teal-800 rounded-full flex justify-start items-center gap-2.5">
            <div className="w-10 h-10 relative overflow-hidden">
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

export default GettingStarted;