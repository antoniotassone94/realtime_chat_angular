import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {auth} from "./auth/auth_routes";
import io from "socket.io";
import {checkJwt} from "./auth/token_manager";
import {JwtPayload} from "jsonwebtoken";
import {Message,MessageSchema} from "./models/message.model";
import {User,UserSchema} from "./models/user.model";

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

    socket.on("extract",async (message) => {
        const details:any = JSON.parse(message);
        const token:string = details.token;
        const payload:JwtPayload|undefined = checkJwt(token);
        if(!payload){
            socket.emit("exception",JSON.stringify({message:"Token not valid.",code:401,check:false}));
        }else{
            const email:string = payload.email;
            const listmessages:MessageSchema[]|null = await Message.find({sender:email});
            if(listmessages === null){
                socket.emit("exception",JSON.stringify({message:"Internal server error.",code:500,check:false}));
            }else{
                socket.emit("systemResponse",JSON.stringify(listmessages));
            }
        }

    });

    socket.on("send",async (message) => {
        const details:any = JSON.parse(message);
        const text:string = details._text;
        const token:string = details._sender;
        const date:Date = new Date(details._date);
        const payload:JwtPayload|undefined = checkJwt(token);
        if(!payload){
            socket.emit("exception",JSON.stringify({message:"Token not valid.",code:401,check:false}));
        }else{
            const email:string = payload.email;
            const user:UserSchema|null = await User.findOne({email:email});
            if(user === null){
                socket.emit("exception",JSON.stringify({message:"Internal server error.",code:500,check:false}));
            }else{
                const message:MessageSchema|null = await Message.create({
                    text:text,
                    sender:user.email,
                    date:date
                });
                if(message === null){
                    socket.emit("exception",JSON.stringify({message:"Internal server error.",code:500,check:false}));
                }else{
                    socket.broadcast.emit("receiveClients",JSON.stringify(message));
                }
            }
        }
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