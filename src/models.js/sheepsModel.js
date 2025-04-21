import pool from "../db.js";

export const getAllSheepHeardsService = async () => {
    const result  = pool.query("SELECT * FROM sheeps");
    return result.rows;
};
export const getSheepHeardByOwnerIDService = async (owner_id) => {
    try {
      const ownerCheck = await pool.query('SELECT owner_id FROM sheeps WHERE owner_id = $1', [owner_id]);
      if (ownerCheck && ownerCheck.rows && ownerCheck.rows.length === 0) {
        return { status: 400, message: 'Invalid ownerId: Owner does not exist' };
        // Return here to avoid the next query
      } else {
        const result = await pool.query("SELECT * FROM sheeps WHERE owner_id = $1", [owner_id]);
        return result.rows[0];
      }
    } catch (error) {
      console.error("Error in getSheepHeardByOwnerIDService:", error);
      throw error; // Re-throw the error for the controller to handle
    }
    
};
export const addSheepHeardByOwnerIDService = async (owner_id, species, heard_id, heard_count) => {
    const ownerCheck = pool.query('SELECT owner_id FROM sheeps WHERE owner_id = $1', [owner_id]);
        if(ownerCheck && ownerCheck.rows && ownerCheck.rows.length === 0){
            return res.status(400).json({ message: 'Invalid ownerId: Owner does not exist' }); 
        }else{
            const result = await pool.query("INSERT INTO sheeps (owner_id, species, heard_id, heard_count) VALUES ($1, $2, $3, $4) RETURNING *",[owner_id, species, heard_id, heard_count]);
            return result.rows[0];
        }
};
export const updateSheepHeardByOwnerIDService = async (owner_id,heard_id, heard_count) => {
    const ownerCheck = pool.query('SELECT owner_id FROM sheeps WHERE owner_id = $1', [owner_id]);
    if(ownerCheck && ownerCheck.rows && ownerCheck.rows.length === 0){
        return res.status(400).json({ message: 'Invalid ownerId: Owner does not exist' }); 
    }else{
        const result  = await pool.query("UPDATE sheeps SET heard_id = $2, heard_count = $3 WHERE owner_id = $1 RETURNING *",[owner_id,heard_id,heard_count]);
        return result.rows[0];
    }
};
export const deleteSheepHeardByOwnerIDService = async (owner_id) => {
    try {
      const ownerCheck = await pool.query('SELECT owner_id FROM sheeps WHERE owner_id = $1', [owner_id]);
      if (ownerCheck && ownerCheck.rows && ownerCheck.rows.length === 0) {
        return { status: 400, message: 'Invalid ownerId: Owner does not exist' };
      } else {
        const result = await pool.query("DELETE FROM sheeps WHERE owner_id = $1 RETURNING *", [owner_id]);
        return result.rows[0]; // Return the deleted row
      }
    } catch (error) {
      console.error("Error deleting sheep:", error);
      throw error; // Re-throw the error for the controller to handle
    }
  };