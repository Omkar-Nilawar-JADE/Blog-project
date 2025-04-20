import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const UserProfile = () => {
  const { userInfo, isLoggedIn, sendPasswordResetEmail } = useContext(StoreContext);
  const [emailMessage, setEmailMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Auth");
    }
  }, [isLoggedIn]);

  const handleForgotPassword = async () => {
    const email = prompt("Enter your email for password reset:");
    if (email) {
      const res = await sendPasswordResetEmail(email);
      setEmailMessage(res.message);
    }
  };

  if (!userInfo) return <div className="p-4">Loading user info...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-md border border-black">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <div className="space-y-2 text-black">
        <p><strong>ID:</strong> {userInfo.id}</p>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={handleForgotPassword}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Forgot Password
        </button>
        {emailMessage && <p className="text-sm text-center">{emailMessage}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
