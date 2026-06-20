import React from "react";

const TestCases = ({ test_cases, results }) => {
  // Safety check
  if (!test_cases || test_cases.length === 0) {
    return <p className="text-gray-500">No test cases available.</p>;
  }

  return (
    <div className="w-full flex-1 bg-transparent rounded-2xl p-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-600">
      {/* EXAMPLE TEST CASES */}
      <h1 className="text-lg font-bold text-start mb-2">Example Test Cases</h1>
      <div className="flex flex-col gap-2 mb-6">
        {test_cases.slice(0, 2).map((testCase, index) => {
          const result = results?.find((r) => r.id === index);

          const statusClass =
            result?.status === "Passed"
              ? "border-green-500 bg-green-500/10"
              : result?.status === "Failed"
              ? "border-red-500 bg-red-500/10"
              : "border-transparent bg-white/10";

          return (
            <div
              key={index}
              className={`w-full max-h-[400px] rounded-lg p-3 border-2 transition-all ${statusClass}`}
            >
              {/* Input */}
              <h2 className="font-semibold text-sm text-gray-300">Input:</h2>
              {testCase.input_data &&
                Object.entries(testCase.input_data).map(([key, value]) => (
                  <p key={key} className="ml-4 font-mono text-sm">
                    {key}: {value.toString()}
                  </p>
                ))}

              {/* Expected Output */}
              <h2 className="font-semibold text-sm text-gray-300 mt-2">
                Expected Output:
              </h2>
              {testCase.expected_output &&
                Object.entries(testCase.expected_output).map(([key, value]) => (
                  <p key={key} className="ml-4 font-mono text-sm">
                    {key}: {value.toString()}
                  </p>
                ))}

              {/* Detailed Status */}
              {result && (
                <div className="mt-2 pt-2 border-t border-white/10">
                  <p className="font-bold text-sm">
                    Status:{" "}
                    <span
                      className={
                        result.status === "Passed"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {result.status}
                    </span>
                  </p>
                  {result.status === "Failed" && (
                    <p className="text-xs text-red-300 mt-1">
                      Got: {result.actual}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* HIDDEN TEST CASES  */}
      {test_cases.length > 2 && (
        <>
          <h1 className="text-lg font-bold text-start mb-2 pt-4 border-t border-gray-700">
            Hidden Test Cases
          </h1>
          <div className="grid grid-cols-1 gap-2">
            {test_cases.slice(2).map((_, i) => {
              const realIndex = i + 2;
              const result = results?.find((r) => r.id === realIndex);

              const statusColor =
                result?.status === "Passed"
                  ? "text-green-400 bg-green-900/20 border-green-500/50"
                  : result?.status === "Failed"
                  ? "text-red-400 bg-red-900/20 border-red-500/50"
                  : "text-gray-400 bg-white/5 border-transparent";

              return (
                <div
                  key={realIndex}
                  className={`flex flex-row justify-between items-center p-3 rounded-lg border ${statusColor}`}
                >
                  <span className="font-mono text-sm">
                    Test Case #{realIndex + 1}
                  </span>
                  <span className="font-bold text-sm">
                    {result ? result.status : "Pending..."}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TestCases;
