import React from 'react'

const Footer = () => {
  return (
    <footer className='bottom-0 w-full min-h-[300px] bg-violet900 flex justify-center items-center'>
        <div className='flex flex-col items-center text-sm md:text-lg justify-center w-full h-full'>
            <h2 className='text-xl font-bold text-white'>Flightly</h2>
            <p className='text-sm md:text-lg text-white'>Your travel companion</p>
            <div className='flex space-x-4 mt-4 '>
            <a href="#" className='text-white'>Privacy Policy</a>
            <a href="#" className='text-white'>Terms of Service</a>
            <a href="#" className='text-white'>Contact Us</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer