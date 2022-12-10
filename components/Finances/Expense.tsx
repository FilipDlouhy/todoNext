import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/Finances/Expense.module.css"
import { groceryContext } from '../Layout'
type Expense = {
  createdAt:number|undefined,
  category:string|undefined,
  numberToMinus:number|undefined,
  notes:string|undefined
  id:string|undefined,
  name:string|undefined,
  stringDate:string|undefined,
  userId:string|undefined
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
  buyed:boolean|undefined
}  
export type ListfoodItem ={
  quantity:number,
  price:number,
  _id?:string
  name:string,
img:string
}
function Expense(props:Expense) {
  const {setNote} = useContext(groceryContext)
  const {setShowNote} = useContext(groceryContext)
  const {useExpenses} = useContext(groceryContext)
  const {setUserExpenses} = useContext(groceryContext)
  const {setShoppingLists} = useContext(groceryContext)
  const {AllshoppingLists} = useContext(groceryContext)
  const {setAllShoppingLists} = useContext(groceryContext)
  const {userIncome} = useContext(groceryContext)
  const {setBalance} = useContext(groceryContext)
  const {setBalanceColor} = useContext(groceryContext)
  return (
    <div className={styles.expense}>
        <div className={styles.expensediv}>
          <p>{props.name}</p>
        </div>  
        
        <div className={styles.date}>
          <p  className={styles.none} >{props.stringDate}</p>
        </div> 


        <div className={styles.expensediv}>        
          <p>{props.numberToMinus}$</p>
        </div> 
        <div className={styles.date}>        
          <p className={styles.none}>  {props.category}</p>
        </div> 

        <div onClick={()=>{
            setNote(props.notes)
            setShowNote(true)
        }} className={styles.notes}>
         <p>see notes</p>
        </div> 


        <div>
          <button onClick={()=>{
          
            let arr:Expense[]=[] ;
            useExpenses?.map((expense)=>{
              if(expense.id === props.id)
              {
                if(expense.category === "FOOOD")
                {
                  let arr:ShoppingList[]=[]
                  AllshoppingLists?.map((list)=>{
                    if(list.id === expense.id)
                    { 
                      let newList:ShoppingList = {
                              name:list.name,
                              category:list.category,
                              date:list.date,
                              who:list.who,
                              notes:list.notes,
                              totalPrice:list.totalPrice,
                              items:list.items,
                              userId:list.userId,
                              createdAt:list.createdAt,
                              _id:list._id,
                              id:list.id,
                              buyed:false
                        }
                        axios.post(`/api/UpdateList`,newList) 
                      arr.push(newList)
                     
                    }else
                    {
                      arr.push(list)
                    }
                  })
                  let sortedArr = arr.sort((a:any, b:any) => {return b.createdAt - a.createdAt})
                  setShoppingLists(sortedArr)
                  setAllShoppingLists(sortedArr)
                }
                else
                {
                  axios.post("/api/DeleteExpense",{id:props.id})
                }
              }
              else 
              {
                arr.push(expense)
              } 
            })
            let sortedArr = arr.sort((a:any, b:any) => {return a.createdAt - b.createdAt})

            let totalen =0
            let Expense = 0
            let Income = 0
            sortedArr.map((expense)=>{
              if(expense.numberToMinus){
              
                Expense = Expense + expense.numberToMinus
              }
            })
          
            userIncome?.map((income)=>{
              if(income.numberToAdd)
              {
                Income = Income +income.numberToAdd
              }
            })
            totalen = Income - Expense
            if(totalen > 0)
            {
              setBalanceColor(true)
            }else{setBalanceColor(false)}
            setBalance(totalen)

            setUserExpenses(sortedArr)
          }} className={styles.deleteBtn}>Delete</button>
        </div> 

    </div>
  )
}

export default Expense