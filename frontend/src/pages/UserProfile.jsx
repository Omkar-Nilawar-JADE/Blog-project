import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const UserProfile = () => {
  const { userInfo, isLoggedIn, sendPasswordResetEmail, fetchUserData} = useContext(StoreContext);
  const [emailMessage, setEmailMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Auth");
    } else {
      setFormData({ username: userInfo?.username || "", email: userInfo?.email || "" });
    }
  }, [isLoggedIn,userInfo]);

  const handleForgotPassword = async () => {
    setEmailMessage("");
    const email = prompt("Enter your email for password reset:");
    if (!email) return;

    if (email !== userInfo.email) {
      setEmailMessage("This email is not yours.");
      return;
    }
    if (email) {
      const res = await sendPasswordResetEmail(email);
      setEmailMessage(res.message);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      const res = await axios.put(
        "http://localhost:8000/api/updateUser/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdateMessage(res.data.message);
      setShowModal(false);
      fetchUserData();
    } catch (err) {
      console.error(err);
      setUpdateMessage("Error updating profile.");
    }
  };

  if (!userInfo) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-24 w-24 rounded-full bg-blue-300 mb-4"></div>
        <div className="h-6 w-32 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden transform transition-all duration-300 hover:translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row">
          {/* Left Profile Section */}
          <div className="bg-yellow-200 border-b-4 md:border-b-0 md:border-r-4 border-black p-6 relative md:w-1/3 flex flex-col justify-center items-center">
            <div className="absolute top-2 right-2 w-8 h-8 bg-pink-400 rounded-full border-2 border-black"></div>
            <div className="absolute top-4 left-2 w-6 h-6 bg-blue-400 rounded-full border-2 border-black"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-gradient-to-br from-blue-300 to-blue-400 border-4 border-black rounded-full w-28 h-28 flex items-center justify-center mb-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] transform transition-all duration-300 hover:rotate-3">
                <span className="text-5xl font-black text-white">{userInfo.username.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-3xl font-black mb-2 px-6 py-1 bg-white inline-block rounded-lg border-4 border-black transform -rotate-2">Profile</h2>
              <p className="text-lg text-gray-800 font-medium">Hey there, <span className="font-bold text-blue-600">{userInfo.username}</span>!</p>
            </div>
            
            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center space-x-3">
              <div className="w-3 h-3 bg-pink-400 rounded-full border-2 border-black"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-black"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-black"></div>
            </div>
          </div>
          
          {/* Right Content Section */}
          <div className="p-6 md:w-2/3">
            <div className="space-y-4 mb-6">
              <div className="flex items-center p-3 bg-indigo-50 rounded-xl border-2 border-black transform transition-all duration-200 hover:translate-x-1">
                <div className="bg-indigo-400 text-white p-2 rounded-lg border-2 border-black mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500">USERNAME</p>
                  <p className="font-bold text-gray-800">{userInfo.username}</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-pink-50 rounded-xl border-2 border-black transform transition-all duration-200 hover:translate-x-1">
                <div className="bg-pink-400 text-white p-2 rounded-lg border-2 border-black mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500">EMAIL</p>
                  <p className="font-bold text-gray-800">{userInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-green-50 rounded-xl border-2 border-black transform transition-all duration-200 hover:translate-x-1">
                <div className="bg-green-400 text-white p-2 rounded-lg border-2 border-black mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500">ID</p>
                  <p className="font-bold text-gray-800">{userInfo.id}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleForgotPassword}
                className="bg-blue-400 border-3 border-black text-black font-bold px-4 py-3 rounded-xl hover:bg-blue-500 transition shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-1 active:translate-y-1 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Reset Password
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="bg-green-400 border-3 border-black text-black font-bold px-4 py-3 rounded-xl hover:bg-green-500 transition shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-1 active:translate-y-1 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Profile
              </button>
            </div>

            {/* Message Display */}
            {emailMessage && (
              <div className="mt-6 p-3 bg-blue-100 border-2 border-blue-500 rounded-lg">
                <p className="text-blue-700 font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {emailMessage}
                </p>
              </div>
            )}
            
            {updateMessage && (
              <div className="mt-6 p-3 bg-green-100 border-2 border-green-500 rounded-lg">
                <p className="text-green-700 font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {updateMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div 
            className="bg-white border-4 border-black p-6 rounded-xl w-full max-w-md shadow-[8px_8px_0px_rgba(0,0,0,1)] animate-fadeIn"
            style={{animation: "fadeIn 0.3s ease-out"}}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black">Update Profile</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="bg-red-400 text-white w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-red-500 transition"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-3 border-black rounded-lg bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-black focus:bg-yellow-100 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-3 border-black rounded-lg bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-black focus:bg-yellow-100 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition"
                  />
                </div>
              </div>
              
              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 border-3 border-black px-5 py-2 rounded-lg font-bold hover:bg-gray-400 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-y-1 active:translate-y-1 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-400 border-3 border-black text-black font-bold px-5 py-2 rounded-lg hover:bg-green-500 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-y-1 active:translate-y-1 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;