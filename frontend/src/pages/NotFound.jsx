import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#DDC6] flex flex-col items-center justify-center p-4 text-center">
      <img src="/ramenDuck.gif" alt="404 Error" className="w-64 h-auto mb-6" />
      <h1 className="text-5xl font-extrabold text-[#333] mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-[#555] mb-4">Looks like you’ve wandered too far...</p>
      <Link
        to="/"
        className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
      >
        Back to Safety (Home)
      </Link>
    </div>
  );
};

export default NotFound;
