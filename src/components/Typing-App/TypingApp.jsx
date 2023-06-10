import React from "react";
import { useState, useRef } from "react";
import "./TypingApp.css";
import Word from "../Word/Word";
import Timer from "../Timer/Timer";
const ParaGraph = () =>
  `I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.`.split(
    " "
  );

function TypingApp() {
  const [userInput, setuserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArr, setcorrectWordArr] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const cloud = useRef(ParaGraph());

  const processInput = (value) => {
    if (activeWordIndex === cloud.current.length) {
      // stop
      return;
    }

    if (!startCounting) {
      setStartCounting(true);
    }

    if (value.endsWith(" ")) {
      // the user has finished the word
      if (activeWordIndex === cloud.current.length) {
        // overflow
        setStartCounting(false);
        setuserInput("Completed");
      } else {
        setuserInput("");
      }

      setActiveWordIndex((index) => index + 1);

      // correct word
      setcorrectWordArr((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setuserInput(value);
    }
  };

  return (
    <div className="App">
      
      <div className="text-passage">
        <p>
          {cloud.current.map((words, index) => {
            return (
              <Word
                text={words}
                key={index}
                active={index === activeWordIndex}
                correct={correctWordArr[index]}
              />
            );
          })}
        </p>
        
      </div>
      <input
        placeholder="Type here..."
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
      />
      <Timer
        startCounting={startCounting}
        correctWords={correctWordArr.filter(Boolean).length}
      />
    </div>
  );
}

export default TypingApp;
