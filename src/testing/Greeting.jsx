import React, { useState } from "react";

const Greeting = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={handleClick}>click me</button>
      {!isVisible && <p>I am visible</p>}
      {isVisible && <p>after button click I am visible</p>}
    </div>
  );
};

export default Greeting;
