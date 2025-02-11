import React, { useState } from "react";
import Layout from "@/components/Layout";
import EditorComponent from "@/components/Editor";
import ResultWindow from "@/components/ResultWindow";
import { languageExamples, LanguageType } from "@/constants/languageExamples";
import {
  DocumentTextIcon,
  PlayIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "lua", label: "Lua" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

const EditorPage: React.FC = () => {
  const [code, setCode] = useState("// 请输入代码...");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState(languageOptions[0].value);
  const [selectedExample, setSelectedExample] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleRun = async () => {
    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }), // 发送语言信息
      });
      const data = await response.json();
      setResult(data.result); // 假设后端返回的结果在 data.result 中
    } catch (error: any) {
      setResult("运行出错: " + error.message);
    }
  };

  const handleClear = () => {
    setResult("");
  };

  const handleFormat = async () => {
    console.log("格式化前代码:", code);
    if (!code) {
      return;
    }

    try {
      // Handle other languages with Prettier in frontend
      const prettier = await import("prettier/standalone");
      const plugins = [];

      switch (language) {
        case "typescript":
          const tsPlugin = await import("prettier/plugins/typescript");
          const tsEstreePlugin = await import("prettier/plugins/estree");
          plugins.push(tsEstreePlugin.default, tsPlugin.default);
          break;

        case "javascript":
          const babelPlugin = await import("prettier/plugins/babel");
          const jsEstreePlugin = await import("prettier/plugins/estree");
          plugins.push(jsEstreePlugin.default, babelPlugin.default);
          break;

        // case "solidity":
        //   const solidityPlugin = await import("prettier-plugin-solidity");
        //   plugins.push(solidityPlugin);
        //   break;

        default:
          const response = await fetch("/api/format", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, language }),
          });
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setCode(data.formattedCode);
          return;
      }

      const formattedCode = await prettier.default.format(code, {
        parser: language === "typescript" ? "typescript" : "babel",
        plugins,
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: true,
      });

      setCode(formattedCode);
    } catch (error: any) {
      console.error("格式化失败:", error);
      alert("格式化失败：" + error.message);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-row gap-8 w-1/2">
          <h1 className="text-2xl font-bold p-5 text-white">Web3Editor</h1>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <CodeBracketIcon className="h-5 w-5 text-white" />
              <select
                id="language-select"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setSelectedExample("");
                  setCode("");
                }}
                className="rounded p-1 px-3"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <DocumentDuplicateIcon className="h-5 w-5 text-white" />
              <select
                id="example-select"
                value={selectedExample}
                onChange={(e) => {
                  setSelectedExample(e.target.value);
                  if (e.target.value) {
                    setCode(
                      languageExamples[language as LanguageType][
                        e.target
                          .value as keyof (typeof languageExamples)[LanguageType]
                      ]
                    );
                  }
                }}
                className=" rounded p-1 px-3"
              >
                <option value="">Samples</option>
                {Object.keys(
                  languageExamples[language as LanguageType] || {}
                ).map((example) => (
                  <option key={example} value={example}>
                    {example}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="mr-5 p-2 rounded-full hover:bg-zinc-600 transition-colors"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <SunIcon className="h-8 w-8 text-white" />
          ) : (
            <MoonIcon className="h-8 w-8 text-white" />
          )}
        </button> */}
      </div>

      <div className="flex flex-1 gap-2 mb-8 min-h-0">
        <div className="flex flex-1 relative shadow-xl min-w-0">
          <EditorComponent
            width="w-full"
            height="h-full"
            language={language}
            value={code}
            onChange={setCode}
          />

          <button
            onClick={handleRun}
            className="absolute top-4 right-5 bg-[#1e92f8] text-black py-2 px-3 rounded shadow hover:bg-blue-700 z-10 flex gap-2 items-center"
            title="Run Code"
          >
            <PlayIcon className="h-5 w-5" />
            Run
          </button>
          <button
            onClick={handleFormat}
            className={`absolute top-4 right-32  bg-[#233341] text-white font-bold p-3 rounded-full shadow hover:bg-zinc-600 z-10`}
            title="Format Code"
          >
            <DocumentTextIcon className="h-5 w-5" />
          </button>
        </div>
        <ResultWindow result={result} onClear={handleClear} width="w-1/2" />
      </div>
    </Layout>
  );
};

export default EditorPage;
