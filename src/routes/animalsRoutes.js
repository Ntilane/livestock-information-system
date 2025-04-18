import express from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {createHeardSheeps,getHeardSheeps, updateSheepInfoById} from "../controllers/animalController.js";

const router = express.Router();

// Goats
router.post("/addsheeps", createHeardSheeps);
router.get("/getSheeps/:owner_id", getHeardSheeps);

router.put("/updateSheeps:id", updateSheepInfoById);
//router.delete("/deleteGoat:id", roleMiddleware(['admin'], animalController));

// Sheeps
//router.post("/addSheep", roleMiddleware(['admin']), animalController);
//router.put("/editSheeps:id", roleMiddleware(['admin']), animalController);
//router.delete("/deleteSheeps:id", roleMiddleware(['admin'], animalController));


export default router;