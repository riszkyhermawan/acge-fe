import React from "react";
import PrimaryBackground from "../../components/PrimaryBackground";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { commands } from "@uiw/react-md-editor";
import { supabase } from "../../service/supabaseClient";
import { createQuestions } from "../../service/api";
import PrimaryButton from "../../components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";

const CreateQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(
    "Write your question here using markdown format..."
  );
  const [attachment, setAttachment] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();


  const handleAttachmentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit.");
      return;
    }
    setAttachment(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    try {
      setIsUploading(true);
      let publicUrl = null;

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
        attachment_url: publicUrl,
      };

      console.log("Ready to send to backend:", payload);

      alert("Success!");


      const response = await createQuestions(payload);
      console.log("Response from backend:", response);

      const newQuestionId = response.id;
      if(newQuestionId){
        navigate(`/teacher/questions/${newQuestionId}/add-test-cases`);
      }else{
        alert("Created, but no ID returned.");
      }


    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to upload: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <PrimaryBackground>
        <div className="flex flex-col items-center justify-center w-[1200px] self-start mt-36 ">
          <h1 className="text-4xl font-bold ">Create New Question</h1>
          <div className="w-full min-h-[600px] bg-[#1E1E1E] mt-4 rounded-lg flex flex-col items-start justify-start p-6">
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
                <div class="col-span-full mt-4">
                  <h1 className="text-start text-xl font-bold">Attachment</h1>
                  <div class="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                    <div class="text-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        class="mx-auto size-12 text-gray-600"
                      >
                        <path
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        />
                      </svg>
                      <div class="mt-4 flex text-sm/6 text-gray-400">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer rounded-md bg-transparent font-semibold text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            name="file-upload"
                            class="sr-only"
                            onChange={handleAttachmentUpload}
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs/5 text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <PrimaryButton
                  text="Next"
                  type="submit"
                  className="w-fit"
                  onClick={handleSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </PrimaryBackground>
    </>
  );
};

export default CreateQuestion;
