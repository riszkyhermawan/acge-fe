import { useEffect, useState } from "react";
import SecondaryBackground from "../../components/SecondaryBackground";
import LogoutButton from "../../components/button/LogoutButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import QuestionsEditable from "../../components/card/QuestionsEditable";
import { fetchQuestions } from "../../service/api";


const TeacherDashboard = () => {

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };
    getQuestions();
  }, []);


  
  return (
    <>
      <SecondaryBackground>
        <div className="flex flex-col items-center justify-center w-full max-w-[1200px] self-start mt-4 px-4 sm:px-6 lg:px-8">
            <LogoutButton />
          <div className="flex flex-row w-full gap-4 justify-between items-center h-fit mt-8 lg:mt-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Question Lists</h1>
            <SecondaryButton
              text="+ Create"
              primaryColor="green"
              link="/teacher/dashboard/create-question"
            />
          </div>
          <div className="w-full mt-6 flex flex-col gap-4">
            {isLoading ? (
              <p className="text-white text-center py-8">Loading questions...</p>
            ) : questions.length === 0 ? (
              <p className="text-white text-center py-8">No questions yet.</p>
            ) : (
              questions.map((question) => (
                <QuestionsEditable
                  key={question.id}
                  title={question.title}
                  description={question.description}
                  qid={question.id}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </SecondaryBackground>
    </>
  );
};

export default TeacherDashboard;
