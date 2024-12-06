import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css/animate.min.css';
 // Import animate.css for animation effects
 import 'animate.css/animate.min.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#004353] p-4 fixed top-0 w-full z-50 shadow-lg transition-all ease-in-out duration-300">

      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold animate__animated animate__fadeIn">
          <span className="text-orange-500">Br Tech</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-orange-400 transition-colors duration-300">Home</a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors duration-300">About</a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors duration-300">Services</a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors duration-300">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 p-4 rounded-lg animate__animated animate__fadeIn">
          <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700 transition-all">Home</a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700 transition-all">About</a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700 transition-all">Services</a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700 transition-all">Contact</a>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#004353] text-white py-4 mt-8"
>
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; 2024 <span className="text-orange-500">Br Tech</span>. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-orange-400 hover:underline transition-all">Privacy Policy</a>
          <a href="#" className="text-orange-400 hover:underline transition-all">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const Landing = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 text-center h-screen bg-gradient-to-r from-orange-600 to-blue-400 flex items-center justify-center">
  <div className="text-white">
    <h1 className="text-4xl font-extrabold mb-4 animate__animated animate__fadeIn">
      Welcome to <span className="text-orange-500">Br Tech</span>
    </h1>
    <p className="text-lg text-gray-100 mb-8 animate__animated animate__fadeIn animate__delay-1s">
      Empower your restaurant management with our intuitive software, designed to streamline operations, enhance customer experience, and drive efficiency. From real-time updates to seamless order management, we provide the tools you need for a smooth and successful business.
    </p>
    <Link
      to={"/login"}
      className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-all transform hover:scale-105"
    >
      Login
    </Link>
  </div>
</main>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
