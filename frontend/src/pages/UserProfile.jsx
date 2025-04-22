import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const UserProfile = () => {
  const { userInfo, isLoggedIn, sendPasswordResetEmail } = useContext(StoreContext);
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
  }, [isLoggedIn]);

  const handleForgotPassword = async () => {
    const email = prompt("Enter your email for password reset:");
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
    } catch (err) {
      console.error(err);
      setUpdateMessage("Error updating profile.");
    }
  };

  if (!userInfo) return <div className="p-4">Loading user info...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-6 bg-yellow-100 border-4 border-black rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-bold mb-6 text-center underline decoration-black">User Profile</h2>
      <div className="space-y-3 text-black text-lg">
        <p><strong>ID:</strong> {userInfo.id}</p>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-4">
        <button
          onClick={handleForgotPassword}
          className="bg-blue-400 border-2 border-black text-black font-bold px-4 py-2 hover:bg-blue-500 transition shadow-[3px_3px_0px_rgba(0,0,0,1)]"
        >
          Forgot Password
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-400 border-2 border-black text-black font-bold px-4 py-2 hover:bg-green-500 transition shadow-[3px_3px_0px_rgba(0,0,0,1)]"
        >
          Update Profile
        </button>
      </div>

      {emailMessage && (
        <p className="text-sm text-center mt-3 text-blue-700 font-semibold">{emailMessage}</p>
      )}
      {updateMessage && (
        <p className="text-sm text-center mt-3 text-green-700 font-semibold">{updateMessage}</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white border-4 border-black p-6 rounded-xl w-full max-w-md shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-extrabold mb-4 text-center">Update Profile</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2 border-2 border-black rounded-sm bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-black rounded-sm bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-400 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-400 border-2 border-black text-black font-bold px-4 py-2 hover:bg-green-500 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  Save
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
