import pool from "../db.js";
const createSheepsTable  = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS sheeps(
    owner_id INTEGER UNIQUE PRIMARY KEY,
    species VARCHAR NOT NULL,
    heard_id TEXT NOT NULL,
    heard_count INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)
    `
    try {
        pool.query(queryText);
        console.log("Sheeps table created")
    } catch (error) {
        console.log("Error creating sheeps table")
    }
}

export {createSheepsTable};
