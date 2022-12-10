import React, { useEffect, useState } from 'react'
import FoodItem from '../../components/Food/FoodItem'
import FoodNavbar from '../../components/Food/FoodNavBar'
import ShoppingListStats from '../../components/Food/ShoppingListStats'
import { MongoClient } from 'mongodb'
import styles from "../../styles/FoodMain.module.css"
import axios from 'axios'
import foodId from './[foodId]'

export type foodItem ={
  name:string,
  img:string,
  price:number,
  category:string
  _id:string
}

export type foodItems ={
  food:foodItem[]
}
function index() {
  const [foodItems,setFoodItems]= useState<foodItem[]>()
  const [allfoodItems,AllsetFoodItems]= useState<foodItem[]>()
  useEffect(()=>{
    if(!allfoodItems || !foodItems){
      axios.get("http://localhost:3000/api/getFood").then((res)=>{
        setFoodItems(res.data)
        AllsetFoodItems(res.data)
      })
    }

  })

  return (
    <div className={styles.foodMain}>
      <FoodNavbar setFoodItems={setFoodItems}  foodItems={foodItems} allfoodItems={allfoodItems}/>

      <div className={styles.foodDisplay}>
          <ShoppingListStats/>

          <div className={styles.foodDisplayDiv}>

            {foodItems&& foodItems.map((foodItem:foodItem)=>{
              return <FoodItem img={foodItem.img} _id={foodItem._id} name={foodItem.name} price={foodItem.price} category={foodItem.category}  />
            })}

          </div>

      </div>

        
    </div>
  )
}




export default index