import express from 'express'
import route from './route'
import cors from 'cors'
import env from 'dotenv'
import http from 'http'

import { connectDB } from './db'

env.config()

connectDB()




const app = express();
const port =process.env.PORT || 4600


const server = http.createServer(app);
const corsOptions = {
  origin: [
      'https://lilithbe.github.io',
    'http://www.lilith.co.kr',
    'http://lilith.co.kr',
    'http://localhost',
    'http://localhost:80',
    'http://localhost:3000',
  ],
  credentials: true,   
  methods:["GET","POST"], 
};

app.use(cors(corsOptions));

app.use(express.json({limit: '500mb'})); 
app.use(express.urlencoded({limit: '500mb', extended: true}));

app.use('/api',route)

server.listen(port, () => {
    console.log(`url : ${process.env.DEV_PROTOCOL}://${process.env.DEV_DOMEIN}:${port}`
    );
    console.log(corsOptions.origin)
})