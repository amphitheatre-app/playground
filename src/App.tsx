import "./App.css";

import EditorComponent from "./components/Editor";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <EditorComponent />
      </div>
    </>
  );
}

export default App;
