import React, { useContext, useEffect } from 'react'
import styles from "../../styles/FinancesMain.module.css"
import { groceryContext } from '../Layout'
import Income from './Income'

function ShowIncome() {
    const {userIncome} = useContext(groceryContext)
    useEffect(()=>{
        console.log(userIncome)
    },[])
  return (
    <div className={styles.expensesAndFinanceDisplay}>
    <div className={styles.expenseHeader}>


        <div className={styles.none}>
          <p>Date</p>
        </div>

        <div>
          <p>Money</p>
        </div>

        <div>
          <p className={styles.none}>Category</p>
        </div>

        <div>
          <p className={styles.none}>Notes</p>
        </div>
        <div> </div> 

    </div>
    {userIncome&& userIncome.map((income)=>{
        return <Income createdAt={income.createdAt} category={income.category} numberToAdd={income.numberToAdd} notes={income.notes} id={income.id} stringDate={income.stringDate} userId={income.userId}/>
    })}

  </div>
  )
}

export default ShowIncome