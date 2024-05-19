import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username :{
        type : String,
        require : true,
        unique : true 
    },
    password :{
        type : String,
        require : true,
        unique : true 
    },
    email :{
        type : String ,
        require : true ,
        unique : true 
    },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
})

export const UserModel  = mongoose.model("User" ,UserSchema);