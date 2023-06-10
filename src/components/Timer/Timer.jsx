import React, { useEffect, useState } from "react";
import './Timer.css';
function Timer({ startCounting, correctWords }) {
  const [timeElapsed, settimeElapsed] = useState(0);
  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        settimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  const minutes = timeElapsed / 60;
  return (
    <div><div className="Timer-Box">
      <div>Time: {timeElapsed}</div>
      <div>Speed: {(correctWords / minutes || 0).toFixed(2)} (WPM)</div>
      </div>
    </div>
  );
}

export default Timer;
