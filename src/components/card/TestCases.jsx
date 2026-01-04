import { useEffect, useState } from "react";
import { getQuestionById } from "../../service/api";

const TestCases = ({test_cases}) => {
  if (!test_cases || test_cases.length === 0) {
    return <p className="text-gray-500">No test cases available.</p>;
  }
  console.log("Test Cases Data Type:", typeof test_cases);
  console.log("Test Cases Content:", test_cases);

  const dummyData = [
    {
      input_data: {
        a: 5,
        b: 3,
      },
      expected_output: {
        result: 8,
      },
    },
    {
      input_data: {
        a: 10,
        b: -2,
      },
      expected_output: {
        result: 8,
      },
    },
  ];

  return (
    <div className="w-full h-fit max-h-[200px] bg-transparent rounded-2xl p-2 overflow-auto">
      <h1 className="text-lg font-bold text-start">Example Test Cases</h1>
      <div className="w-full bg-white/10 rounded-lg p-2 my-2">
        {test_cases.slice(0, 2).map((testCase, index) => (
          <div key={index} className="w-full bg-white/10 rounded-lg p-2 my-2">
            {/* Input */}
            <h2 className="font-semibold">Input:</h2>
            {testCase.input_data &&
              Object.entries(testCase.input_data).map(([key, value]) => (
                <p key={key} className="ml-4">
                  {key}: {value.toString()}
                </p>
              ))}

            {/* Expected Output */}
            <h2 className="font-semibold mt-2">Expected Output:</h2>
            {testCase.expected_output &&
              Object.entries(testCase.expected_output).map(([key, value]) => (
                <p key={key} className="ml-4">
                  {key}: {value.toString()}
                </p>
              ))}
          </div>
        ))}
      </div>
      <p className="text-red-700 font-semibold">
        *These are not all test cases, the code will be tested against more test
        cases when submitted.
      </p>
    </div>
  );
};

export default TestCases;
