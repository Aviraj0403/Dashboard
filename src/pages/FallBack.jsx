import React from 'react';

const FallbackPage = () => {
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
    //   <img
    //     src="path-to-your-404-image.png"
    //     alt="Page not found"
    //     className="w-64 md:w-80 lg:w-96 mb-8"
    //   />
    //   <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
    //     Oops! Page not found
    //   </h1>
    //   <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8">
    //     It seems the page you are looking for doesn’t exist.
    //   </p>
    //   <a
    //     href="/"
    //     className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg text-base md:text-lg lg:text-xl hover:bg-green-600 transition-colors"
    //   >
    //     Go Back to Home
    //   </a>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-xl text-gray-600">Loading...</div>
  </div>
  );
};

export default FallbackPage;
