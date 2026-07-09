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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-black-400/25 bg-clip-padding backdrop-filter backdrop-blur-lg border-2 border-gray-100 rounded-2xl shadow-md px-4 sm:px-6 py-4 gap-4">
      <div className="w-full text-white flex flex-col px-2 pb-2">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{title}</h1>
        <p className="text-sm sm:text-md line-clamp-2 sm:line-clamp-1">{description}</p>
      </div>
      <div className="w-full sm:w-fit h-full justify-start sm:justify-end items-start sm:items-end flex flex-row sm:flex-col gap-2">
        <span className="bg-yellow-100 text-yellow-800 w-fit text-sm sm:text-base font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          ID : {qid}
        </span>
        <div className="flex flex-row gap-2">
          <Link
            to={`/teacher/questions/${qid}/submissions`}
            className="p-1 bg-[#1E2C20] items-center justify-center hover:bg-[#425D46] rounded-lg"
          >
            <img src={openIcon} alt="open" className="w-[28px] " />
          </Link>
          <Link
            to={`/teacher/questions/edit-question/${qid}`}
            className="p-1 bg-[#4B420D] items-center justify-center hover:bg-[#918016] rounded-lg"
          >
            <img src={editIcon} alt="edit" className="w-[28px] " />
          </Link>
          <button
            className="p-1 bg-[#4B0D0D] items-center justify-center hover:bg-[#910000] rounded-lg"
            onClick={handleDeleteQuestions}
          >
            <img src={deleteIcon} alt="delete" className="w-[28px] " />
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionsEditable;
