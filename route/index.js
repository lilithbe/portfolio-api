import express from 'express'
import Post from './post'
import Auth from './auth'
const route=express.Router()
route.use('/auth',Auth)
route.use('/post',Post)

module.exports = route