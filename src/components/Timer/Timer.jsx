import React, { useEffect, useState } from "react";

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
    <>
      <div>Time: {timeElapsed}</div>
      <div>Speed: {(correctWords / minutes || 0).toFixed(2)} (WPM)</div>
    </>
  );
}

export default Timer;
