import { Questions } from "./../../Data/Questions";
import { Link } from "react-router-dom";
import BackButton from "../../components/button/BackButton";
import ReactMarkdown from "react-markdown";
import terminalLogo from "./../../assets/icon/terminal.svg";
import TextEditor from "../../components/card/TextEditor";
import { useState } from "react";
import PrimaryButton from "../../components/button/PrimaryButton";
import { compileCode } from "./../../service/api";

const QuestionsPage = () => {
  const question = Questions["question1"];
  const [codeInput, setCodeInput] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOutput("Compiling...");

    const result = await compileCode(codeInput, "");
    if (result.output) {
      setOutput(result.output);
    } else if (result.error) {
      setOutput(result.error);
    } else {
      setOutput(JSON.stringify(result, null, 2));
    }
  };



  return (
    <div className="flex flex-col w-screen h-screen gap-2 bg-slate-950 p-6">
      {/* title  */}
      <div className="w-full flex flex-row gap-4 items-center justify-start">
        <BackButton />
        <h1 className="text-4xl  text-center">{question.title}</h1>
      </div>

      <div className="h-2/3 w-full flex flex-row gap-2">
        {/* Text Editor */}
        <TextEditor code={codeInput} onCodeChange={setCodeInput} />

        {/* Question */}
        <div className="w-1/3 h-full bg-surface-dark rounded-2xl scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent overflow-auto p-4 text-lg">
          <h1 className="text-xl font-bold mb-2 text-center">Question</h1>
          <div className="text-[16px]">
            <ReactMarkdown>{question.content}</ReactMarkdown>
          </div>
        </div>
      </div>

       
      <div className="h-1/3 flex flex-row gap-2">
        <div className="w-2/3 bg-surface-dark h-full p-4 rounded-2xl scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent overflow-auto">
          <h1>
            <img
              src={terminalLogo}
              alt="output logo"
              className="w-6 h-6 inline-block mr-2 mb-1"
            />
            Output
          </h1>
            <p className="text-[16px] text-white">{output}</p>
        </div>



        <div className="w-1/3 bg-amber-400 h-full">
          <PrimaryButton text="Submit Answer" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
export default QuestionsPage;
