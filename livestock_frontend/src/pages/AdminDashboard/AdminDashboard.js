import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="card-grid">
        <div className="card" onClick={() => navigate('/register')}>
          Register New User
        </div>
        <div className="card" onClick={() => navigate('/manage-herds')}>
          Manage Herds
        </div>
        <div className="card" onClick={() => navigate('/users')}>
          View Users
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
