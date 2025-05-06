import pool from "../db.js";

const createTables = async () => {
  const createFarmersTable = `
    CREATE TABLE IF NOT EXISTS farmers (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      national_id VARCHAR(50) NOT NULL UNIQUE,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const createSheepsTable = `
    CREATE TABLE IF NOT EXISTS sheeps (
      sheep_id SERIAL PRIMARY KEY,
      species VARCHAR(100) NOT NULL,
      heard_id TEXT NOT NULL,
      heard_count INTEGER NOT NULL,
      owner_national_id VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(createFarmersTable);
    console.log("✅ Farmers table created.");

    await pool.query(createSheepsTable);
    console.log("✅ Sheeps table created.");
  } catch (error) {
    console.error("❌ Error creating tables:", error.message);
  }
};

export { createTables };
