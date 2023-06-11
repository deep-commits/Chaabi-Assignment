import React, { useState, useRef } from "react";
import "./TypingApp.css";
import Word from "../Word/Word";
import Timer from "../Timer/Timer";

const ParaGraph = () => {
  let para1 = "This is what you shall do; Love the earth and sun and the animals, despise riches, give alms to every one that asks, stand up for the stupid and crazy, devote your income and labor to others, hate tyrants, argue not concerning God, have patience and indulgence toward the people, take off your hat to nothing known or unknown or to any man or number of men, go freely with powerful uneducated persons and with the young and with the mothers of families, read these leaves in the open air every season of every year of your life, re-examine all you have been told at school or church or in any book, dismiss whatever insults your own soul, and your very flesh shall be a great poem and have the richest fluency not only in its words but in the silent lines of its lips and face and between the lashes of your eyes and in every motion and joint of your body.";
  let para2 = "The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing, but burn, burn, burn like fabulous yellow roman candles exploding like spiders across the stars.";
  let para3 = "I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand. It’s when you know you’re licked before you begin, but you begin anyway and see it through no matter what.";
  let para4 = "He who has felt the deepest grief is best able to experience supreme happiness. Live, then, and be happy, beloved children of my heart, and never forget, that until the day God will deign to reveal the future to man, all human wisdom is contained in these two words: “Wait and Hope.”";
  let para5 = "I looked at the stars, and considered how awful it would be for a man to turn his face up to them as he froze to death, and see no help or pity in all the glittering multitude.";
  const cars = [para1, para2, para3, para4, para5];
  let temp = cars[Math.floor(Math.random() * 5)].split(" ");
  return temp;
};

function TypingApp() {
  const [userInput, setuserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArr, setcorrectWordArr] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  // const [endIndex, setEndIndex] = useState("0");
  const cloud = useRef(ParaGraph());
  // const cloudSize = cloud.current.length - 1;

  // const fnend = (i) => {
  //   setEndIndex(i);
  // };

  const processInput = (value) => {
    if (activeWordIndex === cloud.current.length-1) {
      setTimeout(()=>
      {
        setStartCounting(false);
      },1000)
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
        totalWords={cloud.current.length}
        // size={cloudSize}
        // index={endIndex}
      />
    </div>
  );
}

export default TypingApp;
