import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSubmissionById } from "../../service/api";
import { compileCode } from "../../service/api";
import TextEditor from "../../components/card/TextEditor";
import TestCases from "../../components/card/TestCases";
import BackButton from "../../components/button/BackButton";

const SubmissionDetail = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [code, setCode] = useState("");
  const [testResult, setTestResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubmissionById(submissionId);
        setSubmission(data);
        setCode(data.code);

        const results = [];
        for (const [index, testCase] of data.test_cases.entries()) {
          const result = await compileCode(data.code, testCase.input_data);

          let status = "Failed";
          let actualOutput = "";

          if (result.output) {
            const expectedValue = Object.values(testCase.expected_output)[0];
            status =
              result.output.trim() === String(expectedValue).trim()
                ? "Passed"
                : "Failed";
            actualOutput = result.output;
          } else {
            status = "Error";
            actualOutput = result.error || "Unknown error";
          }

          results.push({
            id: index,
            status: status,
            input: testCase.input_data,
            expected: testCase.expected_output,
            actual: actualOutput,
          });
        }

        setTestResult(results);
      } catch (error) {
        console.error("Failed to fetch submission:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId]);

  return (
    <div className="flex flex-col w-screen h-screen p-16 bg-slate-950 scroll-smooth overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-xl">Loading submission...</p>
        </div>
      ) : (
        <div className="max-w-[1440px] w-full h-full flex flex-col mx-auto gap-2">
          {/* Title */}
          <div className="w-full flex flex-row gap-4 items-center justify-start">
            <BackButton />
            <h1 className="text-4xl font-bold text-white text-center">
              {submission?.question_title}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                submission?.status === "Passed"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {submission?.status}
            </span>
          </div>

          {/* Student Info */}
          <div className="text-gray-400">
            Submitted by: {submission?.full_name || submission?.username} |
            {new Date(submission?.created_at).toLocaleString()}
          </div>

          <div className="flex-1 w-full flex flex-row gap-2">
            {/* Text Editor */}
            <div className="flex-1">
              <TextEditor code={code} onCodeChange={() => {}} />
            </div>

            {/* Test Cases */}
            <div className="w-1/3 bg-surface-dark rounded-2xl p-4">
              <h2 className="text-xl font-bold text-white mb-4">Test Cases</h2>
              <TestCases
                test_cases={submission.test_cases}
                results={testResult}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionDetail;
