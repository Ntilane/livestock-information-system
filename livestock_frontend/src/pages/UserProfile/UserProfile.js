import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const UserProfile = () => {
  const [herds, setHerds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHerds = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(atob(token.split('.')[1])); // Decoding token for user id
        const res = await axios.get(`http://127.0.0.1:8000/api/animals/getSheeps/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHerds(res.data);
      } catch (err) {
        setError('Failed to load your livestock information.');
      }
    };

    fetchHerds();
  }, []);

  return (
    <div className="profile-container">
      <h2>Your Herds</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {herds.map((herd) => (
          <li key={herd.herd_id}>
            <strong>Species:</strong> {herd.species} <br />
            <strong>Herd Count:</strong> {herd.herd_count} <br />
            <strong>Herd ID:</strong> {herd.herd_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
