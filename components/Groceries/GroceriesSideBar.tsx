import React, { useContext } from 'react'
import styles from "../../styles/Groceries/GroceriesSideBar.module.css"
import { groceryContext } from '../Layout'
import GrocerySideBarShoppingList from './GrocerySideBarShoppingList'
export type foodItem ={
  name:string,
  img:string,
  price:number,
  category:string
}
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
  id?:string| undefined,
  buyed:boolean| undefined
}
function GroceriesSideBar() {
  const {AllshoppingLists} = useContext(groceryContext)

  return (
    <div className={styles.groceriesSideBar}>

        <div className={styles.groceriesSideBarHeadingDiv}>
          <p>Latest Grocery Lists</p>
        </div>
        {AllshoppingLists&& AllshoppingLists.map((list:ShoppingList)=>{
          return <GrocerySideBarShoppingList buyed={list.buyed} id={list.id}  name = {list.name} category={list.category} date={list.date} who={list.who} notes={list.notes} totalPrice={list.totalPrice} items={list.items} userId={list.userId} createdAt={list.createdAt}/>
        })}



    </div>
  )
}

export default GroceriesSideBar