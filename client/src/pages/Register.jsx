import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios' 


const Register = () => {
  const [error, setError] = useState('')
  const navigate= useNavigate()
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
  
  const registerUser= async (e)=>{
    e.preventDefault()
    setError('')
    try {
      const response= await axios.post(`${process.env.REACT_APP_URL}/users/register`, Form)
      const newUser= await response.data
      console.log(newUser);
      if(!newUser){
        setError("Couldn't register new user")
      }
      navigate('/login')
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <div className="posts flex justify-center items-center">
      <div className="register">
        <h1 className="mt-10">Sign Up</h1>
        {error &&
        <div className="error-register mt-5">
          <div className="error-register-box">
            {error}
          </div>
        </div>
        }
        <form className="input flex flex-col pb-5" onSubmit={registerUser}>
          <input type="text" placeholder="Full Name" name="name" value={Form.name} onChange={changehandler}  />
          <input type="text" placeholder="Email" name="email" value={Form.email} onChange={changehandler} />
          <input type="password" placeholder="Password" name="password" value={Form.password} onChange={changehandler} />
          <input type="password" placeholder="Confirm Password" name="password2" value={Form.password2} onChange={changehandler} />
          <button className="register-btn" type="submit">Register</button>
        </form>
        <small>Already have an Account? <Link className="text-purple-400" to={`/login`} >SignIn</Link></small>
      </div>
    </div>
  );
};

export default Register;
