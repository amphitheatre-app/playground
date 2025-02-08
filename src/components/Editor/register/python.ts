export const registerPythonLanguage = (monaco: any) => {
  monaco.languages.register({ id: "python" });

  monaco.languages.setMonarchTokensProvider("python", {
    keywords: [
      "and",
      "as",
      "assert",
      "async",
      "await",
      "break",
      "class",
      "continue",
      "def",
      "del",
      "elif",
      "else",
      "except",
      "finally",
      "for",
      "from",
      "global",
      "if",
      "import",
      "in",
      "is",
      "lambda",
      "nonlocal",
      "not",
      "or",
      "pass",
      "raise",
      "return",
      "try",
      "while",
      "with",
      "yield",
      "None",
      "True",
      "False",
    ],
    typeKeywords: [
      "int",
      "float",
      "str",
      "bool",
      "list",
      "dict",
      "set",
      "tuple",
    ],
    builtins: [
      "abs",
      "all",
      "any",
      "bin",
      "bool",
      "dict",
      "float",
      "int",
      "len",
      "list",
      "max",
      "min",
      "print",
      "range",
      "set",
      "str",
      "sum",
      "tuple",
      "type",
      "zip",
    ],

    tokenizer: {
      root: [
        // Function definitions
        [/def\s+([a-zA-Z_]\w*)/, ["keyword", "function"]],
        // Function calls
        [/([a-zA-Z_]\w*)\s*\(/, ["function", "@brackets"]],
        // Keywords and identifiers
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@builtins": "predefined",
              "@default": "identifier",
            },
          },
        ],
        // Numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/\d+/, "number"],
        // String literals
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/'/, "string", "@string_single"],
        [/"/, "string", "@string_double"],
        // Comments
        [/#.*$/, "comment"],
        // Brackets and operators
        [/[{}()\[\]]/, "@brackets"],
        [/@symbols/, "operator"],
        // Decorators
        [/@\s*[a-zA-Z_]\w*/, "decorator"],
      ],
      string_single: [
        [/[^'\\]+/, "string"],
        [/\\./, "string.escape"],
        [/'/, "string", "@pop"],
      ],
      string_double: [
        [/[^"\\]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],
    },
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
  });

  monaco.languages.setLanguageConfiguration("python", {
    comments: {
      lineComment: "#",
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
      increaseIndentPattern:
        /^\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async)\b.*:\s*$/,
      decreaseIndentPattern: /^\s*(?:elif|else|except|finally)\b.*$/,
    },
  });
};
