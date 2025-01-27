import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
const Footer = () => {
  return (
    <footer className='footer'>
      <ul className='footer_c'>
        <li className=''><Link to="/posts/categories/Agriculture">Agriculture</Link></li>
        <li className=''><Link to="/posts/categories/Business">Business</Link></li>
        <li className=''><Link to="/posts/categories/Education">Education</Link></li>
        <li className=''><Link to="/posts/categories/Entertainment">Entertainment</Link></li>
        <li className=''><Link to="/posts/categories/Art">Art</Link></li>
        <li className=''><Link to="/posts/categories/Investment">Investment</Link></li>
        <li className=''><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>
        <li className=''><Link to="/posts/categories/Weather">Weather</Link></li>
      </ul>
      <div className='text-center copyright'>
        <small>All rights reserved &copy; Copyright, Rajath</small>
      </div>
    </footer>
  )
}

export default Footer
