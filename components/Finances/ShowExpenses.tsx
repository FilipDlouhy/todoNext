import React, { useContext, useEffect } from 'react'
import styles from "../../styles/FinancesMain.module.css"
import { groceryContext } from '../Layout'
import Expense from './Expense'
function ShowExpenses() {
    const {useExpenses} = useContext(groceryContext)
 
  return (
    
        <div className={styles.expensesAndFinanceDisplay}>
          <div className={styles.expenseHeader}>

              <div>
                <p>Name</p>
              </div>

              <div>
                <p className={styles.none}>Date</p>
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
          {useExpenses&& useExpenses.map((expense)=>{
          return   <Expense createdAt={expense.createdAt} category={expense.category} numberToMinus={expense.numberToMinus} notes={expense.notes} id={expense.id} name={expense.name} stringDate={expense.stringDate} userId={expense.userId} />
          })}


        </div>
  )
}

export default ShowExpenses