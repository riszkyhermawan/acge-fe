import { use } from "react";
import { Questions } from "./../../Data/Questions";
import { Link } from "react-router-dom";
import arrow from "./../../assets/icon/arrow-left.svg";
import BackButton from "../../components/button/BackButton";
import ReactMarkdown from "react-markdown";


const QuestionsPage = () => {
  
  const question = Questions["question1"];
  console.log(question);


  return (
    <div className="flex flex-col w-screen h-screen gap-2 bg-slate-950 p-6">
      {/* title  */}
      <div className="w-full flex flex-row gap-4 items-center justify-start">
        <BackButton />
        <h1 className="text-4xl  text-center">{question.title}</h1>
      </div>
      
      <div className="h-2/3 w-full flex flex-row gap-2">
        <div className="w-2/3 h-full bg-blue-950 rounded-2xl"></div>
        <div className="w-1/3 h-full bg-surface-dark rounded-2xl overflow-auto p-4 text-2xl">
          <h1 className="text-3xl font-bold mb-2 text-center">Question</h1>
          <ReactMarkdown>{question.content}</ReactMarkdown>
        </div>
      </div>
      
      <div className="h-1/3 bg-amber-600"></div>
    </div>
  );
};
export default QuestionsPage;

