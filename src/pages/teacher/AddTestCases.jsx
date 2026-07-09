/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import SecondaryBackground from "../../components/SecondaryBackground";
import { getQuestionById, updateTestCases } from "../../service/api";
import { useState, useEffect } from "react";
import PrimaryButton from "../../components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import JSONEditor from "../../components/card/JSONEditor"
import SmallModal from "../../components/modal/SmallModal";

const AddTestCases = () => {
  const { qid } = useParams();
  const [test_cases, setTestCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorModalMessage] = useState("");

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
      } finally {
        setIsLoading(false);
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

          
          return {
            input_data: inputData,
            expected_output: parsedOutputValue,
          };
        } catch (error) {
          parsingError = true;
          return caseItem;
        }
      });

    if (parsingError) {
      setErrorModalMessage("One or more test cases have invalid JSON format. Please correct them before submitting.");
      setShowErrorModal(true);
      return;
    }

    console.log("We're gonna send this", preparedTestCases);
    setIsSaving(true);
    try {
      await updateTestCases(qid, preparedTestCases);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to update test cases:", error);
      setErrorModalMessage("Failed to update test cases. Please try again.");
      setShowErrorModal(true);
    } finally {
      setIsSaving(false);
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
              <div className="w-full flex flex-row gap-2 items-center justify-start mb-4 bg-yellow-200/15 py-2 px-4 rounded-md border-2 border-yellow-400">
                <p className="text-yellow-500 font-semibold">
                  Notes: Test Cases 1 & 2 will be shown to Students as Example Test Cases. The rest of the test cases will still be used for evaluation but not shown.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                {isLoading ? (
                  <p className="text-white text-center py-8">Loading test cases...</p>
                ) : (
                  <>
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

                        <label className="text-white font-semibold mt-4">
                          Input:
                        </label>
                        <JSONEditor
                          value={
                            typeof test_case.input_data === "object"
                              ? JSON.stringify(test_case.input_data, null, 2)
                              : test_case.input_data || ""
                          }
                          onChange={(value) =>
                            handleInputChange(index, "input_data", value)
                          }
                          placeholder='{ "variable": "value" }'
                        />

                        <label className="text-white font-semibold mt-4">
                          Output:
                        </label>
                        <JSONEditor
                          value={
                            typeof test_case.expected_output === "object"
                              ? JSON.stringify(test_case.expected_output, null, 2)
                              : test_case.expected_output || ""
                          }
                          onChange={(value) =>
                            handleInputChange(index, "expected_output", value)
                          }
                          placeholder='{ "variable": "value" }'
                        />
                      </div>
                    ))}
                    <div className="flex flex-row gap-4 justify-between w-full">
                      <PrimaryButton
                        text="Add another Test Case"
                        onClick={handleTestCases}
                        primaryColor="noColor"
                        type="button"
                      />
                      <PrimaryButton text="Save Test Cases" type="submit" loading={isSaving} />
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        <SmallModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="Error"
        >
          <p className="mb-4 text-gray-300">{errorMessage}</p>
          <PrimaryButton
            text="Close"
            onClick={() => setShowErrorModal(false)}
            className="w-fit"
          />
        </SmallModal>

        <SmallModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            navigate(`/teacher/dashboard`);
          }}
          title="Success!"
        >
          <p className="mb-4 text-gray-300">Test cases saved successfully!</p>
          <PrimaryButton
            text="Go to Dashboard"
            onClick={() => {
              setShowSuccessModal(false);
              navigate(`/teacher/dashboard`);
            }}
          />
        </SmallModal>
      </SecondaryBackground>
    </>
  );
};

export default AddTestCases;
