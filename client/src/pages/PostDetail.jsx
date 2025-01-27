import React, { useState, useEffect, useContext } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import Thumbnail from "../images/images.jpeg";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext";
import axios from "axios";
import ErrorPage from './ErrorPage'
const PostDetail = () => {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentuser } = useContext(UserContext);

  
  useEffect(() => {
    const getpost=  async ()=>{
      setLoading(true)
      try {
        const response= await axios.get(`${process.env.REACT_APP_URL}/posts/${id}`)
        setPost(response.data)
        setCreatorId(response.data.creator)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    getpost()

  }, [])
  
  if(loading){
    return <Loader/>
  }
  return (
    <>
      {error && (
        <div className="error-register mt-5">
          <div className="error-register-box">{error}</div>
        </div>
      )}
     {post && <div className="flex justify-center">
        <div className="single-post-container ">
          <div className="single-post-profile flex justify-between items-center pb-10">
            <PostAuthor authorId={post.creator} createdAt={post.createdAt}/>
            {currentuser?.id == post?.creator && (
              <div className="flex gap-2 single-post-btn">
                <div className="btn_edit text-center">
                  <Link to={`/posts/${post._id}/edit`}>Edit</Link>
                </div>
                <DeletePost postId={id}/>
              </div>
            )}
          </div>
          <h1 className="pb-5">{post.title}</h1>
          <div className="flex justify-center pb-5">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
          </div>
          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
      </div>}
    </>
  );
};

export default PostDetail;
