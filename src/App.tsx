import "./App.css";

import EditorComponent from "./components/Editor";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <EditorComponent width="100%" height="100%" defaultLanguage="en" />
    </div>
  );
}

export default App;
