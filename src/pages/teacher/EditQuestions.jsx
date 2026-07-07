import React, { useEffect } from "react";
import SecondaryBackground from "../../components/SecondaryBackground";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { commands } from "@uiw/react-md-editor";
import { supabase } from "../../service/supabaseClient";
import { updateQuestion } from "../../service/api";
import PrimaryButton from "../../components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { getQuestionById } from "../../service/api";
import { useParams } from "react-router-dom";
import SmallModal from "../../components/modal/SmallModal";

const EditQuestion = () => {
  const { qid } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(
    "Write your question here using markdown format...",
  );
  const [attachment, setAttachment] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuesiontDetails = async (qid) => {
      try {
        const data = await getQuestionById(qid);
        console.log("Fetched question details:", data);
        setTitle(data.title);
        setDescription(data.description);

        if (data.attachment_url) {
          const fileName = data.attachment_url.split("/").pop();
          setUploadFileName(decodeURIComponent(fileName));
        }
      } catch (error) {
        console.error("Error fetching question details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getQuesiontDetails(qid);
  }, [qid]);

  const handleAttachmentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setShowErrorModal(true); // or setErrorModal
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setShowErrorModal(true);
      return;
    }
    setAttachment(file);
    setUploadFileName(file.name);
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setUploadFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    try {
      setIsUploading(true);
      let publicUrl = null;
      const existingQuestion = await getQuestionById(qid);
      let finalAttachmentUrl = existingQuestion.attachment_url || null;

      if (attachment) {
        const fileName = `${Date.now()}_${attachment.name}`;
        const { error: uploadError } = await supabase.storage
          .from("agce_bucket")
          .upload(fileName, attachment);

        if (uploadError) {
          throw uploadError;
        }

        const urlData = supabase.storage
          .from("agce_bucket")
          .getPublicUrl(fileName);

        publicUrl = urlData.data.publicUrl;
      }

      const payload = {
        title: title,
        description: description,
        attachment_url: publicUrl || finalAttachmentUrl,
      };
      //debugging
      // console.log("Ready to send to backend:", payload);
      setShowSuccessModal(true);
      await updateQuestion(qid, payload);
      //debugging
      // console.log("Response from backend:", response);
    } catch (error) {
      console.error("Error:", error.message);
      setShowErrorModal(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <SecondaryBackground>
        <div className="flex flex-col items-center justify-center w-[1200px] self-start mt-36 ">
          <h1 className="text-4xl font-bold ">Edit Question ID: {qid}</h1>
          <div className="w-full min-h-[600px] bg-[#1E1E1E] mt-4 rounded-lg flex flex-col items-start justify-start p-6">
            {isLoading ? (
              <p className="text-white text-center py-8 w-full">Loading question...</p>
            ) : (
              <div className="w-full" data-color-mode="dark">
              <form className="w-full mb-4">
                {/* Title */}
                <h1 className="text-start text-xl font-bold">Title</h1>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter question title"
                  className="w-full p-3 rounded-lg mb-4 bg-[#363636] text-white  focus:outline-none mt-2"
                />

                {/* Description */}
                <h1 className="text-start text-xl font-bold">Description</h1>
                <MDEditor
                  value={description}
                  onChange={setDescription}
                  height={250}
                  style={{
                    width: "100%",
                    marginTop: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#363636",
                    color: "white",
                  }}
                  preview="edit"
                  commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.title,
                    commands.divider,
                    commands.link,
                    commands.quote,
                    commands.code,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                    commands.codeBlock,
                    commands.table,
                  ]}
                />

                {/* Attachment */}
                <div className="col-span-full mt-4">
                  <h1 className="text-start text-xl font-bold">Attachment</h1>

                  {/* Normal State - No file uploaded */}
                  {!uploadFileName ? (
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                      <div className="text-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          data-slot="icon"
                          aria-hidden="true"
                          className="mx-auto size-12 text-gray-600"
                        >
                          <path
                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                        <div className="mt-4 flex text-sm/6 text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              type="file"
                              name="file-upload"
                              className="sr-only"
                              onChange={handleAttachmentUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs/5 text-gray-400">
                          PNG, JPG, GIF up to 2MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* There's a file uploaded */
                    <div className="mt-2 flex items-center justify-between bg-[#363636] rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-green-400">✓</span>
                        <span className="text-white">{uploadFileName}</span>
                      </div>
                      <button
                        onClick={handleRemoveAttachment}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-row w-full gap-4">
                  <PrimaryButton
                    text="Next"
                    type="submit"
                    className="w-full"
                    onClick={handleSubmit}
                    loading={isUploading}
                  />
                </div>
              </form>
            </div>
            )}
          </div>
        </div>
        <SmallModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="Upload Error"
        >
          <p className="mb-4 text-white text-sm">
            Invalid file type or file too large. Please upload a PNG, JPG, WEBP,
            or PDF file under 2MB.
          </p>
          <PrimaryButton
            text="Close"
            onClick={() => setShowErrorModal(false)}
            className="w-fit"
          />
        </SmallModal>
        <SmallModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Question Updated Successfully!"
        >
          <div className="flex flex-col gap-3">
            <p className="mb-2 text-gray-300">
              What would you like to do next?
            </p>
            <div className="w-full flex flex-col gap-0">
              <PrimaryButton
                primaryColor="noColor"
                text="Edit Test Cases"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate(`/teacher/questions/${qid}/add-test-cases`);
                }}
              />
              <PrimaryButton
                text="Save & Go to Dashboard"
                primaryColor="primary"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/teacher/dashboard");
                }}
              />
            </div>
          </div>
        </SmallModal>
      </SecondaryBackground>
    </>
  );
};

export default EditQuestion;
