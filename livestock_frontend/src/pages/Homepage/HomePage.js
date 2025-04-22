import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';


const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Our Website</h1>
        <p>Manage your animals and farmer information efficiently.</p>
      </header>
      <main>
        <section>
          <h2>Get Started</h2>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
          <p>
            New here? <Link to="/register">Sign Up</Link>
          </p>
        </section>
        <section>
          <h2>Key Features</h2>
          <ul>
            <li>Easily register farmers and animals.</li>
            <li>Generate reports.</li>
            <li>Manage user accounts.</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Our Website</p>
      </footer>
    </div>
  );
};

export default HomePage;
