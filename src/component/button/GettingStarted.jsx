

const GettingStarted = () => {
    return (
      <button className="w-80 pl-8 pr-2.5 py-1.5 bg-stone-900 rounded-[67px] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center cursor-pointer">
        <div className="justify-center text-white text-base font-semibold  leading-tight">
          Start Coding as student
        </div>
        <div className="p-1.5 bg-gradient-to-l from-yellow-400 to-teal-800 rounded-full flex justify-start items-center gap-2.5">
          <div className="w-10 h-10 relative overflow-hidden">
            <div className="w-5 h-5 left-[10.50px] top-[10.50px] absolute outline-[3px] outline-offset-[-1.50px] outline-white" />
          </div>
        </div>
      </button>
    );
};

export default GettingStarted;