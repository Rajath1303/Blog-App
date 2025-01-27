import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import nodp from '../images/blank-profile-picture-973460_1280.webp'
const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchusers= async ()=>{
      setLoading(true)
      try {
        const response= await axios.get(`${process.env.REACT_APP_URL}/users`)
        setAuthors(response.data)
        
      } catch (err) {
        console.log(err);
      }
      setLoading(false)
    }
    fetchusers()
  }, [])

  if(loading){
    return <Loader/>
  }
  return (
    <div className="authors posts">
      <div
        className={
          authors.length === 0
            ? "flex justify-center center-no-post items-center"
            : "authors-container"
        }
      >
        {authors.length > 0 ? (
          authors.map(({ _id:id, avatar, name, posts }) => {
            
            return (
              <Link
                className="author flex justify-start gap-3"
                to={`/posts/users/${id}`}
                key={id}
              >
                <div className="author-img">
                  <img src={avatar ? `${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}` : nodp} alt={name} />
                </div>
                <div>
                  <div className="author-title">{name}</div>
                  <div className="author-post">{posts}</div>
                </div>
              </Link>
            );
          })
        ) : (
          <h1 className="text-2xl font-semibold">No Users/Authors found</h1>
        )}
      </div>
    </div>
  );
};

export default Authors;
