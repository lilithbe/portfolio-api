import express from 'express'
import { model } from '../db'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const route=express.Router()
const tokenTime = 3000;
route.post('/signup',(req,res)=>signUp(req,res))
route.post('/signin',(req,res)=>signIn(req,res))
route.post('/set-profile',(req,res)=>setProfile(req,res))
route.post('/get-profile',(req,res)=>getProfile(req,res))
route.post('/id-check',(req,res)=>idCheck(req,res))
route.post('/token-check',(req,res)=>tokenCheck(req,res))
module.exports = route
const tokenCheck=async(req,res)=>{
   
    try {
        const userData = jwt.verify(req.headers.authorization, process.env.SECRET_KEY) //토큰검증및 유저정보       
        res.status(200).json({status:true,userData})
    } catch (error) {
        res.status(200).json({status:false})
    }
   
}

const idCheck=async(req,res)=>{
    await model('account').findOne(req.body).then((user)=>{
        if(user){
            res.status(200).json({status:false})
        }else{
            res.status(200).json({status:true})
        } 
    })
}
const signUp=async(req,res)=>{
    try {
        if(req.body.confirmPassword === req.body.password){
            await model('account').findOne({userId:req.body.userId}).then((user)=>{
                if(user){
                    res.status(200).json({status:false,message:'아이디가 동일한 계정이 있습니다.'})
                }else{
                    bcrypt.hash(req.body.password, 10, async(err, hash) => {
                        const userData={...req.body,password:hash,createdAt:new Date(),updatedAt:new Date()}
                        await model('account').create(userData).then(async(data)=>{
                            const getData = {...data._doc,
                            }
                            delete getData.password
                            console.log(getData)
                            let token = jwt.sign(
                                {
                                    ...getData,
                                    exp: Math.floor(Date.now()/1000) + tokenTime,
                                    iat: Math.floor(Date.now()/1000),
                                },
                                process.env.SECRET_KEY
                            );
                            res.status(200).json({...getData,token:token,status:true})
                        })
                    })
                } 
            })
        }else{
            res.status(200).json({message:'비밀번호가 틀립니다.',status:false})
        }
       
    } catch (error) {
        res.status(200).json({error,status:false})
    }
   
}

const signIn=async(req,res)=>{
    await model('account').findOne(req.body).then((data)=>{
        res.status(200).json({data,status:true})
    })
}

const setProfile=async(req,res)=>{
    await model('account').updateOne({...req.body,updatedAt:new Date()}).then((data)=>{
        res.status(200).json({data,status:true})
    })
}

const getProfile=async(req,res)=>{
    await model('account').findOne(req.body).then((data)=>{
        res.status(200).json({data,status:true})
    })
}