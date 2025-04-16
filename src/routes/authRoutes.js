import express from "express";
import { register, login} from "../controllers/authController.js";

const router = express.Router();

router.post('/testpost', (req, res) => {
    console.log('Received POST request to /testpost');
    console.log('Request body:', req.body); // Log the body
    res.json({ message: 'POST request received', data: req.body });
});

router.post("/register", register);

router.post("/login", login);

export default router;