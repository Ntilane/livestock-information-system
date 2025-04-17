import express from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import createHeardSheeps from "../controllers/animalController.js";

const router = express.Router();

// Goats
router.post("/addsheeps",roleMiddleware(['admin']), createHeardSheeps);
//router.put("/editGoats:id", roleMiddleware(['admin']), animalController);
//router.delete("/deleteGoat:id", roleMiddleware(['admin'], animalController));

// Sheeps
//router.post("/addSheep", roleMiddleware(['admin']), animalController);
//router.put("/editSheeps:id", roleMiddleware(['admin']), animalController);
//router.delete("/deleteSheeps:id", roleMiddleware(['admin'], animalController));


export default router;