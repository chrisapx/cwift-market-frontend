import React, { useState, useEffect } from 'react';
import './AdBar.scss';

const adTexts = ["Special Offer!", "Limited Time Deal", "Save Big Today up to 10% discount", "CALL 0758085749 TO ORDER"]; // Add your list of words here

const AdBar = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % adTexts.length);
    }, 6000); // Adjust the timeout duration as needed

    return () => {
      clearTimeout(timeout);
    };
  }, [currentTextIndex]);

  return (
    <div className="ad-bar">
      <div className="fade-in-out">{adTexts[currentTextIndex]}</div>
    </div>
  );
};

export default AdBar;
