import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/Finances/CreateExpense.module.css"
import { groceryContext } from '../Layout'
import uuid from 'react-uuid'
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
function AddIncome() {
    const {setShowFormIncome} = useContext(groceryContext)
    const [number,setNumber] = useState<number>()
    const [category,setCategory] = useState<string>()
    const [notes,setNotes] = useState<string>()
    const {userId} = useContext(groceryContext)
    const {userIncome} = useContext(groceryContext)
    const {setUserIncome} = useContext(groceryContext)
    const {setBalanceColor} = useContext(groceryContext)
    const {setBalance} = useContext(groceryContext)
    const {useExpenses} = useContext(groceryContext)
    const [Create,setCreateDate] = useState<number>()
    const [StringDate,setStringDate] = useState<string>()
    const [heading,setHeading] = useState<string|undefined>()
    useEffect(()=>{
        setHeading("Add a new Income")
    },[])
  return (
    <form className={styles.createExpenseForm}>
        <h1>{heading}</h1>

        

        <div className={styles.createExpenseFormDiv}>
            <label>Money  to  Add</label>
            <input onChange={(e)=>{setNumber(parseInt(e.target.value))}} min={0} type="number" ></input>
        </div>


        <div className={styles.createExpenseFormDiv}>
            <label>Category</label>
            <select onChange={(e)=>{
                setCategory(e.target.value)
            }} name="category" id="category">
                <option value="Work">Work</option>
                <option value="Gift">Gift</option>
                <option value="Lottery">Lottery</option>
                <option value="Investing">Investing</option>
            </select>
        </div>

        <div className={styles.createExpenseFormDiv}>
            <label>Date </label>
            <input onChange={(e)=>{
                let createdAt = new Date(e.target.value)
                setCreateDate(Date.parse(createdAt.toString()))
                var date = new Date(e.target.value);
                var dd = String(date.getDate()).padStart(2, '0');
                var mm = String(date.getMonth() + 1).padStart(2, '0');
                var yyyy = date.getFullYear()
                let today = mm + '/' + dd + '/' + yyyy
                setStringDate(today)
            }} type="date" placeholder='Date'></input>
        </div>

        <div className={styles.createExpenseFormDivTextArea}>
            <label>Notes</label>
            <textarea onChange={(e)=>{setNotes(e.target.value)}} placeholder='Notes'></textarea>
        </div>
        <div className={styles.createExpensebuttonsDiv}>
            <button onClick={(e)=>{
                e.preventDefault()
                if(number &&category?.length &&notes?.length  &&Create &&StringDate?.length)
                {
                    if(category?.length >0 &&notes?.length  > 0 &&StringDate?.length >0)
                    {
                        let id = uuid()
                        let newIncome:Income = {
                            createdAt:Create,
                            category:category,
                            numberToAdd:number,
                            notes:notes,
                            id:id,
                            stringDate:StringDate,
                            userId:userId
                        }
                        axios.post("/api/AddIncome",newIncome)
                        let arr:Income[] = []
                        userIncome?.map(income=>{
                            arr.push(income)
                        })
                        arr.push(newIncome)
                      
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
                        setShowFormIncome(false)
                        
                    }else{
                        setHeading("FILL ALL")
                    }

                }else{
                    setHeading("FILL ALL")
                }



                    }} className={styles.createExpensebutton}>Add Income</button>
            <button onClick={(e)=>{
                e.preventDefault()
                setHeading("Add a new Income")
                setShowFormIncome(false)}} className={styles.GoBAckbutton}>Go Back</button>
        </div>
    </form>
  )
}

export default AddIncome