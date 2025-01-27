import React from "react";
import { useState, useContext,useEffect } from "react";
import DashboardPosts from "./DashboardPosts";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const {currentuser}= useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const token= currentuser?.token
  const navigate= useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  useEffect(() => {
    const fetchPosts= async()=>{
      setLoading(true)
      try {
        const response= await axios.get(`${process.env.REACT_APP_URL}/posts/users/${id}`,{withCredentials:true, headers:{Authorization:`Bearer ${token}`}} )
        setPosts(response.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
      
    }
    fetchPosts()
  }, [id])
  if(loading){
    return <Loader/>
  }
  return (
    <div className="dashboard-wrapper posts">
      <div className="dashboard-container">
        {posts.length > 0 ? (
          posts.map(({ _id:id, thumbnail, title }) => (
            <DashboardPosts key={id} id={id} thumbnail={thumbnail} title={title} />
          ))
        ) : (
          <h1 className="text-center">No posts</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
