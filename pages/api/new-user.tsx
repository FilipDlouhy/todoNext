import { MongoClient } from 'mongodb'
import uuid from 'react-uuid';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (  
    req: NextApiRequest,
    res: NextApiResponse){

             
              const bcrypt = require("bcrypt");
              const data = req.body
              const {email,password,family} = data
              const client = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/users?retryWrites=true&w=majority")        
              const db = (await client).db()
              const users = db.collection("users")
              let hashPassword =  await bcrypt.hash(password,10)
              let userId = uuid()
             await users.insertOne({ email:email,password:hashPassword,family:family,userId:userId})
             res.json({userId:userId})

         
     
            
    
    }