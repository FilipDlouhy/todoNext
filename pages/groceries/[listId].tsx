import React, { useContext, useEffect, useState } from 'react'
import OneListShoppingListItem from '../../components/Groceries/OneListShoppingListItem'
import GroceriesSideBar from '../../components/Groceries/GroceriesSideBar'
import styles from "../../styles/Groceries/OneList.module.css"
import OneListNavbar from '../../components/Groceries/OneListNavbar'
import { useRouter } from 'next/router'
import { groceryContext } from '../../components/Layout'
import ListNotes from '../../components/Groceries/ListNotes'
import axios from 'axios'
export type ListfoodItem ={
  quantity:number,
  price:number,
  _id?:string,
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
  userId:string|undefined ,
  createdAt:number|undefined,
  id?:string|undefined
  buyed:boolean|undefined
}
function listId() {
  const router = useRouter()
  const {setSellectedShoppingList}= useContext(groceryContext)
  const {setWasListSelected}= useContext(groceryContext)
  const {selectedShoppingList} = useContext(groceryContext)
  const {updateOnTheListPage} = useContext(groceryContext)
  const {AllshoppingLists} = useContext(groceryContext)
  const {setAllShoppingLists} = useContext(groceryContext)
  const {setShoppingLists} = useContext(groceryContext)
  const {SelectedListItems} = useContext(groceryContext)
  const {setSelectedListItems} = useContext(groceryContext)
  const {userId} = useContext(groceryContext)
  const {setUpdateOnTheListPage} = useContext(groceryContext)
  const {note} = useContext(groceryContext)
  const {showNote} = useContext(groceryContext)
  const {setNote} = useContext(groceryContext)
  const {setShowNote} = useContext(groceryContext)
  useEffect(()=>{
    setSelectedListItems(selectedShoppingList?.items)
  },[])
  return (
    <div className={styles.groceriesMain}>
        <GroceriesSideBar/>

        <div className={styles.groceriesDisplay}>

        {selectedShoppingList&& <OneListNavbar name={selectedShoppingList.name} category={selectedShoppingList.category} date={selectedShoppingList.date} who={selectedShoppingList.who} notes={selectedShoppingList.notes} totalPrice={selectedShoppingList.totalPrice} items={selectedShoppingList.items} userId={selectedShoppingList.userId} createdAt={selectedShoppingList.createdAt} id ={selectedShoppingList.id}/>}
 
                        <h1 className={styles.oneListHeading}>All Items In The list</h1>
                        <div className={styles.updateButtons}>
                          <button onClick={()=>{

                                  setSellectedShoppingList(selectedShoppingList)
                                  setWasListSelected(true)
                                  router.push(`/food`)

                               
                       
                          }} className={styles.updateBtn}>Go to food and Update</button>

                          <button onClick={()=>{
                            axios.post(`/api/DeleteList`,selectedShoppingList)
                            let arr:ShoppingList[] =[]
                            AllshoppingLists?.map((list)=>{
                                if(list.id !== selectedShoppingList?.id)
                                {
                                  arr.push(list)
                                }
                            })
                           let sortedArr = arr.sort((a:any, b:any) => {return b.createdAt - a.createdAt})
                            setAllShoppingLists(sortedArr)
                            setShoppingLists(sortedArr)
                            setUpdateOnTheListPage(false)
                            setWasListSelected(false)  
                            router.push(`/groceries/index/${userId}`)
                          }} className={styles.updateBtn} style={{backgroundColor:"red"}}>Delete</button>

                          <button onClick={()=>{
                            setNote(selectedShoppingList?.notes)
                            setShowNote(true)
                          }} className={styles.notesBtn}>Notes</button>      


                          <button onClick={()=>{
                                    let BUYED = selectedShoppingList?.buyed
                                    BUYED = !BUYED

                                      let arr :ShoppingList[] = []
                                      AllshoppingLists?.map((list)=>{
                                        if(list.id===selectedShoppingList?.id)
                                        { 
                                          let newList:ShoppingList ={
                                              name:selectedShoppingList?.name,
                                              category:selectedShoppingList?.category,
                                              date:selectedShoppingList?.date,
                                              who:selectedShoppingList?.who,
                                              notes:selectedShoppingList?.notes,
                                              totalPrice:selectedShoppingList?.totalPrice,
                                              items:selectedShoppingList?.items,
                                              userId:selectedShoppingList?.userId,
                                              createdAt:selectedShoppingList?.createdAt,
                                              id:selectedShoppingList?.id,
                                              buyed:BUYED}
                                            arr.push(newList)   
                                            axios.post(`/api/UpdateList`,newList) 
                                        }
                                        else 
                                        {
                                          arr.push(list)
                                        }

                                      })
                                      setSellectedShoppingList({
                                        name:selectedShoppingList?.name,
                                        category:selectedShoppingList?.category,
                                        date:selectedShoppingList?.date,
                                        who:selectedShoppingList?.who,
                                        notes:selectedShoppingList?.notes,
                                        totalPrice:selectedShoppingList?.totalPrice,
                                        items:selectedShoppingList?.items,
                                        userId:selectedShoppingList?.userId,
                                        createdAt:selectedShoppingList?.createdAt,
                                        id:selectedShoppingList?.id,
                                        buyed:BUYED})
                                      setAllShoppingLists(arr)
                                      setShoppingLists(arr)  
                                    }} className={selectedShoppingList?.buyed ? styles.updateBtn:styles.updateBtnNot}> {selectedShoppingList?.buyed ? "UNBUY":"BUYED"}</button>
                          

      


                         {updateOnTheListPage ? <button onClick={()=>{
                            let arr:any = []
                            AllshoppingLists?.map((list)=>{
                              if(list.id=== selectedShoppingList?.id)
                              {
                                arr.push(selectedShoppingList)
                              }
                              else
                              {
                                arr.push(list)
                              }
                            })
                            axios.post("/api/UpdateList",selectedShoppingList)
                            setAllShoppingLists(arr)
                            setShoppingLists(arr)  
                            setSellectedShoppingList(undefined)
                            setWasListSelected(false)  
                            setUpdateOnTheListPage(false)
                            router.push(`/groceries/index/${userId}`)
                         }} className={styles.updateBtn}>Update The List</button>:<div></div>}


                        
                        </div>

                        <div className={styles.listItemsDisplay}>
                        {SelectedListItems && SelectedListItems.map((list:ListfoodItem)=>{
                          
                          return <OneListShoppingListItem img={list.img} name={list.name}  quantity={list.quantity} price={list.price} _id={list._id} /> 
                        })}
                        </div>
                     
        </div>


        <div className={ showNote ?styles.notesDiv :styles.noNOtes }>
          <div>
            <button onClick={()=>{
              setShowNote(false)
            }}>X</button>
            <p>{note&&note}</p>
          </div>
        </div>
    </div>
  )
}

export default listId