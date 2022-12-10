import React, { useContext, useEffect } from 'react'
import styles from "../../styles/Groceries/OneListNavbar.module.css"
import { useRouter } from 'next/router'
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
  id:string|undefined

}

function OneListNavbar(props:ShoppingList) {
  const router = useRouter()
  const {userId} = useContext(groceryContext)
  const {selectedShoppingList} = useContext(groceryContext)
  const {setSelectedListItems} = useContext(groceryContext)
  const {itemQuantity} = useContext(groceryContext)
  const {setItemQuantity} = useContext(groceryContext)
  const {setSellectedShoppingList} = useContext(groceryContext)
  
  useEffect(()=>{
    let quantity = 0
    selectedShoppingList?.items?.map((item)=>{
      quantity = quantity + item.quantity
    })
    setItemQuantity(quantity)
  })

  return (
    <div className={styles.groceriesNavbar}>


            <div className={styles.groceriesNavbarCreateTodo}> 
                <p onClick={()=>{
                    setSellectedShoppingList(undefined)
                    router.push(`/groceries/index/${userId}`)
                }}>Go Back</p>
            </div>

            <div className={styles.groceriesNavbarByDate}>
              <input onChange={(e)=>{
                let arr :ListfoodItem[]=[]
                selectedShoppingList?.items?.map((item)=>{
                  if(item.name.toLowerCase().includes(e.target.value))
                  {
                    arr.push(item)
                  }
                })
                setSelectedListItems(arr)
              }} type="text" placeholder="Find in The Shopping List"></input>
                <p>Quantity:{itemQuantity}</p>
                <p>Price:{props.totalPrice}$</p>
                <p>Date:{props.date}</p>
                <p>Who :{props.who}</p>
            </div>
                
            
            
    </div>
  )
}

export default OneListNavbar