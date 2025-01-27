import React from "react";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
const DashboardPosts = ({ id, thumbnail, title }) => {
  return (
    <div className="dashboard-unit">
      <div className="flex items-center gap-4">
        <div className="dashboard-photo-border">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt="" />
        </div>
        <h4>{title}</h4>
      </div>
      <div className="dashboard-unit-btn flex gap-2">
        <Link to={`/posts/${id}`} className="btn-view flex justify-center items-center">View</Link>
        <div className="edit-delete-container">

        <Link to={`/posts/${id}/edit`} className="btn_edit text-center">Edit</Link>
        <DeletePost postId={id} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPosts;
