// Hscroll.jsx

import React, { useRef, useState, useEffect } from 'react';

const Hscroll = ({ children, speed = 40 }) => {
  const contentRef = useRef(null);
  const [duplicatedContent, setDuplicatedContent] = useState([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const containerWidth = contentRef.current.offsetWidth;
    const contentWidth = contentRef.current.scrollWidth;

    // Calculate how many times the content needs to be duplicated
    // to ensure the track is long enough for a seamless loop.
    // We aim for at least twice the container width.
    const duplicateCount = Math.ceil(containerWidth / contentWidth) + 1;
    
    // Create an array of duplicated content. We use React.Children.map 
    // to correctly handle keys for the duplicated elements.
    let duplicated = [];
    for (let i = 0; i < duplicateCount; i++) {
      React.Children.forEach(children, (child, index) => {
        // Use a unique key for each item, including its duplicate index
        duplicated.push(React.cloneElement(child, { key: `duplicate-${i}-${index}` }));
      });
    }

    setDuplicatedContent(duplicated);

  }, [children]); // Rerun if children change

  // We set the animation duration dynamically using the 'speed' prop
  const animationStyle = {
    '--scroll-speed': `${speed}s`,
  };

  return (
    <div className="hscroll-container">
      {/* The first content div is the reference for width calculation. 
        It is hidden after the initial calculation.
      */}
      <div 
        ref={contentRef} 
        className="hscroll-content-reference"
        // Style to make it visible for calculation only, then hide it
        style={{ visibility: duplicatedContent.length > 0 ? 'hidden' : 'visible' }}
      >
        {children}
      </div>

      {/* The main scrolling track */}
      {duplicatedContent.length > 0 && (
        <div 
          className="hscroll-track" 
          style={animationStyle}
        >
          {/* The final, infinitely scrolling duplicated content */}
          {duplicatedContent}
        </div>
      )}
    </div>
  );
};

export default Hscroll;