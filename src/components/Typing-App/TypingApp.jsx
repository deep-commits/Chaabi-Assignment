import React from "react";
import { useState, useRef } from "react";
import "./TypingApp.css";
import Word from "../Word/Word";
import Timer from "../Timer/Timer";
const getCloud = () =>
  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`.split(
    " "
  );

function TypingApp() {
  const [userInput, setuserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArr, setcorrectWordArr] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const cloud = useRef(getCloud());

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
      <Timer
        startCounting={startCounting}
        correctWords={correctWordArr.filter(Boolean).length}
      />
      <div className="text-pera">
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
        placeholder="Start typing hare..."
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
      />
    </div>
  );
}

export default TypingApp;
