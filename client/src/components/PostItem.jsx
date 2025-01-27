import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
const PostItem = ({ postid, category, thumbnail, title, desc, authorid, createdAt }) => {
  const shortdesc = desc.length > 300 ? desc.substring(0, 300) + "..." : desc;

  
  return (
    <article className="aposts flex flex-col items-center">
      <div className="box-art">
        <div className="pi">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
        </div>
        <div className="flex flex-col">
          <div className="pt-3 pb-7 text_contain">
            <Link to={`/posts/${postid}`} className="">
              <h2>{title}</h2>
            </Link>
            <p dangerouslySetInnerHTML={{__html:shortdesc}}></p>
          </div>
          <div className="flex justify-between items-center">
            <PostAuthor authorId={authorid} createdAt={createdAt} />
            <Link to={`/posts/categories/${category}`} className="btn_post">
              {category}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
