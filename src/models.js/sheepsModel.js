import pool from "../db.js";

export const getAllSheepHeardsService = async () => {
    const result  = pool.query("SELECT * FROM sheeps");
    return result.rows;
};
export const getSheepHeardByOwnerIDService = async (national_id) => {
    try {
      const ownerCheck = await pool.query('SELECT owner_national_id FROM sheeps WHERE owner_national_id = $1', [national_id]);
      if (ownerCheck && ownerCheck.rows && ownerCheck.rows.length === 0) {
        return { status: 400, message: 'Invalid ownerId: Owner does not exist' };
        
      } else {
        const result = await pool.query("SELECT * FROM sheeps WHERE owner_national_id = $1", [national_id]);
        return result.rows[0];
      }
    } catch (error) {
      console.error("Error in getSheepHeardByOwnerIDService:", error);
      throw error; 
    }
    
};
export const addSheepHeardByOwnerIDService = async (national_id, species, heard_id, heard_count) => {
  const ownerCheck = await pool.query('SELECT 1 FROM sheeps WHERE owner_national_id = $1', [national_id]);

  if (ownerCheck.rows.length > 0) {
    return { success: false, message: 'Record already exists' };
  }

  const result = await pool.query(
    "INSERT INTO sheeps (owner_national_id, species, heard_id, heard_count) VALUES ($1, $2, $3, $4) RETURNING *",
    [national_id, species, heard_id, heard_count]
  );

  return { success: true, data: result.rows[0] };
};

export const updateSheepHeardByOwnerIDService = async (national_id,heard_id, heard_count) => {
    const ownerCheck = pool.query('SELECT owner_national_id FROM sheeps WHERE owner_national_id = $1', [national_id]);
    if(ownerCheck && ownerCheck.rows && ownerCheck.rows.length === 0){
        return res.status(400).json({ message: 'Invalid ownerId: Owner does not exist' }); 
    }else{
        const result  = await pool.query("UPDATE sheeps SET heard_id = $2, heard_count = $3 WHERE owner_national_id = $1 RETURNING *",[national_id,heard_id,heard_count]);
        return result.rows[0];
    }
};
export const deleteSheepHeardByOwnerIDService = async (national_id) => {
    try {
      const ownerCheck = await pool.query('SELECT owner_national_id FROM sheeps WHERE owner_national_id = $1', [national_id]);
      if (ownerCheck && ownerCheck.rows && ownerCheck.rows.length === 0) {
        return { status: 400, message: 'Invalid ownerId: Owner does not exist' };
      } else {
        const result = await pool.query("DELETE FROM sheeps WHERE owner_national_id = $1 RETURNING *", [national_id]);
        return result.rows[0]; 
      }
    } catch (error) {
      console.error("Error deleting sheep:", error);
      throw error; 
    }
  };