import React, { useEffect, useRef } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { registerLuaLanguage } from "./register/lua";
import { registerRustLanguage } from "./register/rust";
import { registerPythonLanguage } from "./register/python";

interface IEditorProps {
  width: string;
  height: string;
  language: string; //"javascript" | "typescript" | "solidity" | "rust" | "func"; // 限定支持的语言
  value: string;
  onChange: (value: string) => void;
}

// 添加主题颜色常量
const THEME_COLORS = {
  "vs-dark": {
    background: "blue",
    text: "#D4D4D4",
  },
  light: {
    background: "#FFFFFF",
    text: "#000000",
  },
} as const;

const EditorComponent: React.FC<IEditorProps> = ({
  width,
  height,
  language,
  value,
  onChange,
}) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;

    // 定义自定义主题
    monacoInstance.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0F1419",
      },
    });

    // 应用自定义主题
    monacoInstance.editor.setTheme("custom-dark");

    // 注册语言支持
    if (language === "lua") {
      registerLuaLanguage(monacoInstance);
    }
    if (language === "rust") {
      registerRustLanguage(monacoInstance);
    }
    if (language === "python") {
      registerPythonLanguage(monacoInstance);
    }
  };

  return (
    <div className={`${width} ${height}`}>
      <Editor
        width="100%"
        height="100%"
        language={language}
        value={value}
        onChange={onChange as OnChange}
        theme={"vs-dark"}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          fontSize: 14,
          padding: {
            top: 12,
            bottom: 12,
          },
        }}
        className="border-none"
        onMount={handleEditorMount}
      />
    </div>
  );
};

export default EditorComponent;
