import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [livestock, setLivestock] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const decoded = jwtDecode(token);
      console.log("Decoded user ID:", decoded.userId); // debug
      setUser(decoded);

      try {
        const res = await fetch(`http://localhost:8000/api/animals/getSheeps/${decoded.userId}`);
        const data = await res.json();
        setLivestock(data.heard ? [data.heard] : []);
        console.log("Livestock fetch response:", data); // debug

      } catch (error) {
        console.error("Error fetching livestock", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {user && (
        <div className="profile-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>ID:</strong> {user.userId}</p>
        </div>
      )}

      <h3>Your Registered Livestock</h3>
      {livestock.length === 0 ? (
        <p>No livestock records found.</p>
      ) : (
        <table className="livestock-table">
          <thead>
            <tr>
              <th>ID ea {user.username}</th>
              <th>Letsoao</th>
              <th>Mofuta oa Phoofolo</th>
              <th>Palo</th>
            
            </tr>
          </thead>

          <tbody>
            {livestock.map((sheep) => (
              <tr key={sheep.sheep_id}>
                <td>{sheep.owner_national_id}</td>
                <td>{sheep.heard_id}</td>
                <td>{sheep.species}</td>
                <td>{sheep.heard_count}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
};

export default UserProfile;
