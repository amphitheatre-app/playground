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

  useEffect(() => {
    if (monacoRef.current) {
      if (language === "lua") {
        registerLuaLanguage(monacoRef.current);
      }
      if (language === "rust") {
        registerRustLanguage(monacoRef.current);
      }
      if (language === "python") {
        registerPythonLanguage(monacoRef.current);
      }
    }
  }, [language]);

  return (
    <div className={`bg-white ${width} ${height}`}>
      <Editor
        width="100%"
        height="100%"
        language={language}
        value={value}
        onChange={onChange as OnChange}
        theme="light"
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
