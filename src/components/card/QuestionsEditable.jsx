import { Link } from "react-router-dom";
import SecondaryButton from "../button/SecondaryButton";
import openIcon from "../../assets/icon/open-green.svg"
import editIcon from "../../assets/icon/edit-yellow.svg"
import deleteIcon from "../../assets/icon/delete-red.svg"
import { deleteQuestion } from "../../service/api";

const QuestionsEditable = ({ title, description, qid, onDelete }) => {

  const handleDeleteQuestions = async () => {
    try {
      const response = await deleteQuestion(qid);
      onDelete(qid);
      console.log("Question deleted successfully:", response);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between bg-black-400/25 bg-clip-padding backdrop-filter backdrop-blur-lg border-2 border-gray-100 rounded-2xl shadow-md px-6 py-4">
      <div className="w-full text-white flex flex-col">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-md">{description}</p>
      </div>
      <div className="w-fit h-full justify-center items-end flex flex-col ">
        <span className="bg-yellow-100 text-yellow-800 w-fit text-base font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          ID : {qid}
        </span>
        <div className="flex flex-row gap-2 mt-2">
          <button className="p-1 bg-[#1E2C20] items-center justify-center hover:bg-[#425D46] rounded-lg">
            <img src={openIcon} alt="edit" className="w-[28px] " />
          </button>
          <button className="p-1 bg-[#4B420D] items-center justify-center hover:bg-[#918016] rounded-lg">
            <img src={editIcon} alt="edit" className="w-[28px] " />
          </button>
          <button className="p-1 bg-[#4B0D0D] items-center justify-center hover:bg-[#910000] rounded-lg" onClick={handleDeleteQuestions}>
            <img src={deleteIcon} alt="delete" className="w-[28px] " />
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionsEditable;
