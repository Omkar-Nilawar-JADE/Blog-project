import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo, logoutUser } = useContext(StoreContext);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setShowMenu(false);
    logoutUser();
  };

  return (
    <nav className="border-b-8 border-black bg-[#f7f3ea]">
      <div className="w-[90%] md:w-[85%] mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span 
              className="text-black font-black text-2xl transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer"
              onClick={() => navigate('/')}
            >
              MY BLOG
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)} 
                  className="flex items-center gap-2 text-black font-semibold hover:scale-105 transition-all"
                >
                  <img
                    src={`/Avatars/42.jpg`}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-black"
                  />
                  <span className="text-sm">Hi, {userInfo?.username || 'User'}</span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border-2 border-black rounded-md shadow-[4px_4px_0_0_#000] z-10">
                    <button onClick={() => handleNavigate("/profile")} className="w-full text-left px-4 py-2 hover:bg-gray-200">Profile</button>
                    <button onClick={() => handleNavigate("/userPosts")} className="w-full text-left px-4 py-2 hover:bg-gray-200">Posts</button>
                    <button onClick={() => handleNavigate("/userDrafts")} className="w-full text-left px-4 py-2 hover:bg-gray-200 text-yellow-600">Drafts</button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => handleNavigate("/Auth")} 
                className="bg-[#cc0000] hover:bg-red-600 text-white font-bold py-2 px-6 transform hover:rotate-1 transition-all border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                REGISTER
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t-4 border-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
           
            {isLoggedIn ? (
              <div className="">
                <button onClick={() => handleNavigate("/profile")} className="block w-full text-left px-3 py-2 text-black font-bold hover:bg-gray-100">Profile</button>
                <button onClick={() => handleNavigate("/userPosts")} className="block w-full text-left px-3 py-2 text-black font-bold hover:bg-gray-100">Posts</button>
                <button onClick={() => handleNavigate("/userDrafts")} className="block w-full text-left px-3 py-2 text-yellow-600 font-bold hover:bg-gray-100">Drafts</button>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 font-bold hover:bg-gray-100">Logout</button>
              </div>
            ) : (
              <button 
                onClick={() => handleNavigate("/Auth")} 
                className="w-full text-left px-3 py-2 bg-red-500 text-white font-bold border-2 border-black mt-2"
              >
                REGISTER
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
