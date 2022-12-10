import Link from 'next/link'

import styles from "../../styles/Groceries/GroceriesNavbar.module.css"
import React, { useContext, useState } from 'react'
import { groceryContext } from '../Layout'
export type foodItem ={
  name:string,
  img:string,
  price:number,
  category:string,
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
  id?:string|undefined
  ,buyed:boolean|undefined

}
export type ListfoodItem ={
  quantity:number,
  price:number,
  _id?:string
  name:string,
  img:string

}
function GroceriesNavbar() {
  

    const {setShoppingLists} = useContext(groceryContext)
    const {AllshoppingLists} = useContext(groceryContext)
  return (
    <div className={styles.groceriesNavbar}>

            <div className={styles.groceriesNavbarByDate}>
              <input onChange={(e)=>{
                let arr:ShoppingList[] =[]
                AllshoppingLists?.map(list=>{
                  if(list.name?.includes(e.target.value))
                  {
                    arr.push(list)
                  }
                })
                setShoppingLists(arr)
              }} type="text" placeholder="Find Shopping List"></input>
                <p onClick={()=>{
                setShoppingLists(AllshoppingLists)
                }}>All</p>
                <p onClick={()=>{
                  let date = new Date()
                  let arr:ShoppingList[] = []
            
                  let compDate:number=   date.getDate()
          
                      AllshoppingLists?.map(list=>{


                        if(list.date?.slice(8)=== compDate.toString())
                        { 
                            arr.push(list)
                        }
                      })

                    
                 
                    setShoppingLists(arr)    
                    
                       }}>Today</p>

                <p onClick={()=>{
                  let date = new Date()
                  let arr:ShoppingList[] = []
             
                  let compDate:number=   date.getMonth()+1

                      AllshoppingLists?.map(list=>{
       
                        if(list.date?.slice(5,7)=== compDate.toString())
                        { 
                          
                          arr.push(list)
                        }
                      })

                 
                    setShoppingLists(arr)    
                       }}>This Month</p>
            </div>
            
            
            <div className={styles.groceriesNavbarCreateTodo}> 
                <Link className={styles.link} href={"/groceries/createList"}>Create Shoppig List</Link>
            </div>
    </div>
  )
}

export default GroceriesNavbar