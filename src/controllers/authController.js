import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const HASH_SALT_ROUNDS = 10;

const register = async (req, res) => {
  const { username, password, national_id } = req.body;

  if (!username || !password || !national_id) {
    return res.status(400).json({ message: 'Username, password, and national ID are required.' });
  }

  try {
    const usernameCheck = await pool.query('SELECT * FROM farmers WHERE username = $1', [username]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const idCheck = await pool.query('SELECT * FROM farmers WHERE national_id = $1', [national_id]);
    if (idCheck.rows.length > 0) {
      return res.status(400).json({ message: 'National ID already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

    const insertResult = await pool.query(
      'INSERT INTO farmers (username, password, role, national_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, 'user', national_id] // role is always 'user'
    );

    const newUser = insertResult.rows[0];
    res.status(201).json({ message: 'User registered successfully.', user: newUser });

  } catch (error) {
    console.error("Registration Error", error);
    res.status(500).json({ message: 'Something went wrong during registration.' });
  }
};



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
            { userId: user.national_id, username: user.username, role: user.role },
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
