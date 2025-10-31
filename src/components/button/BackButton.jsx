import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import arrow from "./../../assets/icon/arrow-left.svg";

const BackButton = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Link onClick={handleBack} className="flex flex-row items-center justify-center py-2 px-4 gap-2 w-fit h-fit rounded-lg bg-midnight">
          <img src={arrow} alt="arrow" className="w-4 h-4" />
          <span className="text-base font-bold text-center">Back</span>
        </Link>
    );
};

export default BackButton;
