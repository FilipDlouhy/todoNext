import React, { useState,useEffect } from 'react'
import styles from "../styles/Layout.module.css"
import { createContext } from 'react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import Navbar from "./NavBar"
import { ObjectId } from 'mongodb';
import axios from "axios"
type LayoutProps = {
    children: React.ReactNode,
  };
type GroceryContext = {
    userId:string,
    setUserId:Dispatch<SetStateAction<string>>,
    showNav:Boolean,
    setShowNav:Dispatch<SetStateAction<Boolean>>,
    user:UserData,
    setUser:React.Dispatch<React.SetStateAction<UserData>>
    shoppingLists: ShoppingList[] | undefined,
    setShoppingLists: React.Dispatch<React.SetStateAction<ShoppingList[] | undefined>>
    AllshoppingLists: ShoppingList[] | undefined,
    setAllShoppingLists: React.Dispatch<React.SetStateAction<ShoppingList[] | undefined>>
    selectedFoodItem: foodItem | undefined,
    setSelectedFoodItem: React.Dispatch<React.SetStateAction<foodItem | undefined>>
    selectedShoppingList: ShoppingList | undefined
    setSellectedShoppingList: React.Dispatch<React.SetStateAction<ShoppingList | undefined>>
    wasListSelected:boolean|undefined
    setWasListSelected:React.Dispatch<React.SetStateAction<boolean | undefined>>
    updateOnTheListPage:boolean
    setUpdateOnTheListPage: React.Dispatch<React.SetStateAction<boolean>>
    allfoodItems: foodItem[] | undefined
    SelectedListItems:ListfoodItem[] | undefined
    setSelectedListItems:React.Dispatch<React.SetStateAction<ListfoodItem[] | undefined>>
    itemQuantity:number|undefined,
    setItemQuantity:React.Dispatch<React.SetStateAction<number | undefined>>
    fromFood:boolean | undefined
    setFromFood:React.Dispatch<React.SetStateAction<boolean | undefined>>
    fromList:boolean | undefined
    setFromList:React.Dispatch<React.SetStateAction<boolean | undefined>>
    showAddForm: boolean | undefined
    setShowForm:React.Dispatch<React.SetStateAction<boolean | undefined>>
    showAddFormIncome:boolean | undefined
    setShowFormIncome: React.Dispatch<React.SetStateAction<boolean | undefined>>
    useExpenses: Expense[] | undefined
    setUserExpenses:React.Dispatch<React.SetStateAction<Expense[] | undefined>>
    userIncome:Income[]|undefined
    setUserIncome:React.Dispatch<React.SetStateAction<Income[] | undefined>>
    note:string|undefined
    setNote:React.Dispatch<React.SetStateAction<string | undefined>>
    showNote:boolean | undefined
    setShowNote:React.Dispatch<React.SetStateAction<boolean | undefined>>
    balance:number | undefined
    setBalance: React.Dispatch<React.SetStateAction<number | undefined>>
    balanceColor:boolean | undefined
    setBalanceColor:React.Dispatch<React.SetStateAction<boolean | undefined>>
  }

  type UserData = {
   _id:string,
   name:string,
   email:string,
   password:string,
   userId:string 
  }
  export type foodItem ={
    name:string,
    img:string,
    price:number,
    category:string
    _id?:string
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
    userId:string|undefined ,
    createdAt:number|undefined,
    _id?:string|undefined
    id?:string|undefined
    buyed:boolean|undefined
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
  export const groceryContext = createContext<GroceryContext>({
    userId:"", // set a default value
    setUserId: () => {},
    showNav:true,
    setShowNav:()=>{},   
    user:{name:"",email:"",password:"",_id:"",userId:""},
    setUser:()=>{},
    shoppingLists:[],
    setShoppingLists:()=>{},
    AllshoppingLists:[],
    setAllShoppingLists:()=>{},
    selectedFoodItem:{ name:"",img:"",price:0,category:"",_id:""},
    setSelectedFoodItem:()=>{},
    selectedShoppingList:{buyed:false,id:"",name:"" ,category:"" ,date:"" ,who:"" ,notes:"" ,totalPrice:0 ,items:[] ,userId:"" ,createdAt:undefined ,_id:""},
    setSellectedShoppingList:()=>{},
    wasListSelected:false,
    setWasListSelected:()=>{},
    updateOnTheListPage:false,
    setUpdateOnTheListPage:()=>{},
    allfoodItems:[],
    SelectedListItems:[],
    setSelectedListItems:()=>{},
    itemQuantity:0,
    setItemQuantity:()=>{},
    fromFood:false,
    setFromFood:()=>{},
    fromList:false,
    setFromList:()=>{},
    showAddForm:false,
    setShowForm:()=>{},
    showAddFormIncome:false,
    setShowFormIncome:()=>{},
    useExpenses:[],
    setUserExpenses:()=>{},
    userIncome:[],
    setUserIncome:()=>{},
    note:"",
    setNote:()=>{},
    showNote:false
    ,setShowNote:()=>{},
    balance:0
    ,setBalance:()=>{},
    balanceColor:false,
    setBalanceColor:()=>{}

  })
function Layout({children}:LayoutProps) {

  const [showNav,setShowNav]=useState<Boolean>(false)
  const [userId,setUserId]=useState<string>("")
  const [user,setUser]=useState<UserData>({name:"",email:"",password:"",_id:"",userId:""})
  const [shoppingLists,setShoppingLists]=useState<ShoppingList[]|undefined>()
  const [AllshoppingLists,setAllShoppingLists]=useState<ShoppingList[]|undefined>()
  const [selectedFoodItem,setSelectedFoodItem] = useState<foodItem>()
  const [selectedShoppingList,setSellectedShoppingList]=useState<ShoppingList>()
  const [wasListSelected,setWasListSelected] = useState<boolean|undefined>(false)
  const [updateOnTheListPage,setUpdateOnTheListPage] = useState<boolean>(false)
  const [SelectedListItems,setSelectedListItems] =useState<ListfoodItem[]|undefined>()
  const [foodItems,setFoodItems]= useState<foodItem[]>()
  const [allfoodItems,AllsetFoodItems]= useState<foodItem[]>()
  const [itemQuantity,setItemQuantity]= useState<number|undefined>()
  const [fromFood,setFromFood] = useState<boolean|undefined>()
  const [fromList,setFromList] = useState<boolean|undefined>()
  const[showAddForm,setShowForm] = useState<boolean|undefined>()
  const[showAddFormIncome,setShowFormIncome] = useState<boolean|undefined>()
  const [useExpenses,setUserExpenses] = useState<Expense[]|undefined>()
  const [userIncome,setUserIncome] = useState<Income[]|undefined>()
  const [note,setNote] = useState<string|undefined>()
  const [showNote,setShowNote] = useState<boolean|undefined>(false)
  const [balance,setBalance]= useState<number|undefined>()
  const [balanceColor,setBalanceColor] = useState<boolean|undefined>()
  useEffect(()=>{
    if(!allfoodItems || !foodItems){
      axios.get("http://localhost:3000/api/getFood").then((res)=>{
        setFoodItems(res.data)
        AllsetFoodItems(res.data)
      })
    }

  })
  return (
    <groceryContext.Provider value={{balanceColor,setBalanceColor,balance,setBalance,showNote,setShowNote,note,setNote,useExpenses,setUserExpenses,userIncome,setUserIncome,showAddFormIncome,setShowFormIncome,showAddForm,setShowForm,fromFood,setFromFood,fromList,setFromList,itemQuantity,setItemQuantity,SelectedListItems,setSelectedListItems, allfoodItems,updateOnTheListPage,setUpdateOnTheListPage,selectedShoppingList,setSellectedShoppingList,wasListSelected,setWasListSelected, selectedFoodItem,setSelectedFoodItem,userId,setUserId,showNav,setShowNav,user,setUser,shoppingLists,setShoppingLists,AllshoppingLists,setAllShoppingLists}}>
      <div className={styles.layout}>
          { showNav && <Navbar/>}
      <div className={styles.dataDisplay}>{children}</div>
      </div>
      </groceryContext.Provider>
  )
}

export default Layout