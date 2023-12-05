import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {auth} from "./auth/auth_routes";
import {message} from "./message/message_routes";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use("/auth",auth);
server.use("/message",message);

server.get("/",(req,res) => {
    res.send("Hello world!");
});

const PORT = 4000;

mongoose.set("strictQuery",true);
mongoose.connect(<string>process.env.DB_CONN_STRING)
.then(() => {
    server.listen(PORT,() => {
        console.log(`server is running on the port ${PORT} 🚀`)
    });
})
.catch(error => console.error(error))