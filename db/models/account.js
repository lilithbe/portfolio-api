import mongoose from "mongoose";

export const Account_model = new mongoose.Schema({
    userId:{type:String},
    password:{type:String},
    nickName:{type:String},
    userImage:{type:String},
    signType:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date}
})