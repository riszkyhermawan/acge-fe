import PrimaryBackground from "../../components/PrimaryBackground";
import LogoutButton from "./../../components/button/LogoutButton";
import QuestionsCard from "../../components/card/QuestionsCard";
import { Questions } from "./../../Data/Questions";

const StudentDashboard = () => {
    const QuestionsArray = Object.values(Questions);
  return (
    <>
      <PrimaryBackground>
        <div className="flex flex-col items-center justify-center w-[1200px] self-start mt-48 ">
            <LogoutButton />
            <div className="w-full mt-12">
                {QuestionsArray.map((question) => (
                    <QuestionsCard key={question.id} title={question.title} description={question.description} qid={question.id} />
                ))}
            </div>
        </div>
      </PrimaryBackground>
    </>
  );
};

export default StudentDashboard;
