import { MongoClient } from 'mongodb'
import uuid from 'react-uuid';
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler (  
    req: NextApiRequest,
    res: NextApiResponse){
              const {userId} = req.query
              const client = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/users?retryWrites=true&w=majority")        
              const db = (await client).db()
              const users = db.collection("users")
              const user= await users.findOne({userId:userId}) 
              res.json(user)
     
            
    
    }