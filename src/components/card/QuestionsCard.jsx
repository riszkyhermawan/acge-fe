import { Link } from "react-router-dom";
import SecondaryButton from "../button/SecondaryButton";

const QuestionsCard = ({ title, description, qid }) => {
  return (
    <div className="flex flex-row items-center justify-between bg-black-400/25 bg-clip-padding backdrop-filter backdrop-blur-lg border-2 border-gray-100 rounded-2xl shadow-md p-8">
      <div className="w-full text-white flex flex-col">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
      <div className="w-fit h-full justify-center items-center flex flex-col">
        <span className="bg-yellow-100 text-yellow-800 text-base font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
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
