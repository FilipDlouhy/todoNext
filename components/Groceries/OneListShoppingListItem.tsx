import { useRouter } from 'next/router'
import React, { useContext, useState,useEffect } from 'react'
import styles from "../../styles/Groceries/OneListShoppingListItem.module.css"
import ShoppingListStats from '../Food/ShoppingListStats'
import { groceryContext } from '../Layout'
export type ListfoodItem ={
  quantity:number,
  price:number,
  _id?:string,
  name:string,
  img:string
}
export type foodItem ={
  name:string,
  img:string,
  price:number,
  category:string
  _id:string
}
function OneListShoppingListItem(props:ListfoodItem) {
  const {selectedShoppingList} = useContext(groceryContext)
  const {setSellectedShoppingList} = useContext(groceryContext)
  const {setUpdateOnTheListPage} = useContext(groceryContext)
  const {setSelectedFoodItem} = useContext(groceryContext)
  const {allfoodItems} = useContext(groceryContext)
  const {setWasListSelected} = useContext(groceryContext)
  const [quantity,setQuantity] = useState<number>(props.quantity)
  const [Price,setPrice] = useState<number>(props.quantity*props.price)
  const {itemQuantity} = useContext(groceryContext)
  const {setItemQuantity} = useContext(groceryContext)
  const {setSelectedListItems} = useContext(groceryContext)
  const {setFromFood} = useContext(groceryContext)
  const {setFromList} = useContext(groceryContext)
  const [category,setCategory]=useState<string>()
  const router = useRouter()
  useEffect(()=>{
    setCategory(selectedShoppingList?.category)
  },[])
  return (
    <div className={styles.item}>
        
        <img  onClick={()=>{
            allfoodItems?.map((food)=>{
              if(food._id === props._id)
              {
                setSelectedFoodItem(food)
              }
            })
            setSellectedShoppingList(selectedShoppingList)
            setWasListSelected(true)
            setFromFood(false)
            setFromList(true)
            router.push(`/food/${props._id}`)

        }} src={props.img}></img>
        <h2  onClick={()=>{
              allfoodItems?.map((food)=>{
              if(food._id === props._id)
              {
                setSelectedFoodItem(food)
              }
            })
            router.push(`/food/${props._id}`)
    }}>{props.name}</h2>

        <div>
          <p>Price for one <span></span>{props.price}$</p>
          <p><span>Quantity</span><span></span>{quantity}</p>
          <p><span>Total</span><span>{Price}$</span></p>
        </div>
 
        <div className={styles.itemButtons}> 

            <button 
            onClick={()=>{
              setUpdateOnTheListPage(true)
              let arr : ListfoodItem[]= []
               selectedShoppingList?.items?.map((list)=>{
               if(list._id === props._id)
               {
                if(itemQuantity){
                  setItemQuantity(itemQuantity-1)
                }
                if(props.quantity - 1 > 0 )
                { 
                  setQuantity(quantity-1)  
                  setPrice(Price-list.price)   
                  let newListItem:ListfoodItem = {
                    quantity:list.quantity-1,
                    price:list.price,
                    _id:list._id,
                    name:list.name,
                    img:list.img
                          }
                  arr.push(newListItem)
                }
               }
               else
               {
                 arr.push(list)
               }
              })
              let totalen = 0
              arr.map((item)=>{
               totalen = totalen+ item.price * item.quantity
              })
              setSellectedShoppingList({
                name:selectedShoppingList?.name,
                category:selectedShoppingList?.category,
                date:selectedShoppingList?.date,
                who:selectedShoppingList?.who,
                notes:selectedShoppingList?.notes,
                totalPrice:totalen,
                items:arr,
                userId:selectedShoppingList?.userId,
                createdAt:selectedShoppingList?.createdAt,
                _id:selectedShoppingList?._id,
                id:selectedShoppingList?.id,
                buyed:selectedShoppingList?.buyed
              })
              setSelectedListItems(arr)
             }}>-1</button>
            <button  onClick={()=>{
              setUpdateOnTheListPage(true)
              let arr : ListfoodItem[]= [] 
               selectedShoppingList?.items?.map((list)=>{
               if(list._id !== props._id)
               {
                arr.push(list)
               }
               else
               {
                if(itemQuantity){
                  setItemQuantity(itemQuantity-list.quantity)
                }
               }
              })
              let totalen = 0
              arr.map((item)=>{
               totalen = totalen+ item.price * item.quantity
              })
              setSellectedShoppingList({
                name:selectedShoppingList?.name,
                category:selectedShoppingList?.category,
                date:selectedShoppingList?.date,
                who:selectedShoppingList?.who,
                notes:selectedShoppingList?.notes,
                totalPrice:totalen,
                items:arr,
                userId:selectedShoppingList?.userId,
                createdAt:selectedShoppingList?.createdAt,
                _id:selectedShoppingList?._id,
                id:selectedShoppingList?.id,
                buyed:selectedShoppingList?.buyed
              })
              setSelectedListItems(arr)
             }}>Delete</button>            
            <button onClick={()=>{
             let totalen = 0
             let arr : ListfoodItem[]= []
            let checkTotal:number=0

            if(category?.toLowerCase() === "small")
            {checkTotal = 15}
            if(category?.toLowerCase() === "medium")
            {checkTotal = 30}
            if(category?.toLowerCase() === "large")
            {checkTotal = 60}    
            selectedShoppingList?.items?.map((item)=>{totalen +=item .quantity})   

            if(totalen < checkTotal || category?.toLowerCase() === "none")
            {
              totalen = 0
              setUpdateOnTheListPage(true)
              selectedShoppingList?.items?.map((list)=>{
              if(list._id === props._id)
              {
                setPrice(Price+list.price)   
                setQuantity(quantity+1)  
                if(itemQuantity){
                  setItemQuantity(itemQuantity+1)
                }   
                let newListItem:ListfoodItem = {
                  quantity:list.quantity+1,
                  price:list.price,
                  _id:list._id,
                  name:list.name,
                  img:list.img
                }
                arr.push(newListItem)

              }
              else
              {
                arr.push(list)
              }
             })
             arr.map((item)=>{
              totalen = totalen+ item.price * item.quantity
             })
             setSellectedShoppingList({
              name:selectedShoppingList?.name,
              category:selectedShoppingList?.category,
              date:selectedShoppingList?.date,
              who:selectedShoppingList?.who,
              notes:selectedShoppingList?.notes,
              totalPrice:totalen,
              items:arr,
              userId:selectedShoppingList?.userId,
              createdAt:selectedShoppingList?.createdAt,
              _id:selectedShoppingList?._id,
                buyed:selectedShoppingList?.buyed,
                id:selectedShoppingList?.id,
            })
            setSelectedListItems(arr)}
            }
          }>+1</button>

        </div>

        
    </div>
  )
}

export default OneListShoppingListItem