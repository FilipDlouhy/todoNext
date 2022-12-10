import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/Food/FoodItem.module.css"
import { groceryContext } from '../Layout'
export type foodItem ={
  name:string,
  img:string,
  price:number,
  category:string
  _id:string
}
export type ListfoodItem ={
  quantity:number,
  price:number,
  _id?:string
  name:string,
  img:string
  
}
function FoodItem(props:foodItem) {
  const router = useRouter()
  const {setSelectedFoodItem} = useContext(groceryContext)
  const {selectedShoppingList} = useContext(groceryContext)
  const {setSellectedShoppingList} = useContext(groceryContext)
  const [quantity,setQuantity] = useState<string|undefined>()
  const {setFromFood} = useContext(groceryContext)
  const {setFromList} = useContext(groceryContext)
  useEffect(()=>{
    setQuantity(selectedShoppingList?.category)
  },[])
  return (
    <div className={styles.foodItem}>
        <div  onClick={()=>{
      let fooditem:foodItem = {name:props.name,img:props.img,price:props.price,category:props.category,_id:props._id}
      setSelectedFoodItem(fooditem)
      setFromFood(true)
      setFromList(false)
      router.push(`/food/${props._id}`)}}  className={styles.foodItemImgDiv}>
            <img src={props.img}></img>
        </div>

        <h1> {props.name}</h1>

        <div className={styles.foodItemPriceDiv}>
            <p>Price</p>
          {selectedShoppingList&&<button onClick={()=>{
              let arr = selectedShoppingList?.items
              let leTrue = true
              let total = 0
              let checkTotal:number=0
              if(quantity?.toLowerCase() === "small")
              {checkTotal = 15}
              if(quantity?.toLowerCase() === "medium")
              {checkTotal = 30}
              if(quantity?.toLowerCase() === "large")
              {checkTotal = 60}

              arr?.map((item)=>{total+=item.quantity})
              if(total < checkTotal || quantity?.toLowerCase() === "none")
             { total = 0
              arr?.map((item)=>{
                if(item._id=== props._id)
                {
                  item.quantity++
                  leTrue = false
                }
                total = total + item.price* item.quantity
                
              })
              if(leTrue)
              {
                let newFoodItem:ListfoodItem =
                {
                  _id:props._id,
                  price:props.price,
                  quantity:1,
                  name:props.name,
                  img:props.img
                } 
                console.log(newFoodItem)
                arr?.push(newFoodItem)
              }
              if(total ===0)
              {
                total = props.price
              }

              setSellectedShoppingList({    
                name:selectedShoppingList?.name,
                category:selectedShoppingList?.category,
                date:selectedShoppingList?.date,
                who:selectedShoppingList?.who,
                notes:selectedShoppingList?.notes,
                totalPrice:total,
                items:selectedShoppingList?.items,
                userId:selectedShoppingList?.userId,
                createdAt:selectedShoppingList?.createdAt,
                _id:selectedShoppingList?._id,
                id:selectedShoppingList?.id,buyed:selectedShoppingList?.buyed})
            }

            
            
            }}>Add to list</button>}
            <p> {props.price}$</p>
        </div>

    </div>
  )
}

export default FoodItem