import {hashSync} from "bcrypt";
import {User,UserSchema} from "../models/user.model";
import {generateJwt,verifyUser} from "./token_manager";

export async function doLogin(email:string,password:string):Promise<string|undefined>{
    const user:UserSchema|false = await verifyUser(email,password);
    if(!user){
        return undefined;
    }
    const token:string = await generateJwt(user);
    return token;
}

export async function doRegister(name:string,surname:string,dateOfBirth:string,email:string,password:string):Promise<UserSchema|null>{
    const dateOfBirth1:Date = new Date(dateOfBirth);
    const passwordHashed:string = hashSync(password,5);
    const user:UserSchema|null = await User.create({
        name:name,
        surname:surname,
        dateOfBirth:dateOfBirth1,
        email:email,
        password:passwordHashed
    });
    if(!user){
        return null;
    }
    return user;
}