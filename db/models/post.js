import mongoose ,{Schema} from "mongoose";
export const Comment_model = new mongoose.Schema({
    targetId:{type:String},
    commentType:{type:String},
    userId:{type:String},
    content:{type:String},
    good:{type:Number},
    createdAt:{type:Date},
    updatedAt:{type:Date}
})
export const Post_model = new mongoose.Schema({
    thumbnail: [Schema.Types.Mixed],
    subject:{type:String},
    content:{type:String},
    userId:{type:String},
    nickName:{type:String},
    userImage:{type:String},
    category:{type:String,},
    stacks: [Schema.Types.Mixed],
    tag: [Schema.Types.Mixed],
    good:{type:Number,default:0},
    hit:{type:Number,default:0},
    createdAt:{type:Date},
    updatedAt:{type:Date}
})