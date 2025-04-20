// ResetPassword.jsx
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ResetPassword = () => {
  const { resetUserPassword, logoutUser } = useContext(StoreContext);
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    const res = await resetUserPassword(uid, token, password);
    setMessage(res.message);

    if (res.success) {
      // Cleanup tokens and user state
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      // just to logout the user
      setTimeout(() => {
        logoutUser();
      }, 2000);

    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleReset}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Reset Password
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default ResetPassword;
