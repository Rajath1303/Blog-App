import React from 'react'
import Load from '../images/loading-loading-forever.gif'
const Loader = () => {
  return (
    <section>
      <div className='flex flex-col justify-center items-center h-screen gap-20'>
        <img src={Load} alt="" />
      </div>
    </section>
  )
}

export default Loader
