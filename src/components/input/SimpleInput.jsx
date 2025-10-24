const SimpleInput = ({label, type, value, onChange, placeholder}) => {
    return (
      <div className="w-full h-full border-b-2 border-slate-400 p-4 flex flex-col text-[#828282] text-base">
        <label className="mb-2 text-white text-xl">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
};


export default SimpleInput;