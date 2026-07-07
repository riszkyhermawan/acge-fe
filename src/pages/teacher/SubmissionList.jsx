import React, { useEffect, useState } from "react";
import { fetchSubmisionByQuestionId } from "../../service/api";
import { useParams } from "react-router-dom";
import SecondaryBackground from "../../components/SecondaryBackground"
import LogoutButton from "../../components/button/LogoutButton";
import SubmissionCard from "../../components/card/Submission";

const SubmissionList = () => {
  const { qid } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubmissions = async () => {
      try {
        fetchSubmisionByQuestionId(qid).then((data) => {
          console.log("Fetched submissions:", data);
          setSubmissions(data);
        });
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };
    getSubmissions();
  }, []);

  console.log("Submissions data:", submissions);
  return (
    <>
      <SecondaryBackground>
        <div className="flex flex-col items-center justify-center w-[1200px] self-start mt-4 ">
          <LogoutButton />

          <div className="w-full mt-6 flex flex-col gap-4">
            {loading ? (
              <p className="text-white text-center py-8">Loading submissions...</p>
            ) : submissions.length === 0 ? (
              <p className="text-white text-center py-8">No submissions yet.</p>
            ) : (
              submissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  username={submission.username}
                  status={submission.status}
                  full_name={submission.full_name}
                  submissionId={submission.id}
                  />
              ))
            )}
          </div>
        </div>
      </SecondaryBackground>
    </>
  );
};

export default SubmissionList;
