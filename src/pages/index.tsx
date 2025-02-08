import React, { useState } from "react";
import Layout from "@/components/Layout";
import EditorComponent from "@/components/Editor";
import ResultWindow from "@/components/ResultWindow";
import { languageExamples, LanguageType } from "@/constants/languageExamples";
import prettier from "prettier";

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
      // const prettier = await import("prettier/standalone");
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

      const formattedCode = await prettier.format(code, {
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center flex-row gap-8 w-1/2">
          <h1 className="text-2xl font-bold"> 编辑器</h1>
          <div className="flex gap-4">
            <div>
              <label htmlFor="language-select" className="mr-2">
                选择语言:
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setSelectedExample("");
                  setCode("");
                }}
                className="border border-gray-300 rounded p-1"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="example-select" className="mr-2">
                示例:
              </label>
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
                className="border border-gray-300 rounded p-1"
              >
                <option value="">选择示例</option>
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
        <div className="flex flex-1">
          <div className="flex flex-1 relative h-[720px]">
            <EditorComponent
              width="w-full"
              height="h-full"
              language={language}
              value={code}
              onChange={setCode}
            />

            <button
              onClick={handleRun}
              className="absolute top-2 right-4 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 z-10"
            >
              Run
            </button>
            <button
              onClick={handleFormat}
              className="absolute top-2 right-20 bg-green-500 text-white font-bold py-2 px-2 rounded shadow hover:bg-green-600 z-10"
            >
              Format
            </button>
          </div>
          <ResultWindow
            result={result}
            onClear={handleClear}
            width="w-1/2"
            height="h-[720px]"
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditorPage;
