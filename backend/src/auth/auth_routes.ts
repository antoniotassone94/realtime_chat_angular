import express,{Router} from "express";
import {doLogin,doRegister} from "./auth_functions";
import {User, UserSchema} from "../models/user.model";
import {JwtPayload} from "jsonwebtoken";
import {checkJwt} from "./token_manager";

const auth: Router = express.Router();

auth.post("/login", async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof email !== "string" || typeof password !== "string"){
        return res.status(400).send({message:"Bad request, type of some fields is incorrect.",check:false});
    }
    if(email === "" || password === ""){
        return res.status(400).send({message:"Bad request, some fields are empty.",check:false});
    }
    const result:string|undefined = await doLogin(email,password);
    if(!result){
        return res.status(401).send({message:"Unauthorized.",check:false});
    }
    return res.status(200).send({token:result,message:"Login done successfully.",check:true});
})

auth.post("/register", async (req, res) => {
    const {name,surname,dateOfBirth,email,password} = req.body;
    if(!name || !surname || !dateOfBirth || !email || !password){
        return res.status(406).send({message:"Missing required fields.",check:false});
    }
    if(typeof name !== "string" || typeof surname !== "string" || typeof dateOfBirth !== "string" || typeof email !== "string" || typeof password !== "string"){
        return res.status(400).send({message:"Bad request, type of some fields is incorrect.",check:false});
    }
    if(name === "" || surname === "" || dateOfBirth === "" || email === "" || password === ""){
        return res.status(400).send({message:"Bad request, some fields are empty.",check:false});
    }
    const result:UserSchema|null = await doRegister(name,surname,dateOfBirth,email,password);
    if(!result){
        return res.status(500).send({message:"Internal server error.",check:false});
    }
    return res.status(201).send({message:"Registration done successfully.",check:true});
})

auth.post("/getemail", async (req, res) => {
    const {token} = req.body;
    const payload:JwtPayload|undefined = checkJwt(token);
    if(!payload){
        return res.status(401).send({message:"Token not valid.",check:false});
    }
    const email:string = payload.email;
    return res.status(200).send({message:email,check:false});
})

export {auth}