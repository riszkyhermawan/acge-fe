import { use, useEffect } from "react";
import PrimaryBackground from "../../components/PrimaryBackground";
import LogoutButton from "../../components/button/LogoutButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import QuestionsCard from "../../components/card/QuestionsCard";
// import { Questions } from "../../Data/Questions";
import { fetchQuestions } from "../../service/api";
import { useState } from "react";


const TeacherDashboard = () => {
  
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
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
        <div className="flex flex-col items-center justify-center w-[1200px] self-start mt-36 ">
            <LogoutButton />
          <div className="flex flex-row w-[1200px] gap-4 justify-between items-center h-fit mt-12">
            <h1 className="text-4xl font-bold ">Question Lists</h1>
            <SecondaryButton
              text="+ Create New Question"
              primaryColor="green"
              link="/teacher/dashboard/create-question"
            />
          </div>
          <div className="w-full mt-6 flex flex-col gap-4">
            {questions.map((question) => (
              console.log(question),
              <QuestionsCard
                key={question.id}
                title={question.title}
                description={question.description}
                qid={question.id}
              />
            ))}
          </div>
        </div>
      </PrimaryBackground>
    </>
  );
};

export default TeacherDashboard;
