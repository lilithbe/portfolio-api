import express from 'express'
import { model } from '../db'
import jwt from "jsonwebtoken";
const route=express.Router()
route.get('/test',(req,res)=>{
    console.log(req.body)
    res.status(200).json({test:'test'})
})
route.post('/create',(req,res)=>Create(req,res))
route.post('/update',(req,res)=>Update(req,res))
route.post('/delete',(req,res)=>Delete(req,res))
route.post('/get-all',(req,res)=>getPostAll(req,res))
route.post('/get-category',(req,res)=>getPostCategory(req,res))
route.post('/get-one',(req,res)=>getPostOne(req,res))
route.post('/get-search',(req,res)=>getPostSearch(req,res))
module.exports = route

// 생성
const Create = async (req,res)=>{
  try {
    const userData = jwt.verify(req.headers.authorization, process.env.SECRET_KEY) //토큰검증및 유저정보
    await model('post').create({...req.body,...userData,createdAt: new Date(),updatedAt:new Date()}).then((data)=>{
        data.status=true
            res.status(200).json(data)
        })
  } catch (error) {
    res.status(200).json({status:false})
  }
}
// 수정
const Update = async (req,res)=>{
    await model('post').updateOne({...req.body,updatedAt:new Date()}).then((data)=>{
        data.status=true
            res.status(200).json(data)
        })
}
// 삭제
const Delete = async (req,res)=>{
    await model('post').findByIdAndDelete(req.body.id).then((data)=>{
               data.status=true
            res.status(200).json(data)
        })
}
const getPostAll = async (req,res)=>{
    await model('post').find(req.body).then((data)=>{
               data.status=true
            res.status(200).json(data)
        })
}

// 특정카테고리 반환
const getPostCategory = async (req,res)=>{
    await model('post').find(req.body).then((data)=>{
               data.status=true
            res.status(200).json(data)
        })
}
// 검색어 반환
const getPostSearch = async (req,res)=>{
    await model('post').find(req.body).then((data)=>{
               data.status=true
            res.status(200).json(data)
        })
}
// 포스트 반환
const getPostOne = async (req,res)=>{
    await model('post').findById(req.body.id).then((data)=>{
               data.status=true
            res.status(200).json(data)
        })
}
