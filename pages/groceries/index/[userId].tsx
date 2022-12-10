import Head from 'next/head'
import axios from 'axios'
import styles from "../../../styles/GroceriesMain.module.css"
import Image from 'next/image'
import GroceriesNavbar from '../../../components/Groceries/GroceriesNavbar'
import GroceriesSideBar from '../../../components/Groceries/GroceriesSideBar'
import GrocerySmallShoppingList from '../../../components/Groceries/GrocerySmallShoppingList'
import { useContext, useEffect } from 'react'
import { groceryContext } from '../../../components/Layout'
import { useRouter } from 'next/router'
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
  id?:string|undefined,
  buyed:boolean|undefined
}
export default function Home() {
  const {shoppingLists} = useContext(groceryContext)
  const {userId} = useContext(groceryContext)
  const {setShoppingLists} = useContext(groceryContext)
  const {setAllShoppingLists} = useContext(groceryContext)


  return (
    <div className={styles.groceriesMain}>
      <GroceriesSideBar/>
      <div className={styles.groceriesDisplay}>
      <GroceriesNavbar/>

         <div className={styles.groceriesDisplayDiv}>
          {shoppingLists && shoppingLists.map((list:ShoppingList)=>{
            return <GrocerySmallShoppingList buyed={list.buyed} id={list.id} name = {list.name} category={list.category} date={list.date} who={list.who} notes={list.notes} totalPrice={list.totalPrice} items={list.items} userId={list.userId} createdAt={list.createdAt}/>
          })}
     
        
         </div> 

      </div>


    </div>

    )
}

