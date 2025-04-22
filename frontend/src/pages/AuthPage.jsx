import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="bg-[#fdfdfd] border-2 border-black p-8 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 border-b-2 border-black pb-2">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <AuthForm isLogin={isLogin} />

        <button
          onClick={toggleForm}
          className="mt-6 text-sm bg-yellow-300 border-2 border-black px-4 py-2 rounded-md block mx-auto hover:bg-yellow-400 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        >
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
