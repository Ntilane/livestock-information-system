import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const HASH_SALT_ROUNDS = 10;

const register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Use pool.query() to check for an existing user
    const result = await pool.query('SELECT * FROM farmers WHERE username = $1', [username]);
    const existingUser = result.rows[0]; // Access the first row of the result

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

    // Use pool.query() to insert the new user
    const insertResult = await pool.query(
      'INSERT INTO farmers (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role]
    );

    const newUser = insertResult.rows[0];
    res.status(201).json({ message: 'User registered', user: newUser });

  } catch (error) {
    console.error("Registration Error", error);
    res.status(500).json({ message: 'Something went wrong...' });
  }
};

// ... (your login function - ensure it uses result.rows[0] as well)

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const result = await pool.query('SELECT * FROM farmers WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error("Login Error", error);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

export { register, login };
