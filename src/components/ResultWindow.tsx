import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IResultWindowProps {
  result: string;
  onClear: () => void;
  width: string;
}

const ResultWindow: React.FC<IResultWindowProps> = ({
  result,
  onClear,
  width,
}) => {
  return (
    <div
      className={`bg-[#0F1419] p-4 h-full ${width} overflow-y-auto relative`}
    >
      <pre className="whitespace-pre-wrap">{result}</pre>
      <button
        onClick={onClear}
        className="absolute top-4 right-4 bg-[#233341] text-white font-bold p-2 rounded-full shadow hover:bg-zinc-600"
        title="Clear Output"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ResultWindow;
