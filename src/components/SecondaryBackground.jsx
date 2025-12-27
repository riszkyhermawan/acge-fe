import logo from "./../assets/img/logo.png";

const SecondaryBackground = ({ children }) => {
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden flex flex-col items-center justify-center bg-[#121212] pt-4 pb-12">
      <div className="flex- flex-row mx-auto">
        <img src={logo} alt="Logo" className="h-16 mt-4 mx-auto" />
        {children}
      </div>
    </div>
  );
};

export default SecondaryBackground;
