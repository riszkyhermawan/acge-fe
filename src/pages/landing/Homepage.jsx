import hero from "./../../assets/img/hero-home.webp";
import ButtonStudent from "../../components/button/GettingStarted.jsx";
import ButtonTeacher from "../../components/button/LoginTeacher.jsx";
import PrimaryBackground from "./../../components/PrimaryBackground.jsx"

const Home = () => {
  return (
    <PrimaryBackground>
      <div className="w-7xl flex items-center justify-between ">
        <div className="w-full h-fit flex flex-col pr-7">
          <h1 className="text-white font-bold text-6xl  ">
            Tackling Coding Assignments, At ease.
          </h1>
          <div className="w-full space-between flex flex-row items-center gap-4">
            <ButtonStudent />
            <ButtonTeacher />
          </div>
          
        </div>

        <div className="w-full h-fit">
          <img src={hero} alt="" />
        </div>
      </div>
    </PrimaryBackground>
  );
};

export default Home;
