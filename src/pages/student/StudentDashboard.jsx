import PrimaryBackground from "../../components/PrimaryBackground";
import LogoutButton from "./../../components/button/LogoutButton";
import QuestionsCard from "../../components/card/QuestionsCard";
import { useState, useEffect } from "react";
import { fetchQuestions } from "../../service/api";

const StudentDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const getQuestions = async () => {
        try {
          const data = await fetchQuestions();
          console.log("Fetched questions:", data);
          setQuestions(data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        } finally {
          setIsLoading(false);
        }
      };
      getQuestions();
    }, []);


  return (
    <>
      <PrimaryBackground>
        <div className="flex flex-col items-center justify-center w-full max-w-[1200px] self-start m-24 sm:mt-32 lg:mt-48 px-4 sm:px-6 lg:px-8">
            <LogoutButton />
            <div className="w-full mt-8 lg:mt-12 flex flex-col gap-4">
                {isLoading ? (
                  <p className="text-white text-center py-8">Loading questions...</p>
                ) : questions.length === 0 ? (
                  <p className="text-white text-center py-8">No questions available.</p>
                ) : (
                  questions.map((question) => (
                    <QuestionsCard key={question.id} title={question.title} description={question.description} qid={question.id} />
                  ))
                )}
            </div>
        </div>
      </PrimaryBackground>
    </>
  );
};

export default StudentDashboard;
