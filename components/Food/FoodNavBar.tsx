import React from 'react'
import styles from "../../styles/Food/FoodNavbar.module.css"

export type foodItem ={
    name:string,
    img:string,
    price:number,
    category:string
    _id:string
  }
type navbarProps={
    setFoodItems: React.Dispatch<React.SetStateAction<foodItem[]|undefined>>,
    foodItems:foodItem[]|undefined,
    allfoodItems:foodItem[]|undefined
}
function FoodNavbar(props:navbarProps) {
    
    function manipulateFood(category:string){
        switch(category) { 
            case "All": { 
               props.setFoodItems(props.allfoodItems) 
               break; 
            } 
            case "Vegetable": { 
               let arr = props.allfoodItems
               let finalArr:foodItem[]=[]
               arr?.map((food:foodItem)=>{
                if(food.category === "Vegetable"){
                    finalArr.push(food)
                }
               })
               props.setFoodItems(finalArr)
               break; 
            } 

            case "Meat": { 
                let arr = props.allfoodItems
                let finalArr:foodItem[]=[]
                arr?.map((food:foodItem)=>{
                 if(food.category === "Meat"){
                     finalArr.push(food)
                 }
                })
                props.setFoodItems(finalArr)
                break; 
             } 
             case "Fruit": { 
                let arr = props.allfoodItems
                let finalArr:foodItem[]=[]
                arr?.map((food:foodItem)=>{
                 if(food.category === "Fruit"){
                     finalArr.push(food)
                 }
                })
                props.setFoodItems(finalArr)
                break; 
             }   
             case "Milk": { 
                let arr = props.allfoodItems
                let finalArr:foodItem[]=[]
                arr?.map((food:foodItem)=>{
                 if(food.category === "Milk"){
                     finalArr.push(food)
                 }
                })
                props.setFoodItems(finalArr)
                break; 
             } 
             case "Other": { 
                let arr = props.allfoodItems
                let finalArr:foodItem[]=[]
                arr?.map((food:foodItem)=>{
                 if(food.category === "Other"){
                     finalArr.push(food)
                 }
                })
                props.setFoodItems(finalArr)
                break; 
             } 
             case "Pastry": { 
                let arr = props.allfoodItems
                let finalArr:foodItem[]=[]
                arr?.map((food:foodItem)=>{
                 if(food.category === "Pastry"){
                     finalArr.push(food)
                 }
                })
                props.setFoodItems(finalArr)
                break; 
             } 
            default: { 
                props.setFoodItems(props.allfoodItems) 
               break; 
            } 
         }  

    }
  return (
    <div className={styles.foodNavbar}>

        <input onChange={(e)=>{
            if(e.target.value.length === 0)
            {
                props.setFoodItems(props.allfoodItems)  
            }
            let arr = props.allfoodItems
            let finalArr:foodItem[]=[]
            arr?.map((item)=>{
                if(item.name.toLowerCase().includes(e.target.value.toString().toLowerCase()))
                {
                    finalArr.push(item)
                }
            })
            props.setFoodItems(finalArr)
            
        }} type="text" placeholder="Find food item..."></input>

            <div onClick={()=>{
                    manipulateFood("All")
            }} className={styles.foodNavbarDiv}>
                <p>All</p>
            </div>

            <div  onClick={()=>{
                    manipulateFood("Vegetable")
            }} className={styles.foodNavbarDiv}>
                <p>Vegetables</p>
            </div>

            <div  onClick={()=>{
                    manipulateFood("Meat")
            }}  className={styles.foodNavbarDiv}>
                <p>Meat</p>
            </div>
            
            <div   onClick={()=>{
                    manipulateFood("Fruit")
            }} className={styles.foodNavbarDiv}>
                <p>Fruit</p>
            </div>
            
            <div   onClick={()=>{
                    manipulateFood("Milk")
            }}className={styles.foodNavbarDiv}>
                <p>Milk</p>
            </div>

            <div   onClick={()=>{
                    manipulateFood("Pastry")
            }}className={styles.foodNavbarDiv}>
                <p>Pastry</p>
            </div>

            <div   onClick={()=>{
                    manipulateFood("Other")
            }} className={styles.foodNavbarDiv}>
                <p>Other</p>
            </div>



    </div>
  )
}

export default FoodNavbar