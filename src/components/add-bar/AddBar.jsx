import React, { useState, useEffect } from 'react';
import './AdBar.scss';

const adTexts = ["Special Offer!", "Limited Time Deal", "Up to 10% OFF", "Call +256-758085749 to order"]; // Add your list of words here

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
