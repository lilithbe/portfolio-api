import mongoose from "mongoose";
import { Account_model } from "./models/account";
import { Post_model } from "./models/post";
import env from 'dotenv'
env.config()
const mongodbUrl= process.env.MONGODB
const getModel=(modelName)=>{
    switch (modelName) {
        case 'account':
            return Account_model
        case 'post':
            return Post_model
        default:
            break;
    }
}

export const model=(modelName)=>{
    return mongoose.model(modelName,getModel(modelName))
}

export const connectDB=async()=>{
    try {
        const con= await mongoose.connect(mongodbUrl,{
            useNewUrlParser:true,
            autoIndex:true
        })
        console.log(`MongoDB connected : ${con.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error}`)
        process.exit(1)
    }
}