import { useParams } from "react-router-dom";
import SecondaryBackground from "../../components/SecondaryBackground";
import { getQuestionById, updateTestCases } from "../../service/api";
import { useState, useEffect } from "react";
import SecondaryButton from "../../components/button/SecondaryButton";
import PrimaryButton from "../../components/button/PrimaryButton";

const AddTestCases = () => {
  const { qid } = useParams();
  const [test_cases, setTestCases] = useState([]);

  const handleTestCases = () => {
    setTestCases([...test_cases, {}]);
  };

  useEffect(() => {
    const getTestCases = async () => {
      try {
        const data = await getQuestionById(qid);
        const test_cases = data.test_cases || [];
        console.log("Test cases:", test_cases);
        setTestCases([...test_cases, {}]);
      } catch (error) {
        console.error("Failed to fetch question data:", error);
      }
    };

    getTestCases();
  }, [qid]);

  const handleInputChange = (index, field, value) => {
    const updatedTestCases = test_cases.map((test_case, i) => {
      if (i === index) {
        return { ...test_case, [field]: value };
      }
      return test_case;
    });

    setTestCases(updatedTestCases);
  };

  const handleDeleteTestCase = (indexToDelete) => {
    const updatedTestCases = test_cases.filter((_, i) => i !== indexToDelete);
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsingError = false;

    const preparedTestCases = test_cases
      .filter((caseItem) => caseItem.input_data || caseItem.expected_output)
      .map((caseItem) => {
        try {
          const inputData =
            typeof caseItem.input_data === "string"
              ? JSON.parse(caseItem.input_data)
              : caseItem.input_data;

          const parsedOutputValue =
            typeof caseItem.expected_output === "string"
              ? JSON.parse(caseItem.expected_output)
              : caseItem.expected_output;

          const expectedOutput = { result: parsedOutputValue };
          return {
            input_data: inputData,
            expected_output: expectedOutput,
          };
        } catch (error) {
          parsingError = true;
          return caseItem;
        }
      });

    if (parsingError) {
      alert(
        "Error: One or more test cases contain invalid JSON data. Please ensure your input is a valid JSON object (e.g., wrapped in curly braces {} and using double quotes for keys/strings)."
      );
      return;
    }

    console.log("We're gonna send this", preparedTestCases);
    try {
      await updateTestCases(qid, preparedTestCases);
      alert("Test cases updated successfully!");
    } catch (error) {
      console.error("Failed to update test cases:", error);
      alert("Error updating test cases. Please try again.");
    }
  };

  return (
    <>
      <SecondaryBackground>
        <div className="flex flex-col items-center justify-center w-[1200px] self-start mt-4">
          <h1 className="text-4xl font-bold ">
            Add Test Cases for Question {qid}
          </h1>
          <div className="w-full min-h-[600px] bg-[#1E1E1E] mt-4 rounded-lg flex flex-col items-start justify-start p-6">
            <div className="w-full" data-color-mode="dark">
              <form onSubmit={handleSubmit}>
                {test_cases.map((test_case, index) => (
                  <div className="w-full mb-4" key={index}>
                    <div className="flex flex-row w-full justify-between ">
                      <h2 className="text-2xl font-bold">
                        {" "}
                        Test Case {index + 1}
                      </h2>
                      {index < test_cases.length && (
                        <button
                          type="button"
                          onClick={() => handleDeleteTestCase(index)}
                          className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-200 p-2"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    {/* Input */}
                    <label className="text-white font-semibold mt-4">
                      Input:
                    </label>
                    <input
                      type="text"
                      placeholder="Input"
                      value={
                        typeof test_case.input_data === "object"
                          ? JSON.stringify(test_case.input_data)
                          : test_case.input_data || ""
                      }
                      onChange={(e) =>
                        handleInputChange(index, "input_data", e.target.value)
                      }
                      className="w-full p-3 rounded-lg mb-4 bg-[#363636] text-white  focus:outline-none mt-2"
                    />

                    {/* Output */}
                    <label className="text-white font-semibold mt-4">
                      Output:
                    </label>
                    <input
                      type="text"
                      placeholder="Output"
                      value={
                        typeof test_case.expected_output === "object"
                          ? JSON.stringify(test_case.expected_output.result)
                          : test_case.expected_output || ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "expected_output",
                          e.target.value
                        )
                      }
                      className="w-full p-3 rounded-lg mb-4 bg-[#363636] text-white  focus:outline-none mt-2"
                    />

                    {/* Button */}
                  </div>
                ))}
                <div className="flex flex-row gap-4 justify-between w-full">
                  <button
                    type="button"
                    onClick={handleTestCases}
                    className="w-fit py-2 px-6 rounded-full shadow-md inline-flex items-center border-2 border-primary-green text-primary-green hover:bg-primary-green-dark transition-all duration-300 ease-in-out font-bold text-md cursor-pointer"
                  >
                    + Add Another Test Case
                  </button>
                  <PrimaryButton text="Save Test Cases" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </SecondaryBackground>
    </>
  );
};

export default AddTestCases;
