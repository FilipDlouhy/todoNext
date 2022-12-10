import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/Food/ShoppingListStats.module.css"
import { groceryContext } from '../Layout'
import { useRouter } from 'next/router'
import { NumericLiteral } from 'typescript'
import axios from 'axios'
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
  _id?:string|undefined
  id?:string|undefined

}
function ShoppingListStats() {
  const router = useRouter()
  const {wasListSelected} = useContext(groceryContext)
  const {selectedShoppingList} = useContext(groceryContext)
  const {setWasListSelected} = useContext(groceryContext)
  const {setShoppingLists} = useContext(groceryContext)
  const {setAllShoppingLists} = useContext(groceryContext)
  const {AllshoppingLists} = useContext(groceryContext)
  const {userId} = useContext(groceryContext)
  const {setSellectedShoppingList} = useContext(groceryContext)
  const [quantity,setQuantity] = useState<number>()
  useEffect(()=>{
    let totalQuantity = 0;
    if(selectedShoppingList){
      if(selectedShoppingList.items){
        selectedShoppingList?.items.map((item)=>{
          totalQuantity = totalQuantity + item.quantity
          
        })
      }
    }
    setQuantity(totalQuantity)

  })  
  return (
    <div className={ wasListSelected ?styles.shoppingListStats :styles.ShoppingListStatsHidden} >
      
        <h1>Shopping List Info</h1>


      
            
            <div className={styles.shoppingListStatsDiv}>

              <div className={styles.shoppingListStatsDivDivZWEI}>
                <p>Name:</p>
                <p className={styles.textGreen}>{selectedShoppingList&& selectedShoppingList.name}</p>
              </div>




              <div className={styles.shoppingListStatsDivDiv}>
                <p>Date:</p>
                <p className={styles.textGreen}>{selectedShoppingList&& selectedShoppingList.date}</p>
              </div>

              <div className={styles.shoppingListStatsDivDivZWEI}>
                <p>Quantity:</p>
                <p className={styles.textGreen}>{quantity&& quantity}</p>
              </div>


              <div className={styles.shoppingListStatsDivDivZWEI}>
                <p>Price:</p>
                <p className={styles.textGreen}>{selectedShoppingList&& selectedShoppingList.totalPrice}</p>
              </div>
            
              <div className={styles.shoppingListStatsDivDiv}>
                <p>Who goes:</p>
                <p className={styles.textGreen}>{selectedShoppingList&& selectedShoppingList.who}</p>
              </div>
            </div>

          <button onClick={()=>{

            axios.post("/api/UpdateList",selectedShoppingList)
            let arr:any = []
            AllshoppingLists?.map((list)=>{
              if(list.id=== selectedShoppingList?.id)
              {
                arr.push(selectedShoppingList)
              }
              else
              {
                arr.push(list)
              }
            })
            let sortedArr = arr.sort((a:any, b:any) => {return b.createdAt - a.createdAt})
            setShoppingLists(sortedArr)
            setAllShoppingLists(sortedArr)
            setSellectedShoppingList(undefined)
            setWasListSelected(false)  
            router.push(`/groceries/index/${userId}`)
          }}>Update</button>
     

    </div>
  )
}

export default ShoppingListStats