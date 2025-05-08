import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

    //   localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
