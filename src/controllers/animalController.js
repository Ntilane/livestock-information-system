import pool  from "../db.js";
import { addSheepHeardByOwnerIDService, getSheepHeardByOwnerIDService, updateSheepHeardByOwnerIDService } from "../models.js/sheepsModel.js";

const createHeardSheeps = async (req, res) => {
        const {owner_id, species, heard_id, heard_count } = req.body;
        try {
            // check species
            if(!("sheep" || "Sheep").includes(species)){
                return res.status(400).json({message: "Species must be 'sheep'"});
            }

            await addSheepHeardByOwnerIDService(owner_id, species, heard_id, heard_count);


        } catch (error) {
            console.error('Error adding data to database:', error);
            res.status(500).json({ message: 'Failed to add sheeps', error: error.message });
        }
    };

const getHeardSheeps = async (req, res) => {
    
    try {
        if(!req.params.owner_id){
            res.status(400).json({message: 'OwnerId required'})
        }
        const heard = await getSheepHeardByOwnerIDService(req.params.owner_id);
        if(!heard){return res.status(404).json({message: 'No owner associated with the entered id'})}else{
            return res.status(200).json({message: 'Sheeps fetched succesfully', heard: heard})
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to get sheeps', error: error.message });
    }
};

const updateSheepInfoById = async (req, res) => {
    const {species, heardid, heardcount} = req.body;
    try {
        const heard = await updateSheepHeardByOwnerIDService(req.params.id, species, heardid, heardcount);
        if(!heard) return res.status(404).json({message: 'No owner associated with the entered id'})
    } catch (error) {
        res.status(500).json({ message: 'Failed to update sheeps', error: error.message });    
    }
};
export  {createHeardSheeps, getHeardSheeps, updateSheepInfoById};