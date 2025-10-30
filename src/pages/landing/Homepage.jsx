import hero from "./../../assets/img/hero-home.webp";
import ButtonStudent from "../../components/button/SpecialButton.jsx";
import RegisterButton from "../../components/button/SecondaryButton.jsx";
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
            <ButtonStudent text="Let's start coding now!" link="/login" />
            <RegisterButton text="Make an Account" link="/register" />
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
