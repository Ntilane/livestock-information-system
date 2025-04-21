CREATE TABLE IF NOT EXISTS sheeps(
    owner_id INTEGER UNIQUE PRIMARY KEY,
    species VARCHAR NOT NULL,
    heard_id TEXT NOT NULL,
    heard_count INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)