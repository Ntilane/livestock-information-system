import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/roleMiddleware.js";

const router = express.Router();

//Only admin can eccess this route
router.get("/admin", verifyToken, authorizeRole("admin"), (req,res) => {
    res.json({message: "Welcome admin"});
})

//Only users can acces this route
router.get("/user", verifyToken, authorizeRole("admin", "user"), (req,res) => {
    res.json({message: "Welcome user"});
})

export default router;