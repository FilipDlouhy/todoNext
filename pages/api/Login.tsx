import { MongoClient } from 'mongodb'
import uuid from 'react-uuid';
import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
        _id:string,
        name:string,
        email:string,
        password:string,
        userId:string       
}
export default async function handler (  
    req: NextApiRequest,
    res: NextApiResponse){

              const bcrypt = require("bcrypt");
              const data = req.body
              const {email,password} = data
              const client = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/users?retryWrites=true&w=majority")        
              const db = (await client).db()
              const users = db.collection("users")
              let user:User | any = await users.findOne({email:email})
              let leCheck = await bcrypt.compare(password,user.password)
               
              if(leCheck)
              {
                res.json(user)
              }
            
    }