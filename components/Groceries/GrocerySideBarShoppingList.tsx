import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styles from "../../styles/Groceries/GroceriesSideBar.module.css"
import { groceryContext } from '../Layout'
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
export type ListfoodItem ={
  quantity:number,
  price:number,
  _id?:string
  name:string,
img:string
}
function GrocerySideBarShoppingList(props:ShoppingList) {
  const router = useRouter()
  const {setSelectedListItems} = useContext(groceryContext)
  const {setSellectedShoppingList} = useContext(groceryContext)
  
  return (
    <div  onClick={()=>{
      setSellectedShoppingList({
        name:props.name,
        category:props.category,
        date:props.date,
        who:props.who,
        notes:props.notes,
        totalPrice:props.totalPrice,
        items:props.items,
        userId:props.userId,
        createdAt:props.createdAt,
        id:props.id,
      buyed:props.buyed})
        setSelectedListItems(props.items)
      router.push(`/groceries/${props.id}`)}} className={styles.groceriesSideBarGroceryList}>
    {props.name}
    </div>
  )
}

export default GrocerySideBarShoppingList