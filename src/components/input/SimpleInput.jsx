const SimpleInput = ({label, type, value, onChange, placeholder, name, error, disabled = false}) => {
    return (
      <div className="w-full h-full border-b-2 border-slate-400 p-4 flex flex-col text-[#828282] text-base">
        <label className="mb-2 text-white text-xl">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          className={`w-full p-4 rounded-lg bg-[#1E1E1E] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
};


export default SimpleInput;