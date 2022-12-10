import React, { useContext } from 'react'
import styles from "../styles/Navbar.module.css"
import Link from 'next/link'
import { groceryContext } from './Layout'
function NavBar() {
          const {setShowNav} = useContext(groceryContext)
          const {userId} = useContext(groceryContext)
          const {setWasListSelected} = useContext(groceryContext)
          const {setSellectedShoppingList} = useContext(groceryContext)
          const {setUserId} = useContext(groceryContext)
          const {setUser} = useContext(groceryContext)
          const {setShoppingLists} = useContext(groceryContext)
          const {setAllShoppingLists} = useContext(groceryContext)
          const {setSelectedFoodItem} = useContext(groceryContext)
          const {setUpdateOnTheListPage} = useContext(groceryContext)
  return (
    <div className={styles.navbar}>

        <div onClick={()=>{
            setSellectedShoppingList(undefined)
            setWasListSelected(false)
        }} className={styles.hvrpulse2}><Link href={`/groceries/index/${userId}`}>Grocery Lists</Link></div>
        
        <div onClick={()=>{
            setSellectedShoppingList(undefined)
            setWasListSelected(false)
        }} className={styles.hvrpulse}><Link href={"/food"}>Food</Link></div>

        <div className={styles.hvrpulse}> <Link  href={"/finances"}>Finances</Link></div>

        <div className={styles.hvrpulse}> <Link onClick={()=>{
          setShowNav(false)
          setUserId("")
          setUser({name:"",email:"",password:"",_id:"",userId:""})
          setShoppingLists(undefined)
          setAllShoppingLists(undefined)
          setSelectedFoodItem(undefined)
          setSellectedShoppingList(undefined)
          setWasListSelected(undefined)
          setUpdateOnTheListPage(false)
        }} href={"/"}>Logout</Link></div>


    </div>
  )
}

export default NavBar