import Editor from "@monaco-editor/react";

interface IEditProps {
  width: string;
  height: string;
  defaultLanguage: string;
}

export default function EditorComponent(props: IEditProps) {
  const { width = "50vw", height = "90vh", defaultLanguage = "rust" } = props;
  return (
    <Editor
      width={width}
      height={height}
      defaultLanguage={defaultLanguage}
      defaultValue="// some comment"
    />
  );
}
