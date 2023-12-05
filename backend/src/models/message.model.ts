import {Schema,model} from "mongoose";

const messageModel = new Schema<MessageSchema>({
    text:{type:String,required:true}
})

export interface MessageSchema{
    save(): MessageSchema|PromiseLike<MessageSchema|null> | null
    text:String
}

export const Message = model<MessageSchema>("message",messageModel)