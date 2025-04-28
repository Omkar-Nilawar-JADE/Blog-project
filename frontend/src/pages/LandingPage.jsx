// src/pages/LandingPage.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const LandingPage = () => {
  const { isLoggedIn } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSeePosts = () => {
    if (isLoggedIn) {
      navigate("/home"); // Go to Home
    } else {
      navigate("/Auth"); // Go to Login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Blog App</h1>
      <p className="text-lg mb-4">Discover amazing posts from our community!</p>
      <button
        onClick={handleSeePosts}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
      >
        See Posts
      </button>
    </div>
  );
};

export default LandingPage;
