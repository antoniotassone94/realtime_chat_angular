import {Date,Schema,model} from "mongoose";

const userModel = new Schema<UserSchema>({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    dateOfBirth:{type:Date,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

export interface UserSchema{
    save(): UserSchema|PromiseLike<UserSchema|null> | null
    name:String
    surname:String
    dateOfBirth:Date
    email:String
    password:String
}

export const User = model<UserSchema>("user",userModel)