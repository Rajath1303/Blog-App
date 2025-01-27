import React from 'react'
import { useState, useEffect } from "react";
import PostItem from '../components/PostItem'
import axios from 'axios';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const {category}= useParams()
  
  useEffect(() => {
    const fetchposts= async ()=>{
      setLoading(true)
      try {
        const response= await axios.get(`${process.env.REACT_APP_URL}/posts/categories/${category}`)
        setPosts(response.data) 
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchposts()
  }, [category])
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
}

export default CategoryPosts
