import React from 'react';

const IconLogo = () => (
  <svg
    id="logo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 50"
    fill="none"
    stroke="#8d99ae"
    strokeWidth="2">
    <title>Logo</title>
    {/* Base Triangles */}
    <polygon points="47,0 0,50 47,50" stroke="#deaaff" />
    <polygon points="53,0 100,0 53,50" stroke="#deaaff" />
    {/* Colored edges to form 'N' */}
    <line x1="47" y1="0" x2="47" y2="50" stroke="#c8e7ff" strokeWidth="2" />{' '}
    {/* Left inner vertical */}
    <line x1="47" y1="0" x2="0" y2="50" stroke="#c8e7ff" strokeWidth="2" /> {/* Left hypotenuse */}
    <line x1="53" y1="0" x2="53" y2="50" stroke="#c8e7ff" strokeWidth="2" />{' '}
    {/* Right inner vertical */}
    <line x1="53" y1="50" x2="100" y2="0" stroke="#c8e7ff" strokeWidth="2" />{' '}
    {/* Right hypotenuse */}
  </svg>
);

export default IconLogo;
