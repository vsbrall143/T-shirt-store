import React from 'react';
import LoginForm from '../components/LoginForm';
 

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <LoginForm />
 
      </div>
    </div>
  );
};

export default LoginPage;
