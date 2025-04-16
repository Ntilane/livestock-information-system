import dotenv from 'dotenv';
import pkg from 'pg';

const {Pool} = pkg;

dotenv.config(); // Load environment variables from .env file 

const pool = new Pool({
  user: process.env.DB_USER,     
  host: '127.0.0.1',
  database: process.env.DB_NAME, 
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, 
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000, // Time to wait for a connection
});

// Add event listeners for debugging
pool.on('connect', () => {
  console.log('Database connected');
});

pool.on('error', (err) => {
  console.error('Error with database connection:', err);
});

export default pool;
