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
    <>
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
    <div className="w-[90%] md:w-[80%] mx-auto  py-16">
      <div className="flex flex-wrap md:flex-nowrap gap-12 items-center">
        <div className="space-y-8 w-[80%]">
          <h1 className="text-5xl md:text-7xl font-black leading-tight text-black transform -rotate-1">
            THOUGHTS & IDEAS THAT <span className="bg-blue-400 px-2 inline-block transform rotate-1">MATTER</span>
          </h1>
          <p className="text-xl font-medium">
            Welcome to my corner of the internet. I write about design, technology, and life's curious moments.
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
        <div className="relative">
          <div className="aspect-square bg-blue-300 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-3 overflow-hidden">
            <div className="w-full h-full p-8 flex flex-col justify-center">
              <div className="text-6xl font-black text-black mb-4">HELLO</div>
              <div className="text-2xl font-bold">I'm a writer, thinker, and creative explorer.</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-yellow-300 border-4 border-black p-4 transform -rotate-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black text-lg">NEW POST EVERY WEEK!</p>
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
              Sign up for my newsletter and get the latest articles directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 px-4 py-3 border-4 border-black text-black font-bold focus:outline-none"
              />
              <button className="bg-black text-white font-bold py-3 px-6 border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* footer */}
      <footer className="bg-black text-white border-t-8 border-yellow-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-black mb-4 transform -rotate-1">MY BLOG</h2>
              <p className="max-w-md">
                A place for thoughts, ideas, and creative expressions. Join me on this journey of discovery.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">Home</a></li>
                  <li><a href="#" className="hover:underline">Articles</a></li>
                  <li><a href="#" className="hover:underline">About</a></li>
                  <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">Twitter</a></li>
                  <li><a href="#" className="hover:underline">Instagram</a></li>
                  <li><a href="#" className="hover:underline">LinkedIn</a></li>
                  <li><a href="#" className="hover:underline">Email</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 My Blog. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Made with ❤️ and a lot of coffee</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
