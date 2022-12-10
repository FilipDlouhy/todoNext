import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from "../styles/SingInForm.module.css"
import { useState } from 'react'
import { useContext } from 'react'
import { groceryContext } from './Layout'
import { useRouter } from 'next/router'
import axios from 'axios'
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
type Income ={
  createdAt:number|undefined,
  category:string|undefined,
  numberToAdd:number|undefined,
  notes:string|undefined
  id:string|undefined,
  stringDate:string|undefined,
  userId:string|undefined
}
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
function SingIn() {
  const [email,setEmail]= useState<String>()
  const [password,setPassword]= useState<String>()
  const {setUserId} = useContext(groceryContext)
  const {setUser} = useContext(groceryContext)
  const {setShowNav} = useContext(groceryContext)
  const {setShoppingLists} = useContext(groceryContext)
  const {setAllShoppingLists} = useContext(groceryContext)
  const {setUserExpenses} = useContext(groceryContext)
  const {setUserIncome} = useContext(groceryContext)
  const [heading,setHeading] = useState<string>()
  useEffect(()=>{setHeading("Log In and do some Shopping")},[])
  
  const router = useRouter()
  return (
    <form className={styles.signForm}> 

            
                <h1>{heading}</h1>
            
                <Link href={"/"}>Or You Dont  have an Account</Link>
            <div>
                <label>Your Email</label>
                <input onChange={(e)=>{
                 setEmail(e.target.value)
                }} type="text"></input>
            </div>
    

            <div>
                <label >Password</label>
                <input onChange={(e)=>{
                 setPassword(e.target.value)
                }} type="password"></input>
            </div>

            <button onClick={(e)=>{
              e.preventDefault()
              if(email && password)
              {
                if(email.length>0&&  password.length > 0)
                {
                  axios.post("/api/Login",{password:password,email:email}).then((res)=>{
                    setUser(res.data)
                    setUserId(res.data.userId)
                    setShowNav(true)
                    axios.get(`/api/getLists/${res.data.userId}`).then((res)=>{
                      let arr:ShoppingList[] = res.data
                      let sortedArr = arr.sort((a:any, b:any) => {return b.createdAt - a.createdAt})
                      console.log(sortedArr)
                      setShoppingLists(sortedArr)
                      setAllShoppingLists(sortedArr)
                    }) 
                    axios.post(`api/GetExpenses`,{userId:res.data.userId}).then((res)=>{
                      console.log(res.data)
                    let arr:Expense[]= res.data
                    let sortedArr = arr.sort((a:any, b:any) => {return a.createdAt - b.createdAt})
                      setUserExpenses(sortedArr)
                    })
                    axios.post(`api/GetIncome`,{userId:res.data.userId}).then((res)=>{
                    let arr:Income[] = res.data
                    let sortedArr = arr.sort((a:any, b:any) => {return a.createdAt - b.createdAt})
                      setUserIncome(sortedArr)
                    })
                    router.push(`/groceries/index/${res.data.userId}`)
                  })
                }else{setHeading("FILL ALL")}
              }else{setHeading("FILL ALL")}

            }}>Log in</button>
    
    </form>
  )
}

export default SingIn