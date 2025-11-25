import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-gradient-to-b from-[#0c0f1d] to-[#060640] text-[#FADED9] relative overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#515161] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-[#FADED9] opacity-10 animate-pulse"></div>

      <h1 className="text-[8rem] font-extrabold mb-4 tracking-widest relative">
        404
        <span className="absolute top-0 left-0 w-full h-full text-[#FADED9] opacity-10 animate-ping">
          404
        </span>
      </h1>
      <p className="text-2xl mb-8 text-center max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-4 bg-[#060640] text-[#FADED9] font-semibold rounded-lg shadow-lg hover:bg-[#515161] hover:scale-105 transform transition-all duration-300"
      >
        Go Back Home
      </Link>

      {/* Subtle underline animation */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <span className="block w-24 h-1 bg-[#FADED9] rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default NotFound;
