import express,{Router} from "express";
import {doLogin,doRegister} from "./auth_functions";
import {UserSchema} from "../models/user.model";

const auth: Router = express.Router();

auth.post("/login", async (req, res) => {
    const {email,password} = req.body;
    const result:string|undefined = await doLogin(email,password);
    if(!result){
        return res.status(401).send({message:"Unauthorized.",check:false});
    }
    return res.status(200).send({token:result,message:"Login done successfully.",check:true});
})

auth.post("/register", async (req, res) => {
    const {name,surname,dateOfBirth,email,password} = req.body;
    const result:UserSchema|null = await doRegister(name,surname,dateOfBirth,email,password);
    if(!result){
        return res.status(500).send({message:"Internal server error.",check:false});
    }
    return res.status(200).send({message:"Registration done successfully.",check:true});
})

export {auth}