import React, { useState, useEffect } from "react";

export default function SrollButton() {
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
  };
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  return (
    <>
      //Left Button
      <button className="prev" onClick={() => slide(-50)}>
        <i className="fa fa-angle-left"></i>
      </button>
      //Right Button
      <button className="next" onClick={() => slide(+50)}>
        <i className="fa fa-angle-right"></i>
      </button>
    </>
  );
}
