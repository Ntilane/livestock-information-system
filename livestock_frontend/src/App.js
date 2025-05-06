import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import HomePage from './pages/Homepage/HomePage';
import UserProfile from './pages/UserProfile/UserProfile';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AddSheepForm from './pages/Admin/AddSheepForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/addSheeps" element={<AddSheepForm />} />
      </Routes>
    </Router>
  );
}

export default App;
