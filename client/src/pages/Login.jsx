import React from 'react'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../context/userContext'

const Login = () => {
  const navigate= useNavigate()
  const [error, setError] = useState('')
  const [Form, setForm] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })
  const changehandler=(e)=>{
    setForm(form=>{
      return {...form, [e.target.name]:e.target.value};
    })
  }
  const {currentuser, setCurrentuser}= useContext(UserContext)
  const loginUser= async (e)=>{
    e.preventDefault()
    setError('')
    try {
      const response= await axios.post(`${process.env.REACT_APP_URL}/users/login`, Form)
      const user= response.data
      setCurrentuser(user)
      navigate('/')
      
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className="posts flex justify-center items-center">
      <div className="register">
        
        <h1 className="mt-10">Sign In</h1>
        {error &&
        <div className="error-register mt-5">
          <div className="error-register-box">
            {error}
          </div>
        </div>
        }
        <form className="input flex flex-col pb-5" onSubmit={loginUser}>
          <input type="text" placeholder="Email" name="email" value={Form.email} onChange={changehandler} />
          <input type="password" placeholder="Password" name="password" value={Form.password} onChange={changehandler} />
          <button className="register-btn" type="submit">LogIn</button>
        </form>
        <small>Dont have an Account? <Link className="text-purple-400" to={`/register`} >SignUp</Link></small>
      </div>
    </div>
  )
}

export default Login
