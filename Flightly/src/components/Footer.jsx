import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center w-full h-[30vh] bg-violet900'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <h2 className='text-2xl font-bold text-white'>Flightly</h2>
            <p className='text-lg text-white'>Your travel companion</p>
            <div className='flex space-x-4 mt-4'>
            <a href="#" className='text-white'>Privacy Policy</a>
            <a href="#" className='text-white'>Terms of Service</a>
            <a href="#" className='text-white'>Contact Us</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer