import PrimaryBackground from "../../components/PrimaryBackground";
import LogoutButton from "./../../components/button/LogoutButton";
import QuestionsCard from "../../components/card/QuestionsCard";
import { Questions } from "./../../Data/Questions";
import { useState, useEffect } from "react";
import { fetchQuestions } from "../../service/api";

const StudentDashboard = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
      const getQuestions = async () => {
        try {
          const data = await fetchQuestions();  
          console.log("Fetched questions:", data);
          setQuestions(data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };
      getQuestions();
    }, []);


  return (
    <>
      <PrimaryBackground>
        <div className="flex flex-col items-center justify-center w-[1200px] self-start mt-48 ">
            <LogoutButton />
            <div className="w-full mt-12 flex flex-col gap-4">
                {questions.map((question) => (
                    <QuestionsCard key={question.id} title={question.title} description={question.description} qid={question.id} />
                ))}
            </div>
        </div>
      </PrimaryBackground>
    </>
  );
};

export default StudentDashboard;
