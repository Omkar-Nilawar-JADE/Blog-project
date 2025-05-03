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
    <div className="bg-[#f5e6cf]">
    {/* <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Blog App</h1>
      <p className="text-lg mb-4">Discover amazing posts from our community!</p>
      <button
        onClick={handleSeePosts}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
      >
        See Posts
      </button>
    </div> */}

    {/* Hero Section */}
    <div className="w-[90%] md:w-[80%] mx-auto  py-7">
      <div className="flex flex-wrap md:flex-nowrap gap-12 items-center">
        <div className="space-y-8 w-[80%]">
          <h1 className="text-5xl md:text-6xl font-black leading-tight text-black transform -rotate-1">
            THOUGHTS & IDEAS THAT <span className="bg-blue-400 px-2 inline-block transform rotate-1">MATTER</span>
          </h1>
          <p className="text-xl font-medium">
            Welcome to a  <pre className="bg-yellow-300 inline-block font-extrabold"> JADEAN's </pre> corner of the internet.<br/> We write about design, technology, and life's curious moments.
          </p>
          <div className="flex space-x-4">
            <button className="bg-black text-white font-bold py-3 px-8 border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]" onClick={handleSeePosts}>
              READ ARTICLES
            </button>
            <button className="bg-white text-black font-bold py-3 px-8 border-4 border-black hover:bg-black hover:text-white transition-colors">
              ABOUT ME
            </button>
          </div>
        </div>
        <div className="">
          <img 
            src="./download.gif" 
            alt="Cute duck with burning laptop" 
            className="w-[300px] md:w-[600px] border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-3" 
          />
          <div className="mt-10 font-bold text-3xl">
            <h1>Hello, I am Ducky. I am a creative thinker, writer and explorer.
            </h1>
          </div>
        </div>
      </div>
    </div>
      

    {/* email section */}
    <div className="w-[90%] md:w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <div className="bg-red-400 border-8 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] inline-block  ">
          <div className=" mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4 transform -rotate-1">
              NEVER MISS A <span className="bg-white px-2 inline-block transform rotate-2 border-2 border-black">NEW POST</span>
            </h2>
            <p className="text-lg mb-6 font-medium">
              Sign up for Ducky Blogs & post or read the latest articles from your fellow Jadeans.
            </p>
            <div className="max-w-lg mx-auto">
              <button 
                className="bg-black text-white font-bold py-3 px-6 border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]"
                onClick={() => navigate("/Auth")}
              >
                REGISTER NOW!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
