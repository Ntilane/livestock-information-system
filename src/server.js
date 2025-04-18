import express from "express";
import { port } from "./config/env.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import animalsRoutes from "./routes/animalsRoutes.js";
import {createSheepsTable} from "./data/createAnimalsTables.js";



const app = express()
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/animals", animalsRoutes);

//createTable
createSheepsTable();
//Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)

//Get the directory name from the file path
const __dirname = dirname(__filename)

//Serve all files from the public directory as static files
app.use(express.static(path.join(__dirname,'../public')))
//Serving the html file from the public directory
app.get('/',(res) =>{
    res.sendFile(path.join(__dirname,'publuc','index.html'))
})

app.listen(port, () => console.log('Server has started on: ' + port ))