import React, { useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import nodp from "../images/blank-profile-picture-973460_1280.webp";
import axios from "axios";
const UserProfile = () => {
  const { currentuser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [avatartouched, setAvatartouched] = useState(false);
  const token = currentuser?.token;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentpassword, setCurrentPasword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const changeAvatarHandler = async () => {
    setAvatartouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getavatar = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/users/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response.data?.avata);
    };
    getavatar();
  }, []);
  const edit_user = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.set("name", name);
      postData.set("email", email);
      postData.set("currentPassword", currentpassword);
      postData.set("newPassword", newpassword);
      postData.set("confirmPassword", confirmpassword);
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/users/edit-user`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 200) {
        navigate("/logout");
      }
    } catch (err) {
      
      setError(err.response.data.message)
    }
  };

  return (
    <section className="profile flex justify-center posts">
      <div className="profile-container">
        <div className="profile-detail flex flex-col justify-center items-center gap-5">
          <Link className="btn-profile text-slate-600" to={`/myposts/${id}`}>
            My Posts
          </Link>
          <div className="profile-photo-wrapper">
            <div className="profile-photo-border">
              <img
                src={ avatar ?`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}` :nodp}
                alt="Profile Pic"
              />
            </div>
            <form className="profile-form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/jpeg, image/png"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                }}
              />
              <label htmlFor="avatar" onClick={() => setAvatartouched(true)}>
                <FaEdit />
              </label>
            </form>

            {avatartouched && (
              <button className="profile-check" onClick={changeAvatarHandler}>
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{currentuser.name}</h1>
        </div>
        <form className="profile-form-fill input" onSubmit={edit_user}>
          {error && (
            <p className="error-register text-center">
              {error}
            </p>
          )}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Current Password"
            value={currentpassword}
            onChange={(e) => {
              setCurrentPasword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newpassword}
            onChange={(e) => {
              setNewpassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmpassword(e.target.value);
            }}
          />
          <button className="btn-update-details" type="submit">
            Update Details
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
