import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([])
  const [totalcharacters, setTotalCharacters] = useState(0);
  const [totalword, setTotalWord] = useState(0);

  const handleDraft = () => {
    localStorage.setItem("text", JSON.stringify(text))
      setText(localStorage.getItem("text"));
    
  };

  useEffect(() => {
    setTotalCharacters(text.length);

    localStorage.setItem("text", text);

    function findTotal(text) {
      text = text.replace(/(^\s*)|(\s*$)/gi, "");
      text = text.replace(/[ ]{2,}/gi, " ");
      text = text.replace(/\n /, "\n");
      setTotalWord(text.split(" ").length);
    }
    findTotal(text);
    // handleDraft(text);
    // setTotalWord(text.split(' ').length)
  }, [text, totalword]);

  return (
    <div className="App">
      <header className="App-header">
        <textarea style={{width:'400px', height:'200px'}}
          type="text"
          placeholder="Type something"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button style={{width:'100px', background:'red'}} onClick={handleDraft}>Save Draft</button>
        <button style={{width:'100px', background:'green'}} onClick={() => setList([text, ...list])} >Add</button>
        <div>
          <span>Number Of total characters : {totalcharacters}</span>
        </div>
        <div>
          <span>Number of Words : {totalword}</span>
        </div>
        <div style={{ width:'700px', textAlign:'left'}} >

        <ul>
          {
              list.map((item) => {
                  return <li>{item}</li>
                })
            }
        </ul>
            </div>
      </header>
    </div>
  );
}

export default App;
