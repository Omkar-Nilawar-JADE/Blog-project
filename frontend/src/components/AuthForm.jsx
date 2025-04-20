import React, { useState, useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

const AuthForm = ({ isLogin }) => {
  const { loginUser, registerUser, sendPasswordResetEmail } = useContext(StoreContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await loginUser(username, password);
    } else {
      await registerUser(username, password, email);
    }

    setUsername('');
    setPassword('');
    setEmail('');
  };

  const handleForgotPassword = async () => {
    const userEmail = prompt("Enter your email for password reset:");
    if (userEmail) {
      const res = await sendPasswordResetEmail(userEmail);
      setEmailMessage(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      )}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        required
      />

      {/* Forgot Password Link (only in Login mode) */}
      {isLogin && (
        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
          {emailMessage && (
            <p className="text-sm text-green-600 text-center mt-1">{emailMessage}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
