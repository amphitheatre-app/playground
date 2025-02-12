import React, { useState } from "react";
import Layout from "@/components/Layout";
import EditorComponent from "@/components/Editor";
import ResultWindow from "@/components/ResultWindow";
import { languageExamples, LanguageType } from "@/constants/languageExamples";
import { languageColors, languageLogos } from "@/constants/languageLogos";
import {
  DocumentTextIcon,
  PlayIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";
import toast from "react-hot-toast";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "lua", label: "Lua" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

// 添加图标尺寸常量
const ICON_SIZE = "w-5 h-5";

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
      return toast.error(error.message);
    }
  };

  const handleClear = () => {
    setResult("");
  };

  const handleFormat = async () => {
    console.log("格式化前代码:", code);
    if (!code) {
      return toast.error("Please enter code before formatting.");
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
            return toast.error(data.error);
          }
          setCode(data.formattedCode);
          return toast.success("Code formatted successfully.");
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
      toast.success("Code formatted successfully.");
    } catch (error: any) {
      console.error("格式化失败:", error);
      toast.error("Formatting failed.");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-row gap-8 w-1/2">
          <h1 className="text-2xl font-bold p-5 text-white">Web3Editor</h1>
          <div className="flex gap-4 items-center">
            <div className="relative w-40">
              <Listbox
                value={language}
                onChange={(value) => {
                  setLanguage(value);
                  setSelectedExample("");
                  setCode("");
                }}
              >
                <Listbox.Button className="relative w-full bg-[#1b1a1a] text-white rounded-md pl-10 pr-8 py-2 border border-gray-700 focus:outline-none focus:border-blue-500 text-left">
                  {({ value }) => {
                    const Logo =
                      languageLogos[value as keyof typeof languageLogos];
                    return (
                      <>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          {Logo && (
                            <Logo
                              className={ICON_SIZE}
                              style={{
                                color:
                                  languageColors[
                                    value as keyof typeof languageColors
                                  ],
                              }}
                            />
                          )}
                        </div>
                        <span>
                          {
                            languageOptions.find((opt) => opt.value === value)
                              ?.label
                          }
                        </span>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CodeBracketIcon className={ICON_SIZE} />
                        </div>
                      </>
                    );
                  }}
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 w-full mt-1 bg-[#1b1a1a] border border-gray-700 rounded-md shadow-lg">
                  {languageOptions.map((option) => {
                    const Logo =
                      languageLogos[option.value as keyof typeof languageLogos];
                    return (
                      <Listbox.Option
                        key={option.value}
                        value={option.value}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? "bg-gray-800" : ""
                          }`
                        }
                      >
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          {Logo && (
                            <Logo
                              className={ICON_SIZE}
                              style={{
                                color:
                                  languageColors[
                                    option.value as keyof typeof languageColors
                                  ],
                              }}
                            />
                          )}
                        </div>
                        <span className="text-white">{option.label}</span>
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Listbox>
            </div>
            <div className="relative">
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
                className="appearance-none bg-[#1E1E1E] text-white rounded-md pl-10 pr-8 py-2 w-40 border border-gray-700 focus:outline-none focus:border-blue-500"
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
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <DocumentDuplicateIcon className={`${ICON_SIZE} text-white`} />
              </div>
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
            <PlayIcon className={ICON_SIZE} />
            Run
          </button>
          <button
            onClick={handleFormat}
            className={`absolute top-4 right-32  bg-[#233341] text-white font-bold p-3 rounded-full shadow hover:bg-zinc-600 z-10`}
            title="Format Code"
          >
            <DocumentTextIcon className={ICON_SIZE} />
          </button>
        </div>
        <ResultWindow result={result} onClear={handleClear} width="w-1/2" />
      </div>
    </Layout>
  );
};

export default EditorPage;
