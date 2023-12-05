import dotenv from "dotenv";
import jwt,{JwtPayload} from "jsonwebtoken";
import {User,UserSchema} from "../models/user.model";
import {compareSync} from "bcrypt";

dotenv.config();

export interface JwtKeyInterface{
    privateKey: string;
    publicKey: string;
}

function getExpirationTime(minutes:number):number{
    const now: number = Math.trunc(new Date().getTime() / 1000);
    return now + (minutes * 60);
}

export async function verifyUser(email:string,password:string):Promise<UserSchema|false>{
    const user:UserSchema|null = await User.findOne({email:email});
    if(!user){
        return false;
    }
    if(!compareSync(password,<string>user.password)){
        return false;
    }
    return user;
}

export function checkJwt(accessToken:string):JwtPayload|null{
    try{
        const payload:string|JwtPayload = jwt.verify(accessToken,<string>process.env.JWT_PRIVATE);
        if(!payload){
            return null;
        }
        if(typeof payload === "string"){
            return null;
        }
        return <JwtPayload>payload;
    }catch(error){
        return null;
    }
}

async function getToken(user:UserSchema):Promise<string>{
    const payload = {
        aud: "access",
        exp: getExpirationTime(60),
        sub: user.email,
        email: user.email
    }
    const accessToken:string = jwt.sign(payload,<string>process.env.JWT_PRIVATE,{algorithm:"HS256"});
    return accessToken;
}

export async function generateJwt(user:UserSchema):Promise<string>{
    const token:string = await getToken(user);
    return token;
}