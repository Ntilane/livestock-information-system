import { addSheepHeardByOwnerIDService, deleteSheepHeardByOwnerIDService, getSheepHeardByOwnerIDService, updateSheepHeardByOwnerIDService } from "../models.js/sheepsModel.js";

const createHeardSheeps = async (req, res) => {
    const { national_id, species, heard_id, heard_count } = req.body;
  
    try {
      if (species.toLowerCase() !== "sheep") {
        return res.status(400).json({ message: "Species must be 'sheep'" });
      }
  
      const result = await addSheepHeardByOwnerIDService(national_id, species, heard_id, heard_count);
  
      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }
  
      return res.status(201).json({ message: "Sheep added successfully", data: result.data });
    } catch (error) {
      console.error("Error adding data to database:", error);
      res.status(500).json({ message: "Failed to add sheeps", error: error.message });
    }
  };  

const getHeardSheeps = async (req, res) => {
    
    try {
        if(!req.params.national_id){
            res.status(400).json({message: 'OwnerId required'})
        }
        const heard = await getSheepHeardByOwnerIDService(req.params.national_id);
        if(!heard){return res.status(404).json({message: 'No owner associated with the entered id'})}else{
            return res.status(200).json({message: 'Sheeps fetched succesfully', heard: heard})
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to get sheeps', error: error.message });
    }
};

const updateSheepInfoById = async (req, res) => {
    const {heard_id, heard_count} = req.body;
    try {
        const heard = await updateSheepHeardByOwnerIDService(req.params.national_id, heard_id, heard_count);
        if(!heard){return res.status(404).json({message: 'No owner associated with the entered id'})}else{
            return res.status(200).json({message: 'Herd updated successfully...', heard: heard})
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update sheeps', error: error.message });    
    }
};
const deleteSheepInfoById = async (req, res) => {
    try {
      const deletedSheep = await deleteSheepHeardByOwnerIDService(req.params.national_id); // Await the service function
  
      if (deletedSheep?.status === 400) {
        return res.status(400).json({ message: 'Invalid ownerId: Owner does not exist' });
      }
  
      if (deletedSheep) {
        return res.status(200).json({
          message: `Herd associated with owner_id ${req.params.national_id} deleted`,
          deletedSheep: deletedSheep, // Send back the deleted sheep data
        });
      } else {
         return res.status(404).json({ message: `Herd associated with owner_id ${req.params.national_id} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete sheeps', error: error.message });
    }
  };
export  {createHeardSheeps, getHeardSheeps, updateSheepInfoById, deleteSheepInfoById};