import React, { useCallback, useContext } from 'react'
import styles from "../../styles/Finances/FinanceNote.module.css"
import { groceryContext } from '../Layout'
function Note() {
  const {note} =useContext(groceryContext)
  const {setShowNote} =useContext(groceryContext)
    return (

    <div className={styles.note}>
        <button onClick={()=>{
            setShowNote(false)
        }}>X</button>
        <p>{note&&note}</p>
    </div>
  )
}

export default Note