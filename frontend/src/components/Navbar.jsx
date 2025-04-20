import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext.jsx';
import { FaUserCircle } from 'react-icons/fa'; // profile icon

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo, logoutUser } = useContext(StoreContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false); // Close dropdown on selection
  };

  //onClicking LogOut Button
  const handleLogout = () => {
    setShowMenu(false);
    logoutUser();
  };

  return (
    <nav className="bg-[#f7e9f9] border-b border-black p-4 flex justify-between items-center shadow-md relative">
      <h1 className="text-2xl font-bold text-black cursor-pointer" onClick={() => navigate('/')}>Echo</h1>

      {isLoggedIn ? (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 text-black font-semibold hover:scale-105 transition-all"
          >
            <FaUserCircle className="text-2xl" />
            <span className="text-sm">Hi, {userInfo?.username || 'User'}</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-black rounded-lg shadow-md z-10">
              <button
                onClick={() => handleNavigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Profile
              </button>
              <button
                onClick={() => handleNavigate("/userPosts")}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Posts
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/Auth")}
          className="bg-[#d3a4f7] text-black px-4 py-2 rounded-lg font-semibold border border-black shadow-lg hover:scale-105 transition-all duration-200"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
