import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {auth} from "./auth/auth_routes";
import io from "socket.io";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

const ioserver = new io.Server(3000,{
    cors:{
        origin:"*"
    }
});

ioserver.on("connection",(socket) => {
    console.log("New client has connected correctly.");
    socket.on("send",(message) => {
        socket.emit("receiveSystem","The system has received the message correctly.");
        socket.broadcast.emit("receiveClients",message);
    })
})

server.use("/auth",auth);

server.get("/",(req,res) => {
    res.send("Hello world!");
});

const PORT_APPLICATION = 4000;

mongoose.set("strictQuery",true);
mongoose.connect(<string>process.env.DB_CONN_STRING)
.then(() => {
    server.listen(PORT_APPLICATION,() => {
        console.log(`Server application is running on the port ${PORT_APPLICATION} 🚀`)
    });
})
.catch(error => console.error(error))