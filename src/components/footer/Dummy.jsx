import React, { useState } from "react";

const Navbar = () => {
  // State to store the background color
  const [bgColor, setBgColor] = useState("bg-white");

  // Function to handle background color change
  const handleMouseEnter = (color) => {
    setBgColor(color);
  };

  const handleMouseLeave = () => {
    setBgColor("bg-white"); // Reset to default when the mouse leaves
  };

  return (
    <nav className={`w-full p-40 border border-red-400  ${bgColor} transition-colors duration-500`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">{bgColor}</div>

        {/* Navbar Items */}
        <div className="flex space-x-6">
          <button
            className="px-4 py-2 rounded-md"
            onMouseEnter={() => handleMouseEnter("bg-red-500")}
            onMouseLeave={handleMouseLeave}
          >
            Home
          </button>
          <button
            className="px-4 py-2 rounded-md"
            onMouseEnter={() => handleMouseEnter("bg-blue-500")}
            onMouseLeave={handleMouseLeave}
          >
            Services
          </button>
          <button
            className="px-4 py-2 rounded-md"
            onMouseEnter={() => handleMouseEnter("bg-green-500")}
            onMouseLeave={handleMouseLeave}
          >
            About
          </button>
          <button
            className="px-4 py-2 rounded-md"
            onMouseEnter={() => handleMouseEnter("bg-yellow-500")}
            onMouseLeave={handleMouseLeave}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
