import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLink = () => {
  return (
    <p className="text-center text-sm text-gray-600 mt-4">
      Don’t have an account?{' '}
      <Link to="/register" className="text-blue-600 hover:underline">
        Register here
      </Link>
    </p>
  );
};

export default RegisterLink;
