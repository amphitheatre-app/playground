import React from "react";

interface IResultWindowProps {
  result: string;
  onClear: () => void;
  height: string;
  width: string;
}

const ResultWindow: React.FC<IResultWindowProps> = ({
  result,
  onClear,
  height,
  width,
}) => {
  return (
    <div
      className={`border border-gray-300 rounded p-4 ${height} ${width} overflow-y-auto relative`}
    >
      <pre className="whitespace-pre-wrap">{result}</pre>
      <button
        onClick={onClear}
        className="absolute top-2 right-2 bg-red-500 text-white font-bold py-1 px-3 rounded shadow hover:bg-red-600"
      >
        Clear
      </button>
    </div>
  );
};

export default ResultWindow;
