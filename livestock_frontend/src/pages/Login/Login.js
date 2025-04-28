import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import { jwtDecode } from "jwt-decode";



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        username,
        password,
      });
  
      console.log('Login successful!', response.data);
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
  
        // Decode token to get the user role
        const decoded = jwtDecode(response.data.token);
        
        if (decoded.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      }
  
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during login.');
      }
      console.error('Login error:', err);
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
