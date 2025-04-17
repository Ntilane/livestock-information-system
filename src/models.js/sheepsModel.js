import pool from "../db.js";

export const getAllSheepHeardsService = async () => {
    const result  = pool.query("SELECT * FROM sheeps");
    return result.rows;
};
export const getSheepHeardByOwnerIDService = async (ownerId) => {
    const ownerCheck = pool.query('SELECT ownerId FROM farmers WHERE ownerId = $1', [ownerId]);
    if(ownerCheck.rows.length === 0){
        return res.status(400).json({ message: 'Invalid ownerId: Owner does not exist' }); 
    }else{
        const result  = pool.query("SELECT * FROM sheeps WHERE ownerId = $1",[ownerId]);
        return result.rows[0];
    }
    
};
export const addSheepHeardByOwnerIDService = async (id, species, heardid, heardcount) => {
    const ownerCheck = pool.query('SELECT id FROM sheeps WHERE id = $1', [id]);
        if(ownerCheck && ownerCheck.rows && ownerCheck.rows.length === 0){
            return res.status(400).json({ message: 'Invalid ownerId: Owner does not exist' }); 
        }else{
            const result = await pool.query("INSERT INTO sheeps (id, species, heardid, heardcount) VALUES ($1, $2, $3, $4) RETURNING *",[id, species, heardid, heardcount]);
            return result.rows[0];
        }
};
export const updateSheepHeardByOwnerIDService = async (ownerId, heardCount) => {
    const ownerCheck = pool.query('SELECT ownerId FROM farmers WHERE ownerId = $1', [ownerId]);
    if(ownerCheck.rows.length === 0){
        return res.status(400).json({ message: 'Invalid ownerId: Owner does not exist' }); 
    }else{
        const result  = await pool.query("UPDATE sheeps SET heardCount = $1 WHERE ownerId = $3 RETURNING *",[heardCount, ownerId]);
        return result.rows[0];
    }
};
export const deleteSheepHeardByOwnerIDService = async (ownerId) => {
    const ownerCheck = pool.query('SELECT ownerId FROM farmers WHERE ownerId = $1', [ownerId]);
    if(ownerCheck.rows.length === 0){
        return res.status(400).json({ message: 'Invalid ownerId: Owner does not exist' }); 
    }else{
        const result = await pool.query("DELETE FROM sheeps WHERE ownerId  = $1 RETURNING *",[ownerId]);
        return result.rows[0];
    }
};