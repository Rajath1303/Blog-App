import React from "react";
import { useState, useContext, useEffect } from "react";
import PostItem from "./PostItem";
import Loader from "./Loader";
import axios from 'axios'
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchposts= async ()=>{
      setLoading(true)
      try {
        const response= await axios.get(`${process.env.REACT_APP_URL}/posts`)
        setPosts(response.data) 
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchposts()
  }, [])
  if(loading){
    return <Loader/> 
  }
  
  return (
    <section className="posts flex justify-center">
      <div className={posts.length===0?'flex justify-center center-no-post items-center':'post_container'} >
        {posts.length > 0 ? (
          posts.map(({ _id:id, thumbnail, category, title, description, creator ,createdAt}) => (
            <PostItem
              key={id}
              postid={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              desc={description}
              authorid={creator}
              createdAt={createdAt}
            />
          ))
        ) : (
            <h1 className="text-2xl font-semibold">No Posts</h1>
        )}
      </div>
    </section>
  );
};

export default Posts;
