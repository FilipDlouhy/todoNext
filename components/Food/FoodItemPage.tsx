import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/Food/FoodPage.module.css"
import { groceryContext } from '../Layout'
import axios from 'axios'
import listId from '../../pages/groceries/[listId]'
import ShoppingListStats from './ShoppingListStats'
export type ListfoodItem ={
    quantity:number,
    price:number,
    _id?:string
    name:string,
  img:string
  }
function FoodItemPage() {
    const {selectedFoodItem} = useContext(groceryContext)
    const {selectedShoppingList} = useContext(groceryContext)
    const {setSellectedShoppingList} = useContext(groceryContext)
    const {userId} = useContext(groceryContext)
    const {AllshoppingLists} = useContext(groceryContext)
    const {setAllShoppingLists} = useContext(groceryContext)
    const {setShoppingLists} = useContext(groceryContext)
    const {setWasListSelected} = useContext(groceryContext)
    const {setSelectedListItems} = useContext(groceryContext)
    const {fromFood} = useContext(groceryContext)
    const {fromList} = useContext(groceryContext)
    const router = useRouter()
    const [quantity,setQuantity] = useState<number>()
    const [category,setCategory] = useState<string>()
    const [wasUpdated,setWasUpdatet] = useState<boolean>(false)
    useEffect(()=>{
      setCategory(selectedShoppingList?.category)
        selectedShoppingList?.items?.map((item)=>{
            if(item._id === selectedFoodItem?._id)
            {  
                setQuantity(item.quantity)
            }
        })
    },[])
  return (
    <div className={styles.foodItemPage}>

        <div className={styles.foodItemPageGoBack}> 
            <button onClick={()=>{
                if(wasUpdated)
                {
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
                  setAllShoppingLists(arr)
                  setShoppingLists(arr)
                }             
  

                if(fromList)
                {
                  let arr:any = []
                  AllshoppingLists?.map((list)=>{
                    if(list.id=== selectedShoppingList?.id)
                    {
                        arr.push(selectedShoppingList)
                        setSellectedShoppingList(selectedShoppingList)
                        setSelectedListItems(selectedShoppingList?.items)
                    }
                    else
                    {
                        arr.push(list)
                    }
                    }) 
                    let sortedArr = arr.sort((a:any, b:any) => {return b.createdAt - a.createdAt})
                    setShoppingLists(sortedArr)
                    setAllShoppingLists(sortedArr)
                  router.push(`/groceries/${selectedShoppingList?.id}`)
                  setWasListSelected(false)  
                }
                if(fromFood)
                {
                  console.log("AAAA")

                  router.push(`/food`)
                }
                setWasUpdatet(false)
                }}>Go Back</button>
        </div>

        <div className={styles.foodItemPageImgDiv}>
            <img src={selectedFoodItem?.img}></img>
        </div>

        <h1>{ selectedFoodItem&&selectedFoodItem.name}</h1>

        <div className={styles.foodItemPageQuantity}> 
            <p>Quantity in the List:</p><p style={{color:"#50C878",fontSize:"1.25rem"}}>{quantity&&quantity}</p> 
        </div>    

        <div className={styles.foodItemPageQuantity}>
            <p>Price: <span style={{color:"#50C878",fontSize:"1.25rem"}}>{ selectedFoodItem&&selectedFoodItem.price}</span> </p>
            { selectedShoppingList&&<button onClick={()=>{
             let arr : ListfoodItem[]= []
             let totalen = 0
             let checkTotal:number=0
             if(category?.toLowerCase() === "small")
             {checkTotal = 15}
             if(category?.toLowerCase() === "medium")
             {checkTotal = 30}
             if(category?.toLowerCase() === "large")
             {checkTotal = 60}

             selectedShoppingList?.items?.map((item)=>{totalen+=item.quantity})
             if(totalen < checkTotal || category?.toLowerCase() === "none")
             { totalen=0;   
              selectedShoppingList?.items?.map((list)=>{
              if(list._id === selectedFoodItem?._id)
              {
                setQuantity(list.quantity+1)
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
              id:selectedShoppingList?.id,buyed:selectedShoppingList?.buyed
            })}

            }
          }>Add to List</button>}
        </div>

    </div>
  )
}

export default FoodItemPage