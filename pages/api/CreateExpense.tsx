// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from 'mongodb'
import uuid from 'react-uuid';
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) 
{
    const data = req.body
    const {userId,createdAt,category,numberToMinus,notes,id,name,stringDate} = data
    const client = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/expense?retryWrites=true&w=majority")        
    const db = (await client).db()
    const expense = db.collection("expense")

    
   await expense.insertOne({userId:userId,stringDate:stringDate,createdAt:createdAt,category:category,numberToMinus:numberToMinus,notes:notes,id:id,name:name})

  

}
