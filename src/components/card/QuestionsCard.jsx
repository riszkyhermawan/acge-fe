import { Link } from "react-router-dom";
import SecondaryButton from "../button/SecondaryButton";

const QuestionsCard = ({ title, description, qid }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-black-400/25 bg-clip-padding backdrop-filter backdrop-blur-lg border-2 border-gray-100 rounded-2xl shadow-md px-4 sm:px-6 py-4 gap-4">
      <div className="w-full text-white flex flex-col px-2">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{title}</h1>
        <p className="text-sm sm:text-md line-clamp-2 sm:line-clamp-1">{description}</p>
      </div>
      <div className="w-full sm:w-fit h-full justify-start sm:justify-center items-start sm:items-center flex flex-row sm:flex-col gap-3">
        <span className="bg-yellow-100 text-yellow-800 w-fit text-sm sm:text-base font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          ID : {qid}
        </span>
        <SecondaryButton
          text="Solve"
          link={`/student/dashboard/questions/${qid}`}
          primaryColor="green"
        />
      </div>
    </div>
  );
};
export default QuestionsCard;
