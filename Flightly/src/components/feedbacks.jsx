import React from 'react'
import { AnimatedTestimonials } from '../ui/animated-testimonials'
import { testimonials } from '../data'

const Feedbacks = () => {
  return (
    <div className='flex md:p-20 justify-center items-center h-full w-full '>
    <span className='text-center w-full text-white text-xl md:text-4xl font-bold p-10'>Ready to start your journey?Join <span className='text-violet900'> thousands</span> of happy travelers who trust Flightly for unforgettable experiences.</span>
        <AnimatedTestimonials testimonials={testimonials}/>
    </div>
  )
}

export default Feedbacks