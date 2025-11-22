import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { useRef } from "react";
import pythonLogo from "./../../assets/icon/python.svg";

const TextEditor = ({ code, onCodeChange }) => {
  const highlighterRef = useRef(null);
  const textareaRef = useRef(null);

  const handleScroll = () => {
    if (textareaRef.current && highlighterRef.current) {
      highlighterRef.current.scrollLeft = textareaRef.current.scrollLeft;
      highlighterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const indentation = "  ";
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;

      const newText =
        value.substring(0, start) + indentation + value.substring(end);
      const newCursorPosition = start + indentation.length;
      onCodeChange(newText);

      setTimeout(() => {
        e.target.focus();
        e.target.selectionStart = newCursorPosition;
        e.target.selectionEnd = newCursorPosition;
      }, 0);
    }
  };

  return (
    <div
      className="w-2/3 h-full rounded-2xl overflow-auto p-4 bg-surface-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent"
      role="button"
    >
      <h1>
        <img
          src={pythonLogo}
          alt="python logo"
          className="w-6 h-6 inline-block mr-2 mb-1"
        />
        main.py
      </h1>
      <div className="relative w-full h-full bg-transparent" role="button">
        <textarea
          spellCheck={false}
          ref={textareaRef}
          className="caret-zinc-50 focus:outline-none bg-transparent font-mono text-transparent absolute pt-[9px] px-[24px] pr[24px] resize-none inset-0 whitespace-nowrap text-[16px] z-10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/0 scrollbar-track-transparent"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
        />

        <SyntaxHighlighter
          ref={highlighterRef}
          language="python"
          style={atomDark}
          customStyle={{
            flex: "1",
            inset: 0,
            fontSize: "16px",
            position: "absolute",
            padding: "0px",
            scrollbarColor: "#4AD05C ",
            scrollbarWidth: "thin",
            scrollbarTrackColor: "transparent",
            scrollbarThumbColor: "#4AD05C ",
          }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default TextEditor;
