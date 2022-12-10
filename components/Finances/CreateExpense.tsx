import React, { useContext,useState } from 'react'
import styles from "../../styles/Finances/CreateExpense.module.css"
import { groceryContext } from '../Layout'
import uuid from 'react-uuid'
import axios from 'axios'
import NextNodeServer from 'next/dist/server/next-server'
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

function CreateExpense() {
    const {setShowForm} = useContext(groceryContext)
    const [number,setNumber] = useState<number>()
    const [category,setCategory] = useState<string>()
    const [notes,setNotes] = useState<string>()
    const [name,setName] = useState<string>()
    const {userId} = useContext(groceryContext)
    const {useExpenses} = useContext(groceryContext)
    const {setBalance} = useContext(groceryContext)
    const {setBalanceColor} = useContext(groceryContext)
    const {setUserExpenses} = useContext(groceryContext)
    const {userIncome} = useContext(groceryContext)
    const [Create,setCreateDate] = useState<number>()
    const [StringDate,setStringDate] = useState<string>()
    const [heading,setHeading] = useState<string|undefined>("Add a new Expense")
  return (
    <form className={styles.createExpenseForm}>
        <h1>{heading&&heading}</h1>

        
        <div className={styles.createExpenseFormDiv}>
            <label>Name</label>
            <input onChange={(e)=>{
                setName(e.target.value)
            }} type="text" placeholder='Name'></input>
        </div>

        <div className={styles.createExpenseFormDiv}>
            <label>Money </label>
            <input onChange={(e)=>{
                setNumber(parseInt(e.target.value))
            }} type="number" placeholder='Money'></input>
        </div>

        <div className={styles.createExpenseFormDiv}>
            <label>Category</label>
            <select  onChange={(e)=>{
                setCategory(e.target.value)
            }} name="category" id="category">
                <option value="Investment">Investment</option>
                <option value="Fun">Fun</option>
                <option value="Car">Car</option>
                <option value="Taxes">Taxes</option>
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
            <textarea onChange={(e)=>{
                setNotes(e.target.value)
            }} placeholder='Notes'></textarea>
        </div>
        <div className={styles.createExpensebuttonsDiv}>
            <button onClick={(e)=>{
                e.preventDefault()
               
                if(number && category?.length && notes?.length && name?.length && Create && StringDate?.length)
                {
                    if( category?.length && notes?.length && name?.length && StringDate?.length)
                    {
                        let stringDate =new Date()
                        stringDate.toString()
                        let id = uuid()
                        let newExpense:Expense = {
                            createdAt:Create,
                            category:category,
                            numberToMinus:number,
                            notes:notes,
                            id:id,
                            name:name,
                            stringDate:StringDate,
                            userId:userId
                        }    
                        axios.post("/api/CreateExpense",newExpense)
                        let arr:Expense[] = []
                        useExpenses?.map(expense=>{
                            arr.push(expense)
                        })    
        
                        arr.push(newExpense)
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
        
                        setShowForm(false)
                    }else{
                        setHeading("Fill ALL")
                    }
                }else{
                    setHeading("Fill ALL")
                }



            }} className={styles.createExpensebutton}>Create Expense</button>
            <button onClick={(e)=>{
                e.preventDefault()
                setHeading("Add a new Expense")
                setShowForm(false)}} className={styles.GoBAckbutton}>Go Back</button>
        </div>
    </form>
  )
}

export default CreateExpense