import express from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {createHeardSheeps,getHeardSheeps, updateSheepInfoById, deleteSheepInfoById} from "../controllers/animalController.js";

const router = express.Router();

// Goats
router.post("/addsheeps", createHeardSheeps);
router.get("/getSheeps/:national_id", getHeardSheeps);
router.put("/updateSheeps/:national_id", updateSheepInfoById);
router.delete("/deleteSheeps/:id", deleteSheepInfoById);

// Sheeps
//router.post("/addSheep", roleMiddleware(['admin']), animalController);
//router.put("/editSheeps:id", roleMiddleware(['admin']), animalController);
//router.delete("/deleteSheeps:id", roleMiddleware(['admin'], animalController));


export default router;