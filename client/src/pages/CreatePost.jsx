import React, { useState, useContext, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/userContext'
import axios from 'axios'
const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const {currentuser}= useContext(UserContext)
  const [error, setError] = useState('')
  const token= currentuser?.token
  const navigate= useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  const modules={
    toolbar:[
      [{'header':[1,2,3,4,5,6,false]}],
      ['bold','italic','underline','strike','blockquote'],
      [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
      ['link','image'],
      ['clean']
    ]
  }
  const formats=[
    'header','bold','italic','underline','strike','blockquote','list','bullet','indent','link','image'
  ]
  const Post_Categories=[
    'Agriculture','Business','Education','Entertainment','Art','Investment','Uncategorized','Weather'
  ]
  const createPost= async (e)=>{
    e.preventDefault()
    const postData= new FormData()
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try {
      const response= await axios.post(`${process.env.REACT_APP_URL}/posts`, postData, {withCredentials:true, headers:{Authorization: `Bearer ${token}`}})
      if(response.status==201){
        return navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <div className='create-post posts'>
      <div className="create-post-container">
        <h2>Create Post</h2>
        {error && <p className='error-register w-1/2 text-center'>{error}</p>}
        <form className='input flex flex-col' onSubmit={createPost}>
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder='Title' autoFocus />
          <select name="Category" value={category} onChange={e=>setCategory(e.target.value)}>
            {
              Post_Categories.map(cat=> <option key={cat}>{cat}</option> )
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} className='mb-8 quil-mod' />
          <input type="file" onChange={e=>setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type='submit' className='btn_edit' >Create</button>
        </form>
      </div>
      
    </div>
  )
}

export default CreatePost
