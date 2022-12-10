import React from 'react'
import OneListShoppingListItem from '../../components/Groceries/OneListShoppingListItem'

import styles from "../../styles/Groceries/CreateList.module.css"
import GroceriesCreateList from '../../components/Groceries/GroceriesCreateList'
import Link from 'next/link'

function createList() {
  return (
    <div className={styles.groceriesMain}>
            <Link className={styles.linkBack} href={"/groceries/"}>Go Back</Link>

            <GroceriesCreateList/>

    </div>
  )
}

export default createList