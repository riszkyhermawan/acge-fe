import { useRef } from "react";

const PlainEditor = ({ value, onChange, placeholder = "" }) => {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const indentation = "  ";
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + indentation + value.substring(end);
      const newCursorPosition = start + indentation.length;
      onChange(newValue);

      setTimeout(() => {
        e.target.focus();
        e.target.selectionStart = newCursorPosition;
        e.target.selectionEnd = newCursorPosition;
      }, 0);
    }
  };

  return (
    <div
      className="w-full h-full rounded-2xl overflow-auto p-4 bg-[#363636] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent"
      role="button"
    >
      <div className="relative w-full h-full bg-transparent" role="button">
        <textarea
          spellCheck={false}
          ref={textareaRef}
          className="caret-zinc-50 focus:outline-none bg-transparent font-mono text-zinc-300 absolute inset-0 whitespace-pre-wrap break-words p-0 resize-none text-[15px] leading-relaxed z-10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  );
};

export default PlainEditor;
