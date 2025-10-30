import SecondaryButton from "../button/SecondaryButton";

const QuestionsCard = ({title, description}) => {
  return (
    <div className="flex flex-row items-center justify-between bg-midnight rounded-2xl shadow-md p-8">
      <div className="w-full text-white flex flex-col">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">
          {description}
        </p>
      </div>
      <SecondaryButton text="Solve" link="/student/dashboard/questions/1" primaryColor="green" />
    </div>
  );
};
export default QuestionsCard;
