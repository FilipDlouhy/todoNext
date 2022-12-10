import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/FinancesMain.module.css"
import CreateExpense from '../components/Finances/CreateExpense'
import { groceryContext } from '../components/Layout'
import AddIncome from '../components/Finances/AddIncome'
import Expense from '../components/Finances/Expense'
import ShowExpenses from '../components/Finances/ShowExpenses'
import ShowIncome from '../components/Finances/ShowIncome'
import Note from '../components/Finances/Note'
type expense = {
  createdAt:number|undefined,
  category:string|undefined,
  numberToMinus:number|undefined,
  notes:string|undefined
  id:string|undefined,
  name:string|undefined,
  stringDate:string|undefined,
  userId:string|undefined
}
function finances() {
  const {useExpenses} = useContext(groceryContext)
  const {userIncome} = useContext(groceryContext)
  const {showAddForm} = useContext(groceryContext)
  const {setShowForm} = useContext(groceryContext)
  const {showAddFormIncome} = useContext(groceryContext)
  const {setShowFormIncome} = useContext(groceryContext)
  const [showIncome,setShowIncome] = useState<boolean>(false)
  const {showNote} = useContext(groceryContext)
  const {AllshoppingLists} = useContext(groceryContext)
  const {setUserExpenses} = useContext(groceryContext)
  const {balance} = useContext(groceryContext)
  const {setBalance} = useContext(groceryContext)
  const {setBalanceColor} = useContext(groceryContext)
  const {balanceColor} = useContext(groceryContext)
  useEffect(()=>{
    let arr:expense[] =[]
    useExpenses?.map((expense)=>{
        if(expense.category !== "FOOOD" )
        {
          arr.push(expense)
        }
      })
  
    AllshoppingLists?.map((list)=>{
      if(list.buyed){
        let today:string|undefined = list.date?.toString().replace("-","/")
        let newExpense:expense = {
          createdAt:list.createdAt,
          category:"FOOOD",
          numberToMinus:list.totalPrice,
          notes:list.notes,
          id:list.id,
          name:list.name,
          stringDate:today,
          userId:list.userId,
        }
        arr.push(newExpense)
      }
    })

  let sortedArr = arr.sort((a:any, b:any) => {return a.createdAt - b.createdAt})

  let totalen =0
  let Expense = 0
  let Income = 0
  sortedArr.map((expense)=>{
    if(expense.numberToMinus)
    {
      Expense = Expense + expense.numberToMinus
    }
  })

  userIncome?.map((icnome)=>{
    if(icnome.numberToAdd)
    {
      Income = Income +icnome.numberToAdd
    }
  })
  totalen = Income - Expense
  if(totalen > 0)
  {
    setBalanceColor(true)
  }else{setBalanceColor(false)}
  setBalance(totalen)

  setUserExpenses(sortedArr )
  },[])
  return (
    <div className={styles.finances}>
        <h1>Total Expenses</h1>

        <div className={ styles.financesAddAndBalance}>
            <div className={ balanceColor ? styles.financesBallance:styles.financesBallanceRed}>
                <p>Balance:</p>
                <p>{balance}$</p>
            </div>

            <button onClick={()=>{setShowForm(true)}} className={styles.financesAddBUttonExpense}>Add Expense</button>
            <button onClick={()=>{setShowFormIncome(true)}} className={styles.financesAddBUttonIncome}>Add Income</button>

        </div>    

        <div>
            <div>

            </div>
        </div>


        <div className={styles.expenseIncome}>
            <p onClick={()=>{setShowIncome(false)}} className={ showIncome ?styles.chosenCategoryNot : styles.chosenCategory}>Expenses</p>
            <p onClick={()=>{setShowIncome(true)}} className={ showIncome ? styles.chosenCategory  :styles.chosenCategoryNot }>Income</p>
        </div>  



      {showIncome ?<ShowIncome/> : <ShowExpenses/>}   
    














    
        <div className={showAddForm ? styles.formDiv : styles.formDivnone  }>
        <CreateExpense/>    

        </div>

        <div className={showAddFormIncome ? styles.formDivIncome : styles.formDivnoneIncome  }>
        <AddIncome/>    

        </div>

        <div className={ showNote ?styles.notesDiv  : styles.formDivnoneIncome  }>
          <Note/>
        </div>


    </div>
  )
}

export default finances