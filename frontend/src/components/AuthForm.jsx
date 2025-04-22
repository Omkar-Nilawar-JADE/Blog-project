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
          className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white placeholder-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          required
        />
      )}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white placeholder-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white placeholder-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        required
      />

      {isLogin && (
        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-700 underline hover:text-blue-900 cursor-pointer"
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
        className="w-full bg-black text-white py-2 rounded-lg text-lg font-bold hover:bg-gray-800 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
