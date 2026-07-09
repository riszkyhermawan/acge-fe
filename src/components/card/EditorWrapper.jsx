import { useRef } from "react";

const EditorWrapper = ({ title, children, className = "" }) => {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = e.target.value.substring(0, start) + "  " + e.target.value.substring(end);
      const newCursorPosition = start + 2;
      e.target.value = newValue;
      e.target.selectionStart = newCursorPosition;
      e.target.selectionEnd = newCursorPosition;
      e.target.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  return (
    <div className={`w-full h-full rounded-2xl overflow-auto bg-surface-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent ${className}`}>
      <h1 className="text-sm text-zinc-400 font-mono mb-2 px-4 pt-4">{title}</h1>
      <div className="relative w-full h-full px-4 pb-4">
        {children}
      </div>
    </div>
  );
};

export default EditorWrapper;
