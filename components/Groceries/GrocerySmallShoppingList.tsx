import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styles from "../../styles/Groceries/GrocerySmallShoppingList.module.css"
import { useEffect,useState } from 'react'
import { groceryContext } from '../Layout'
export type ListfoodItem ={
  quantity:number,
  price:number,
  _id?:string
  name:string,
  img:string
}
type ShoppingList = {
  name:string|undefined,
  category:string|undefined,
  date:string|undefined,
  who:string|undefined,
  notes:string|undefined,
  totalPrice:number|undefined,
  items:ListfoodItem[]|undefined,
  userId:string|undefined ,
  createdAt:number|undefined,
  id:string| undefined,
  buyed:boolean|undefined
}
function GrocerySmallShoppingList(props:ShoppingList) {
  const router = useRouter()
  const {setSellectedShoppingList} = useContext(groceryContext)
  const {setSelectedListItems} = useContext(groceryContext)
  const {setUpdateOnTheListPage} = useContext(groceryContext)
  const [quantity,setQuantity] = useState<number>()

  useEffect(()=>{
    let totalQuantity = 0;

      if(props.items){
        props.items.map((item)=>{
          totalQuantity = totalQuantity + item.quantity
          
        })
      }
    
    setQuantity(totalQuantity)

  })
  return (
    <div onClick={()=>{
      setSellectedShoppingList({  name:props.name,
        category:props.category,
        date:props.date,
        who:props.who,
        notes:props.notes,
        totalPrice:props.totalPrice,
        items:props.items,
        userId:props.userId,
        createdAt:props.createdAt,
        id:props.id,buyed:props.buyed
      })
      setSelectedListItems(props.items)
      setUpdateOnTheListPage(false)
      router.push(`/groceries/${props.id}`)}} className={props.buyed ? styles.grocerySmallShoppingList:styles.grocerySmallShoppingListNot}>
        
        <div>
            <p>Name: {props.name}</p>
            <p>Date: {props.date}</p>
            <p>Member: Dad</p>
        </div>

        
        <div> 
            <p>Category:{props.category}</p>
            <p>Quantity: {quantity}</p>
            <p>Price: {props.totalPrice}$</p>
        </div>
    </div>
  )
}

export default GrocerySmallShoppingList