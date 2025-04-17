import pool  from "../db.js";
import { addSheepHeardByOwnerIDService } from "../models.js/sheepsModel.js";

const createHeardSheeps = async (req, res) => {
        const {id, species, heardid, heardcount } = req.body;
        try {
            // Input validation: Required fields
            if (!id || !heardid || !species || !heardcount) {
                return res.status(400).json({ message: 'ownerId, herdid, species, heardcount are required' });
            }
            // check species
            if(!("sheep" || "Sheep").includes(species)){
                return res.status(400).json({message: "Species must be 'sheep'"});
            }

            await addSheepHeardByOwnerIDService(id, species, heardid, heardcount);


        } catch (error) {
            console.error('Error adding data to database:', error);
              res.status(500).json({ message: 'Failed to add sheeps', error: error.message });
        }
    };

export default createHeardSheeps;