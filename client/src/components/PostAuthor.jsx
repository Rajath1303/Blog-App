import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-timeago";
import TimeAgo from "javascript-time-ago";
import nodp from "../images/blank-profile-picture-973460_1280.webp";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const PostAuthor = ({ authorId, createdAt }) => {
  const [author, setAuthor] = useState({});
  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/users/${authorId}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <Link to={`/posts/users/${authorId}`} className="flex author gap-2">
      <div>
        <img
          src={
            author?.avatar
              ? `${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`
              : nodp
          }
          alt=""
          className="author-avatar"
        />
      </div>
      <div>
        <h5>By {author.name}</h5>
        <small>
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
