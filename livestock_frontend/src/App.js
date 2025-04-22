import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login.js';  //  Adjust the path if needed
import Register from './pages/Register/Register.js'; // Adjust the path
import HomePage from './pages/Homepage/HomePage.js';
//import AnimalList from './components/AnimalList'; // Adjust path
//import FarmerList from './components/FarmerList';
//import ReportList from './components/ReportList'


const App = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
        // Check local storage for a token on initial load
        const token = localStorage.getItem('token');
        if (token) {
            //  Redirect to profile or admin,  adjust as necessary
            //  You'd likely want to decode the token here to get the user's role
            //  and redirect accordingly.  For simplicity, I'm just redirecting to profile
             navigate('/profile');
        }
    }, [navigate]);

  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Define routes for your other components */}
        {/* <Route path="/animals" element={<AnimalList />} /> */}
        {/* <Route path="/farmers" element={<FarmerList />} /> */}
         {/*<Route path="/reports" element={<ReportList />} /> */}
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/admin" element={<div>Admin Page</div>} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    
  );
};

export default App;
