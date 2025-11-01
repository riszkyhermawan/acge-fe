import { Questions } from "./../../Data/Questions";
import { Link } from "react-router-dom";
import BackButton from "../../components/button/BackButton";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { useRef } from "react";

const QuestionsPage = () => {
  const question = Questions["question1"];

  const [codeInput, setCodeInput] = useState("");
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
      const indentation = "  "
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value

      const newText = value.substring(0, start) + indentation + value.substring(end);
      const newCursorPosition = start + indentation.length
      setCodeInput(newText)

      setTimeout(() => {
        e.target.focus()
        e.target.selectionStart = newCursorPosition
        e.target.selectionEnd = newCursorPosition
      }, 0)
    }
  };
  return (
    <div className="flex flex-col w-screen h-screen gap-2 bg-slate-950 p-6">
      {/* title  */}
      <div className="w-full flex flex-row gap-4 items-center justify-start">
        <BackButton />
        <h1 className="text-4xl  text-center">{question.title}</h1>
      </div>

      <div className="h-2/3 w-full flex flex-row gap-2">
        {/* Text Editor */}
        <div
          className="w-2/3 h-full rounded-2xl overflow-auto p-4 bg-surface-dark  "
          role="button"
        >
          <div className="relative w-full h-full bg-transparent" role="button">
            <textarea
              spellCheck={false}
              ref={textareaRef}
              className="caret-zinc-50 focus:outline-none bg-transparent font-mono text-transparent absolute pt-[9px] px-[24px] pr[24px] resize-none inset-0 whitespace-nowrap text-[16px] z-10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/0 scrollbar-track-transparent"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
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
              {codeInput}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Question */}
        <div className="w-1/3 h-full bg-surface-dark rounded-2xl scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent overflow-auto p-4 text-lg">
          <h1 className="text-3xl font-bold mb-2 text-center">Question</h1>
          <ReactMarkdown>{question.content}</ReactMarkdown>
        </div>
      </div>

      <div className="h-1/3 bg-amber-600"></div>
    </div>
  );
};
export default QuestionsPage;
