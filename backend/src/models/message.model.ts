import {Date,Schema,model} from "mongoose";

const messageModel = new Schema<MessageSchema>({
    text:{type:String,required:true},
    sender:{type:String,required:true},
    date:{type:Date,required:true}
})

export interface MessageSchema{
    save(): MessageSchema|PromiseLike<MessageSchema|null> | null
    text:String
    sender:String
    date:Date
}

export const Message = model<MessageSchema>("message",messageModel)