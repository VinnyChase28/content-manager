import React, { useState, useEffect } from "react";

export default function SuccessMessage() {
  const [counter, setCounter] = useState(1);

  // First Attempts
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    console.log(counter);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="App">
      <div>
        {counter > 0 ? (
          <div></div>
        ) : (
          <div className="wrapper">
            {" "}
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
