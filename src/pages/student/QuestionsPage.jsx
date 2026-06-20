import BackButton from "../../components/button/BackButton";
import ReactMarkdown from "react-markdown";
import terminalLogo from "./../../assets/icon/terminal.svg";
import TextEditor from "../../components/card/TextEditor";
import { act, use, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getQuestionById,
  fetchSubmissions,
  submitAnswer,
} from "../../service/api";
import PrimaryButton from "../../components/button/PrimaryButton";
import { compileCode } from "./../../service/api";
import TestCases from "../../components/card/TestCases";
import SecondaryButton from "../../components/button/SecondaryButton";

const QuestionsPage = () => {
  const { qid } = useParams();
  const [question, setQuestion] = useState({});
  const [codeInput, setCodeInput] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  const [testResult, setTestResult] = useState([]);
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
          console.log(
            "Loaded previous submission code:",
            previousSubmissions.code,
          );
          setCodeInput(previousSubmissions.code);
        }
      } catch (error) {
        console.error(
          "No previous submission found (or error fetching), using default code.",
          error,
        );
      }
    };
    getQuesiontDetails(qid);
  }, [qid]);

  const checkResult = (output, expectedOutput) => {
    if (!output) return false;

    const cleanOutput = output.toString().trim();
    const expectedValue = Object.values(expectedOutput)[0].toString().trim();

    return cleanOutput === expectedValue;
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    setTestResult([]);
    setOutput("Submitting...");

    let passed = true;

    const results = [];
    try {
      for (const [index, testCase] of question.test_cases.entries()) {
        const result = await compileCode(codeInput, testCase.input_data);

        let status = "Failed";
        let actualOutput = "";

        if (result.output) {
          actualOutput = result.output;
          const isCorrect = checkResult(
            result.output,
            testCase.expected_output,
          );
          status = isCorrect ? "Passed" : "Failed";
        } else {
          status = "Error";
          actualOutput = result.error || "Unknown error";
        }

        if (status === "Failed") {
          passed = false;
        }

        results.push({
          id: index,
          status: status,
          input: testCase.input_data,
          expected: testCase.expected_output,
          actual: actualOutput,
        });

        setTestResult(results);
      }
      const finalStatus = passed ? "Passed" : "Failed";
      await submitAnswer(qid, codeInput, finalStatus);

      console.log("Saved submission with:", finalStatus);
    } catch (error) {
      console.error("Test Failed", error);
      results.push({
        id: 0,
        status: "Error",
        actual: error.message,
      });
    }
    setTestResult(results);
    setIsSubmitting(false);
    setOutput("Submission Complete. Check results below.\n", results);
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

    const result = await compileCode(
      codeInput,
      question.test_cases[0].input_data,
    );
    if (result.output) {
      setOutput(result.output);
    } else if (result.error) {
      setOutput(result.error);
    } else {
      setOutput(JSON.stringify(result, null, 2));
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen p-16 bg-slate-950 scroll-smooth overflow-hidden">
      <div className="max-w-[1440px] w-full h-full flex flex-col mx-auto gap-2">
        {/* title  */}
        <div className="w-full flex flex-row gap-4 items-center justify-start">
          <BackButton />
          <h1 className="text-4xl font-bold  text-center">{question.title}</h1>
        </div>

        <div className="flex-1 w-full flex flex-row gap-2">
          {/* Left side: Text Editor + Terminal  */}
          <div className="flex flex-col gap-2 flex-1">
            {/* Text Editor */}
            <TextEditor
              className="w-full"
              code={codeInput}
              onCodeChange={setCodeInput}
            />

            {/* Terminal (1/4) */}
            <div className="h-[25%] bg-surface-dark p-4 rounded-2xl">
              <h1>
                <img
                  src={terminalLogo}
                  alt="output"
                  className="w-6 h-6 inline-block mr-2 mb-1"
                />
                Output
              </h1>
              <p className="text-[16px] text-white">{output}</p>
            </div>
          </div>

          {/* Right side: Question + TestCases*/}
          <div className="w-1/3 flex flex-col gap-2">
            {/* Question */}
            <div className="bg-surface-dark rounded-2xl p-4 h-1/2 flex flex-col">
              <h1 className="text-xl font-bold mb-2 text-center shrink-0">
                Question
              </h1>

              <div className="flex-1 overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent">
                <div className="flex flex-col gap-2  justify-between">
                  <ReactMarkdown>{question.description}</ReactMarkdown>
                </div>
              </div>
              {console.log("Attachment URL:", question.attachment_url)}
              {question.attachment_url && (
                <div className="pt-4 mt-auto shrink-0 w-full flex bg-surface-dark">
                  <a
                    href={question.attachment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit mt-2 py-2 px-6 rounded-full shadow-md inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <p className="text-center mx-auto font-bold text-md">
                      Show Attachment
                    </p>
                  </a>
                </div>
              )}
            </div>

            {/*Test Cases */}
            <div className="bg-surface-dark p-2 rounded-2xl flex-1 flex flex-col">
              <div className="flex-1 overflow-auto scroll-smooth scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent">
                <TestCases
                  test_cases={question.test_cases}
                  results={testResult}
                />
              </div>

              <div className="pt-4 pb-2 mt-auto shrink-0 w-full flex flex-row gap-4 bg-surface-dark">
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
    </div>
  );
};
export default QuestionsPage;
