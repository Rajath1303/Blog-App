import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { UserContext } from "../context/userContext";

const Header = () => {
  const { currentuser } = useContext(UserContext);
  const [NavBar, setNavBar] = useState(window.innerWidth > 1200 ? true : false);
  const closeNavhandler = () => {
    if (window.innerWidth < 1200) {
      setNavBar(false);
    } else {
      setNavBar(true);
    }
  };
  return (
    <nav className="fixed top-0  left-0 z-1 w-full p-5">
      <div className="flex justify-around nav">
        <Link to="/">
          <img
            src={Logo}
            alt=""
            className="size-10"
            onClick={closeNavhandler}
          />
        </Link>

        <div className="flex gap-10 items-center nav-menu-container">
          {currentuser?.id && NavBar && (
            <ul className="flex gap-5 items-center text-slate-600 nav-menu">
              <li onClick={closeNavhandler}>
                <Link to={`/profile/${currentuser?.id}`}>{currentuser.name}</Link>
              </li>
              <li onClick={closeNavhandler}>
                <Link to="/create">Create Post</Link>
              </li>
              <li onClick={closeNavhandler}>
                <Link to="/authors">Authors</Link>
              </li>
              <li onClick={closeNavhandler}>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          )}
          {!currentuser?.id && NavBar && (
            <ul className="flex gap-5 items-center text-slate-600 nav-menu">
              <li onClick={closeNavhandler}>
                <Link to="/authors">Authors</Link>
              </li>
              <li onClick={closeNavhandler}>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
          {window.innerWidth < 1200 && (
            <button onClick={() => setNavBar(!NavBar)}>
              {NavBar ? <AiOutlineClose /> : <FaBars />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
