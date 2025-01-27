import React, { useEffect, useContext } from "react";
import {Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
const DeletePost = ({postId}) => {
  const { currentuser } = useContext(UserContext);
  const token = currentuser?.token;
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const removepost= async ()=>{
    console.log(location.pathname)
    console.log(`/myposts/${currentuser.id}`)
    try {
      const response= await axios.delete(`${process.env.REACT_APP_URL}/posts/${postId}`, {withCredentials:true, headers:{Authorization:`Bearer ${token}`}})
      if(response.status==200){
        if(location.pathname==`/myposts/${currentuser.id}`){
          navigate(0)
        }else{
          navigate('/')
        }
      }
    } catch (err) {
      console.log("Couldn't delete the posts");
      
    }
  }
  return (
    <div className="btn_delete text-center">
      <Link onClick={()=>removepost(postId)}>Delete</Link>
    </div>
  );
};

export default DeletePost;
