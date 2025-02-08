import React, { useEffect, useRef } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";

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

  const registerRustLanguage = (monaco: any) => {
    monaco.languages.register({ id: "rust" });

    monaco.languages.setMonarchTokensProvider("rust", {
      keywords: [
        "as",
        "break",
        "const",
        "continue",
        "crate",
        "else",
        "enum",
        "extern",
        "false",
        "fn",
        "for",
        "if",
        "impl",
        "in",
        "let",
        "loop",
        "match",
        "mod",
        "move",
        "mut",
        "pub",
        "ref",
        "return",
        "self",
        "Self",
        "static",
        "struct",
        "super",
        "trait",
        "true",
        "type",
        "unsafe",
        "use",
        "where",
        "while",
        "async",
        "await",
        "dyn",
        "abstract",
        "become",
        "box",
        "do",
        "final",
        "macro",
        "override",
        "priv",
        "typeof",
        "unsized",
        "virtual",
        "yield",
      ],
      typeKeywords: [
        "i8",
        "i16",
        "i32",
        "i64",
        "i128",
        "isize",
        "u8",
        "u16",
        "u32",
        "u64",
        "u128",
        "usize",
        "f32",
        "f64",
        "str",
        "char",
        "bool",
        "Vec",
        "String",
      ],
      operators: [
        "=",
        ">",
        "<",
        "!",
        "~",
        "?",
        ":",
        "==",
        "<=",
        ">=",
        "!=",
        "&&",
        "||",
        "++",
        "--",
        "+",
        "-",
        "*",
        "/",
        "&",
        "|",
        "^",
        "%",
        "<<",
        ">>",
        ">>>",
        "+=",
        "-=",
        "*=",
        "/=",
        "&=",
        "|=",
        "^=",
        "%=",
        "<<=",
        ">>=",
        ">>>=",
        "=>",
        "::",
      ],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      tokenizer: {
        root: [
          [
            /[a-zA-Z_]\w*/,
            {
              cases: {
                "@typeKeywords": "type",
                "@keywords": "keyword",
                "@default": "identifier",
              },
            },
          ],
          [/[{}()\[\]]/, "@brackets"],
          [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
          [/0[xX][0-9a-fA-F]+/, "number.hex"],
          [/\d+/, "number"],
          [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
          [/\/\/.*$/, "comment"],
          [/\/\*/, "comment", "@comment"],
        ],
        string: [
          [/[^\\"]+/, "string"],
          [/\\./, "string.escape"],
          [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
        ],
        comment: [
          [/[^\/*]+/, "comment"],
          [/\/\*/, "comment", "@push"],
          ["\\*/", "comment", "@pop"],
          [/[\/*]/, "comment"],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration("rust", {
      comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"],
      },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      indentationRules: {
        increaseIndentPattern: /^.*\{[^}"']*$/,
        decreaseIndentPattern: /^(.*\*\/)?\s*\}[;\s]*$/,
      },
    });
  };

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;

    if (language === "solidity") {
      registerSolidityLanguage(monacoInstance);
    }
    if (language === "lua") {
      registerLuaLanguage(monacoInstance);
    }
    if (language === "rust") {
      registerRustLanguage(monacoInstance);
    }
  };

  useEffect(() => {
    if (monacoRef.current) {
      if (language === "solidity") {
        registerSolidityLanguage(monacoRef.current);
      }
      if (language === "lua") {
        registerLuaLanguage(monacoRef.current);
      }
      if (language === "rust") {
        registerRustLanguage(monacoRef.current);
      }
    }
  }, [language]);

  const registerLuaLanguage = (monaco: any) => {
    console.log("注册 Lua 语法高亮");

    monaco.languages.register({ id: "lua" });

    monaco.languages.setMonarchTokensProvider("lua", {
      keywords: [
        "and",
        "break",
        "do",
        "else",
        "elseif",
        "end",
        "false",
        "for",
        "function",
        "if",
        "in",
        "local",
        "nil",
        "not",
        "or",
        "repeat",
        "return",
        "then",
        "true",
        "until",
        "while",
      ],
      operators: [
        "+",
        "-",
        "*",
        "/",
        "%",
        "^",
        "#",
        "==",
        "~=",
        "<=",
        ">=",
        "<",
        ">",
        "=",
        ";",
        ":",
        ",",
        ".",
        "..",
        "...",
        "(",
        ")",
        "{",
        "}",
        "[",
        "]",
      ],
      symbols: /[=><!~?:&|+\-*\/\^%#]+/,
      tokenizer: {
        root: [
          [
            /[a-zA-Z_]\w*/,
            {
              cases: {
                "@keywords": "keyword",
                "@default": "identifier",
              },
            },
          ],
          [/[{}()\[\]]/, "@brackets"],
          [/\d+(\.\d+)?/, "number"],
          [/[;,.]/, "delimiter"],
          [/"([^"\\]|\\.)*$/, "string.invalid"],
          [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
          [/'([^'\\]|\\.)*$/, "string.invalid"],
          [/'/, { token: "string.quote", bracket: "@open", next: "@string" }],
          [/\-\-.*$/, "comment"], // 单行注释
        ],
        string: [
          [/[^\\"]+/, "string"],
          [/\\./, "string.escape"],
          [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration("lua", {
      comments: {
        lineComment: "--",
        blockComment: ["--[[", "]]"],
      },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });
  };

  const registerSolidityLanguage = (monacoInstance: any) => {
    console.log("注册 Solidity 语法高亮");

    monacoInstance.languages.register({ id: "solidity" });

    monacoInstance.languages.setMonarchTokensProvider("solidity", {
      keywords: [
        "pragma",
        "solidity",
        "contract",
        "import",
        "is",
        "function",
        "modifier",
        "mapping",
        "memory",
        "storage",
        "public",
        "private",
        "internal",
        "external",
        "returns",
        "event",
        "struct",
        "enum",
        "require",
        "revert",
        "if",
        "else",
        "for",
        "while",
        "do",
        "return",
        "new",
        "delete",
        "constant",
        "immutable",
        "override",
        "payable",
        "pure",
        "view",
        "constructor",
        "selfdestruct",
        "emit",
        "using",
      ],
      operators: [
        "=",
        ">",
        "<",
        "!",
        "?",
        ":",
        "==",
        "<=",
        ">=",
        "!=",
        "&&",
        "||",
        "+",
        "-",
        "*",
        "/",
        "%",
      ],
      tokenizer: {
        root: [
          [
            /[a-z_$][\w$]*/,
            {
              cases: {
                "@keywords": "keyword",
                "@default": "identifier",
              },
            },
          ],
          [/[A-Z][\w\$]*/, "type.identifier"],
          { include: "@whitespace" },
          [/[{}()\[\]]/, "@brackets"],
          [/\d+/, "number"],
          [/[;,.]/, "delimiter"],
          [/"([^"\\]|\\.)*$/, "string.invalid"],
          [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
          [/'([^'\\]|\\.)*$/, "string.invalid"],
          [/'/, { token: "string.quote", bracket: "@open", next: "@string" }],
        ],
        whitespace: [
          [/[ \t\r\n]+/, "white"],
          [/\/\*/, "comment", "@comment"],
          [/\/\/.*$/, "comment"],
        ],
        comment: [
          [/[^\/*]+/, "comment"],
          [/\/\*/, "comment", "@push"],
          ["\\*/", "comment", "@pop"],
          [/[\/*]/, "comment"],
        ],
        string: [
          [/[^\\"]+/, "string"],
          [/\\./, "string.escape"],
          [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
        ],
      },
    });

    monacoInstance.languages.setLanguageConfiguration("solidity", {
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });
  };

  useEffect(() => {
    if (monacoRef.current && language === "solidity") {
      registerSolidityLanguage(monacoRef.current);
    }
    if (monacoRef.current && language === "lua") {
      registerLuaLanguage(monacoRef.current);
    }
  }, [language]);

  return (
    <div className={`border border-gray-300 rounded ${width} ${height}`}>
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
        }}
        onMount={handleEditorMount}
      />
    </div>
  );
};

export default EditorComponent;
