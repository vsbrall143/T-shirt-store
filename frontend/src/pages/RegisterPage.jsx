import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
