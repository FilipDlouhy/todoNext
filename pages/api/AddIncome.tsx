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
    const {createdAt,category,numberToAdd,notes,id,stringDate,userId} = data
    const client = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/income?retryWrites=true&w=majority")        
    const db = (await client).db()
    const income = db.collection("income")

    
   await income.insertOne({userId:userId,stringDate:stringDate,createdAt:createdAt,category:category,numberToAdd:numberToAdd,notes:notes,id:id,})

  

}
