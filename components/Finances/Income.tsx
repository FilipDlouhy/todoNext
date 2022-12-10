import React, { useContext, useEffect, useState } from 'react'
import { groceryContext } from '../Layout'
import styles from "../../styles/Finances/Expense.module.css"
import axios from 'axios'


type Income ={
    createdAt:number|undefined,
    category:string|undefined,
    numberToAdd:number|undefined,
    notes:string|undefined
    id:string|undefined,
    stringDate:string|undefined,
    userId:string|undefined
}


function Income(props:Income) {
  const{setNote} = useContext(groceryContext)
  const{setShowNote} = useContext(groceryContext)
  const{userIncome} = useContext(groceryContext)
  const{setUserIncome} = useContext(groceryContext)
  const{useExpenses} = useContext(groceryContext)
  const{setBalance} = useContext(groceryContext)
  const{setBalanceColor} = useContext(groceryContext)
  return (
    <div className={styles.expense} >
    <div>        
      <p>{props.numberToAdd}$</p>
    </div> 



    <div>        
      <p>{props.stringDate}</p>
    </div> 


    <div className={styles.date}>        
      <p className={styles.none}>{props.category}</p>
    </div> 


    <div onClick={()=>{
            setNote(props.notes)
            setShowNote(true)
        }} className={styles.notes}>
     <p>see notes</p>
    </div> 


    <div onClick={()=>{
        let arr:Income[]=[] ;
        userIncome?.map((icnome)=>{
          if(icnome.id === props.id)
          {
            axios.post("/api/DeleteExpense",{id:props.id})
          }
          else 
          {
            arr.push(icnome)
          } 
        })
        let sortedArr = arr.sort((a:any, b:any) => {return a.createdAt - b.createdAt})

        let totalen =0
        let Expense = 0
        let Income = 0
        sortedArr.map((income)=>{
          if(income.numberToAdd)
          {
            Income = Income + income.numberToAdd
          }
        })
      
        useExpenses?.map((expense)=>{
          if(expense.numberToMinus)
          {
            Expense = Expense +expense.numberToMinus
          }
        })
        totalen = Income - Expense
        if(totalen > 0)
        {
          setBalanceColor(true)
        }else{setBalanceColor(false)}
        setBalance(totalen)
        setUserIncome(sortedArr)
    }}>
      <button className={styles.deleteBtn}>Delete</button>
    </div> 

</div>
  )
}

export default Income