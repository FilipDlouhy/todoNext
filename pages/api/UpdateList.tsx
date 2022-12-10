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
    const {id,name,category,date,who, notes,totalPrice,items,userId,createdAt,buyed} = data
    const client = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/ShoppingLists?retryWrites=true&w=majority")        
    const db = (await client).db()
    const lists = db.collection("lists")
    await lists.findOneAndDelete({id:id})
    await lists.insertOne({buyed:buyed,createdAt:createdAt, name:name,category:category,date:date,who:who, notes:notes,totalPrice:totalPrice,items:items,userId:userId,id:id})
    

  

}
