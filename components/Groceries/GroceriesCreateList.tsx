import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/Groceries/CreateList.module.css"
import { useRouter } from 'next/router'
import { groceryContext } from '../Layout'
import uuid from 'react-uuid'
export type foodItem ={
    name:string,
    img:string,
    price:number,
    category:string
  }
  export type ListfoodItem ={
    quantity:number,
    price:number,
    _id?:string
    name:string,
  img:string

  }
  type ShoppingList = {
    name:string|undefined,
    category:string|undefined,
    date:string|undefined,
    who:string|undefined,
    notes:string|undefined,
    totalPrice:number|undefined,
    items:ListfoodItem[]|undefined,
    userId:string |undefined,
    createdAt:number|undefined;
    id?:string
    buyed:boolean|undefined
  }
function GroceriesCreateList() {
    const router = useRouter()
    const [name,setName]= useState<string|undefined>()
    const [date,setDate]= useState<string|undefined>()
    const [category,setCategory]= useState<string|undefined>()
    const [member,setMember]= useState<string|undefined>()
    const [notes,setNotes]= useState<string|undefined>()
    const {userId} = useContext(groceryContext)
    const {shoppingLists} = useContext(groceryContext)
    const {setShoppingLists} = useContext(groceryContext)
    const {AllshoppingLists} = useContext(groceryContext)
    const {setAllShoppingLists} = useContext(groceryContext)
    const [heading,setHeading] = useState<string|undefined>()
    const items:ListfoodItem[] = []
    useEffect(()=>{
        setHeading("Create a new Shopping List")
    },[])
  return (
    <form>

        <h1>{heading}</h1>


        <div className={styles.groceriesMainDiv}>
            <label >Name</label>
            <input type="text" onChange={(e)=>{
                setName(e.target.value)
            }}></input>
        </div>

        <div className={styles.groceriesMainDiv}>
            <label >Category</label>
            <select  onChange={(e)=>{
                setCategory(e.target.value)
            }} name="category" id="category">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="Large">Large</option>
                <option value="None">None</option>
            </select>
        </div>

        <div className={styles.groceriesMainDiv}>
            <label>Date</label>
            <input  onChange={(e)=>{
                setDate(e.target.value.toString())
            }} type="date"></input>
        </div>


        <div className={styles.groceriesMainDiv}>
            <label>Who Goes</label>
            <select  onChange={(e)=>{
                setMember(e.target.value)
            }} name="Member" id="Member">
                <option value="Dad">Dad</option>
                <option value="Mom">Mom</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
            </select>
        </div>

        <div className={styles.groceriesMainTextAreaDiv}>
            <label>Notes</label>
            <textarea  onChange={(e)=>{
                setNotes(e.target.value)
            }}></textarea>
        </div>

        <button onClick={(e)=>{
            e.preventDefault()

            if(name?.length && date?.length && category?.length && member?.length && notes?.length){
                if(name?.length>0 && date?.length>0 && category?.length>0 && member?.length>0 && notes?.length>0){
                    let createdAt = new Date()
                    let createDate =Date.parse(createdAt.toString())
                    const id = uuid()
                    let newList:ShoppingList={
                        name:name,
                        category:category,
                        who:member,
                        date:date,
                        notes:notes,
                        totalPrice:0,
                        items:items,
                        createdAt:createDate,
                        userId:userId, 
                        id: id,
                        buyed:false 
                    }
                    let arr:ShoppingList[]= []
                    let allArr:ShoppingList[]= []
                    shoppingLists?.map((list)=>{
                        arr.push(list)
                    })
                    AllshoppingLists?.map((list)=>{
                        allArr.push(list)
                    })
        
                    arr.push(newList)
                    allArr.push(newList) 
                    let sortedArr = arr.sort((a:any, b:any) => {return b.createdAt - a.createdAt})
                    let sortedAr = allArr.sort((a:any, b:any) => {return b.createdAt - a.createdAt})
                    setShoppingLists(sortedArr)
                    setAllShoppingLists(sortedAr)
                    axios.post("/api/CreateList",newList)
                    router.push(`/groceries/index/${userId}`)
        
                }
                else
                {
                    setHeading("FILL ALL")
                }
            }
            else
            {
                setHeading("FILL ALL")
            }

        }}>Create</button>
    </form>
  )
}

export default GroceriesCreateList