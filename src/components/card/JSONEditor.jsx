import React from "react";

const JSONEditor = ({ value, onChange, placeholder = "{}" }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        e.target.selectionStart = start + 2;
        e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="w-full">
      

      {/* Editor body */}
      <div
        className="rounded-b-lg bg-[#1e1e1e] border border-[#363636] focus-within:border-slate-500 transition-colors"
        onClick={(e) => e.currentTarget.querySelector("textarea").focus()}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          spellCheck={false}
          className="w-full h-32 p-4 rounded-b-lg bg-transparent text-yellow-300 font-mono text-sm focus:outline-none resize-none cursor-text"
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  );
};

export default JSONEditor;
