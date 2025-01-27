import React, {useContext} from 'react'
import {UserContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom'
const Logout = () => { 
  const {setCurrentuser}= useContext(UserContext)
  const navigate= useNavigate()
  setCurrentuser(null)
  navigate('/login')
  return (
    <div>
      
    </div>
  )
}

export default Logout
