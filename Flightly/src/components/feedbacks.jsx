import React from 'react'
import { AnimatedTestimonials } from '../ui/animated-testimonials'
import { testimonials } from '../data'

const Feedbacks = () => {
  return (
    <div className='flex justify-center items-center h-[80vh] w-full bg-gradient-to-b from-violet900 to-violet800'>
    <span className='text-center w-[50%] text-white text-4xl font-bold p-5'>Ready to start your journey? Join thousands of happy travelers who trust Flightly for unforgettable experiences.</span>
        <AnimatedTestimonials testimonials={testimonials}/>
    </div>
  )
}

export default Feedbacks