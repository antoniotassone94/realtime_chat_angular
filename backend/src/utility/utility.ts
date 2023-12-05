import mongoose from "mongoose";

const validateMongodb = (_id:string) => {
    const isValid:mongoose.Types.ObjectId = new mongoose.Types.ObjectId(_id);
    if(!isValid) throw new Error("This id isn't valid or not found");
}

export default validateMongodb