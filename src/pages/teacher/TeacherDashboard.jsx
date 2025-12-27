import { use, useEffect } from "react";
import SecondaryBackground from "../../components/SecondaryBackground";
import LogoutButton from "../../components/button/LogoutButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import QuestionsEditable from "../../components/card/QuestionsEditable";
// import { Questions } from "../../Data/Questions";
import { fetchQuestions } from "../../service/api";
import { useState } from "react";


const TeacherDashboard = () => {
  
  const [questions, setQuestions] = useState([]);

  const handleDelete = (deleteId) => {
    setQuestions(questions.filter((question) => question.id !== deleteId));
  };


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
      <SecondaryBackground>
        <div className="flex flex-col items-center justify-center w-[1200px] self-start mt-4 ">
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
              <QuestionsEditable
                key={question.id}
                title={question.title}
                description={question.description}
                qid={question.id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </SecondaryBackground>
    </>
  );
};

export default TeacherDashboard;
