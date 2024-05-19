import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '../store/authState';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
  });

  const setAuthState = useSetRecoilState(authState);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password, email } = credentials;
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
        email,
      });
      const { token, userId } = response.data;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('userId', userId);
      setAuthState({
        isAuthenticated: true,
        user: { userId, username },
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200">
            Login
          </button>
        </div>
      </form>
      <p className="text-center mt-4">Don't have an account? <Link to="/register" className="text-blue-500">Register Here</Link></p>
    </div>
  );
};

export default Login;
