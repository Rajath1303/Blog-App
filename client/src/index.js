import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Authors from "./pages/Authors";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile"
import AuthorPosts from "./pages/AuthorPosts"
import CategoryPosts from './pages/CategoryPosts';
import DeletePost from './pages/DeletePost'
import UserProvider from './context/userContext';


const router= createBrowserRouter([{
  path:"/",
  element: <UserProvider><Layout/></UserProvider>,
  errorElement:<ErrorPage/>,
  children:[
    {index:true, element:<Home/>},
    {path:"posts/:id", element:<PostDetail/>},
    {path:"register", element:<Register/>},
    {path:"login", element:<Login/>},
    {path:"profile/:id", element:<UserProfile/>},
    {path:"authors", element:<Authors/>},
    {path:"posts/users/:id", element:<AuthorPosts/>},
    {path:"posts/categories/:category", element:<CategoryPosts/>},
    {path:"create", element:<CreatePost/>},
    {path:"posts/:id/edit", element:<EditPost/>},
    {path:"posts/:id/delete", element:<DeletePost/>},
    {path:"logout", element:<Logout/>},
    {path:"myposts/:id", element:<Dashboard/>},
  ]
}])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>

);
