import { MongoClient } from 'mongodb'
import uuid from 'react-uuid';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const {userId} = req.query
    const client = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/ShoppingLists?retryWrites=true&w=majority")        
    const db = (await client).db()
    const lists = db.collection("lists")

    
    const findedLists=  await lists.find({userId:userId}).toArray()
    res.json(findedLists)
}
