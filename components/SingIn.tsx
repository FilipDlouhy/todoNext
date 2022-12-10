import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/SingInForm.module.css"
import { groceryContext } from './Layout'
function SingIn() {
  const [email,setEmail]= useState<String>()
  const [family,setFamily]= useState<String>()
  const [password,setPassword]= useState<String>()
  const {setUserId} = useContext(groceryContext)
  const {userId} = useContext(groceryContext)
  const {setUser} = useContext(groceryContext)
  const {setShowNav} = useContext(groceryContext)
  const [heading,setHeading] = useState<string>()

  const router = useRouter()
  useEffect(()=>{
    setHeading("Sing In and do some Shopping")
  },[])
  return (
    <form className={styles.signForm}> 

            
                <h1>{heading&&heading}</h1>
            
                <Link href={"/login"}>Or You Aleready have an Account</Link>
            <div>
                <label>Your Email</label>
                <input onChange={(e)=>{
                 setEmail(e.target.value)
                }} type="email"></input>
            </div>
    
            <div>
                <label>Family Name</label>
                <input type="text"  onChange={(e)=>{
                 setFamily(e.target.value)
                }}></input>
            </div>

            <div>
                <label >Password</label>
                <input onChange={(e)=>{
                 setPassword(e.target.value)
                }} type="password"></input>
            </div>

            <button onClick={async (e)=>{
              e.preventDefault()

              if(email&&family&&password){
                if(email.length>0 &&family.length>0 &&password.length>0)
                {
                  let newUser = {
                    email:email,
                    password:password,
                    family:family
                  }
                  axios.post("/api/new-user",newUser).then((res)=>{
                    setUserId(res.data.userId)
                    axios.get(`/api/${res.data.userId}`).then((res)=>{
                      setUser(res.data)
                      setShowNav(true)
                      router.push(`/groceries/index/${res.data.userId}`)
                    })
                  })
                }else{setHeading("FILL ALL  ")}

              }else{setHeading("FILL ALL  ")}


            }}>Sign In</button>
    
    </form>
  )
}

export default SingIn