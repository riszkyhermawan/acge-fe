import { Questions } from "./../../Data/Questions";
import { Link } from "react-router-dom";
import BackButton from "../../components/button/BackButton";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";


const QuestionsPage = () => {
  const question = Questions["question1"];
  console.log(question);

  return (
    <div className="flex flex-col w-screen h-screen gap-2 bg-slate-950 p-6">
      {/* title  */}
      <div className="w-full flex flex-row gap-4 items-center justify-start">
        <BackButton />
        <h1 className="text-4xl  text-center">{question.title}</h1>
      </div>

      <div className="h-2/3 w-full flex flex-row gap-2">
        {/* Text Editor */}
        <div className="w-2/3 h-full rounded-2xl overflow-auto p-4 bg-surface-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar hover:scrollbar-thumb-slate-100/10 scrollbar-track-transparent">
          <SyntaxHighlighter language="python" style={atomDark} customStyle={{background: 'transparent'}} showLineNumbers>
            {`# Sample code for ${question.title}\n\ncommands = []\nfor _ in range(int(input())):\n    commands.append(input().strip().split())\n\nlst = []\nfor command in commands:\n    if command[0] == 'insert':\n        lst.insert(int(command[1]), int(command[2]))\n    elif command[0] == 'print':\n        print(lst)\n    elif command[0] == 'remove':\n        lst.remove(int(command[1]))\n    elif command[0] == 'append':\n        lst.append(int(command[1]))\n    elif command[0] == 'sort':\n        lst.sort()\n    elif command[0] == 'pop':\n        lst.pop()\n    elif command[0] == 'reverse':\n        lst.reverse()`}
          </SyntaxHighlighter>
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
