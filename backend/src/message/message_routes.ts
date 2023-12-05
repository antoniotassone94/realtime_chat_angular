import express,{Router} from "express";
import {sendMessage} from "./message_functions";
import {MessageSchema} from "../models/message.model";

const message: Router = express.Router();

message.post("/send", async (req, res) => {
    const {text,token} = req.body;
    const result:MessageSchema|undefined = await sendMessage(text);
    if(!result){
        return res.status(500).send({message:"Internal server error.",check:false});
    }
    return res.status(200).send({message:"Login done successfully.",check:true});
})

export {message}