import bg from "./../assets/img/bg-home.webp";

const PrimaryBackground = ({ children }) => {
  return (
    <div
      className="min-h-screen w-screen flex flex-row items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  );
};

export default PrimaryBackground;
