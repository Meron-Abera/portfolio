import React from 'react';
import './LogoAnimation.css'; // Ensure this CSS path is correct based on your project structure

const IconLoader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 50"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    {/* Left Triangle Base */}
    <polygon id="left-triangle-base" points="47,0 0,50 47,50" stroke="currentColor" />
    {/* Right Triangle Base */}
    <polygon id="right-triangle-base" points="53,0 100,0 53,50" stroke="currentColor" />

    {/* Colored Edges to form 'N' */}
    <line id="left-vertical" x1="47" y1="0" x2="47" y2="50" stroke="#c8e7ff" strokeWidth="2" />
    <line id="left-hypotenuse" x1="47" y1="0" x2="0" y2="50" stroke="#c8e7ff" strokeWidth="2" />
    <line id="right-vertical" x1="53" y1="0" x2="53" y2="50" stroke="#9d4edd" strokeWidth="2" />
    <line id="right-hypotenuse" x1="53" y1="50" x2="100" y2="0" stroke="#9d4edd" strokeWidth="2" />
  </svg>
);

export default IconLoader;
