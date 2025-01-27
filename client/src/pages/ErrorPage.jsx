import React from 'react'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <section>
      <div className='flex flex-col justify-center items-center h-screen gap-20'>
        <h1 className='text-6xl text-slate-600 text-center'>Page Not Found</h1>
        <Link to="/" className='text-2xl btn'>Go Back</Link>
      </div>
    </section>
  )
}

export default ErrorPage
