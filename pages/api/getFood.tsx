// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client2 = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/grocery?retryWrites=true&w=majority")        
  const db2 = (await client2).db()
  const FOOD = db2.collection("food")
  let allFoord = await FOOD.find({}).toArray()
  res.json( allFoord )
}
