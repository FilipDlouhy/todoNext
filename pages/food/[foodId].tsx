
import React from 'react'
import FoodItem from '../../components/Food/FoodItem'
import FoodNavbar from '../../components/Food/FoodNavBar'
import ShoppingListStats from '../../components/Food/ShoppingListStats'
import styles from "../../styles/Food/FoodPage.module.css"
import FoodItemPage from '../../components/Food/FoodItemPage'

function foodId() {
  return (
    <div className={styles.foodMain}>
    <div className={styles.divSpace}></div>

    <div className={styles.foodDisplay}>
        <ShoppingListStats/>

        <div className={styles.foodDisplayDiv}>
            <FoodItemPage/>
        </div>

    </div>

      
  </div>
  )
}


export default foodId 

