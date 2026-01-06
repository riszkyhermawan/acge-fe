import BackButton from "../../components/button/BackButton";
import ReactMarkdown from "react-markdown";
import terminalLogo from "./../../assets/icon/terminal.svg";
import TextEditor from "../../components/card/TextEditor";
import { act, use, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById, fetchSubmissions, submitAnswer } from "../../service/api";
import PrimaryButton from "../../components/button/PrimaryButton";
import { compileCode } from "./../../service/api";
import TestCases from "../../components/card/TestCases";

const QuestionsPage = () => {
  const { qid } = useParams();
  const [question, setQuestion] = useState({});
  const [codeInput, setCodeInput] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  const [testResult, setTestResult] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getQuesiontDetails = async (qid) => {
      try {
        const data = await getQuestionById(qid);
        console.log("Fetched question details:", data);
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching question details:", error);
        return;
      }

      try {
        const previousSubmissions = await fetchSubmissions(qid);
        if (previousSubmissions && previousSubmissions.code) {
          console.log("Loaded previous submission code:", previousSubmissions.code);
          setCodeInput(previousSubmissions.code);
        }
      } catch (error) {
        console.error("No previous submission found (or error fetching), using default code.", error);
      }
    };
    getQuesiontDetails(qid);
  }, [qid]);

  const checkResult = (output, expectedOutput) => {
    if (!output) return false;

    const cleanOutput = output.toString().trim();
    const expectedValue = Object.values(expectedOutput)[0].toString().trim();

    return cleanOutput === expectedValue;
  }

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    setTestResult([]);
    setOutput("Submitting...");

    const results = [];
    try {
      for (const [index, testCase] of question.test_cases.entries()) {
        const result = await compileCode(codeInput, testCase.input_data);

        let status = "Failed";
        let actualOutput = "";

        if(result.output) {
          actualOutput = result.output;
          const isCorrect = checkResult(result.output, testCase.expected_output);
          status = isCorrect ? "Passed" : "Failed";
        } else{
          status = "Error";
          actualOutput = result.error || "Unknown error";
        }

        results.push({
          id: index,
          status: status,
          input: testCase.input_data,
          expected: testCase.expected_output,
          actual: actualOutput
        });
      }
    } catch (error) {
      console.error("Test Failed", error)
      results.push({
        id: 0,
        status: "Error",
        actual: error.message
      });
    }
    setTestResult(results);
    setIsSubmitting(false);
    setOutput("Submission Complete. Check results below.")
  };
    

  const handleRun = async (e) => {
    e.preventDefault();
    setOutput("Compiling...");

    try {
      await submitAnswer(qid, codeInput, "on progress");
      console.log("Code submitted successfully.");
    } catch (error) {
      console.error("Error submitting code:", error);
    }

    const result = await compileCode(codeInput, question.test_cases[0].input_data);
    if (result.output) {
      setOutput(result.output);
    } else if (result.error) {
      setOutput(result.error);
    } else {
      setOutput(JSON.stringify(result, null, 2));
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen p-16 bg-slate-950 scroll-smooth">
      <div className="max-w-[1440px] w-full h-full flex flex-col mx-auto gap-2">
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
              <ReactMarkdown>{question.description}</ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="h-1/3 flex flex-row gap-2">
          <div className="flex flex-col gap-2 w-2/3">
            <div className="w-full bg-slate-950 h-fit py-1 px-4 rounded-2xl">
              <p className=" rounded-xl text-amber-400 text-xl">
                Note: "Please use input() to read data and print() to output the
                answer."
              </p>
            </div>
            <div className="w-full bg-surface-dark h-full p-4 rounded-2xl scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent overflow-auto">
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
          </div>

          <div className="w-1/3 bg-surface-dark p-2 rounded-2xl h-full">
            <TestCases test_cases={question.test_cases} results={testResult} />
            <div className="w-full flex flex-row gap-1">
              <PrimaryButton
                text="Run Code"
                primaryColor="noColor"
                onClick={handleRun}
              />
              <PrimaryButton text="Submit Answer" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionsPage;
