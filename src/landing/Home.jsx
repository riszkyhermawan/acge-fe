import bg from "./../assets/img/bg-home.png";
import hero from "./../assets/img/hero-home.png";
import ButtonStudent from "./../component/button/GettingStarted.jsx";

const Home = () => {
  return (
    <div
      className="h-screen w-screen flex flex-row items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-7xl flex items-center justify-between ">
        <div className="w-full h-fit flex flex-col pr-7">
          <h1 className="text-white font-bold text-6xl">
            The Smart Way to Manage and Grade Coding Assignments
          </h1>
          <ButtonStudent />
          
        </div>

        <div className="w-full h-fit">
          <img src={hero} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
