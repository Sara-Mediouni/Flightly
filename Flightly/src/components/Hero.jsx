import React from 'react'
import image2 from '../assets/download (2).svg'

import AnimatedTitle from '../ui/Animated-title'
import { TextGenerateEffect } from '../ui/text-generate-effect'



const Hero = () =>
    
    
    
{
  return (
<section className='flex hero items-center justify-center h-screen mt-20 p-5'>
  <div className='flex items-center justify-center h-full w-full px-1'>
    
    <img src={image2} className='h-[50%] left-0' />
   
    <span id="text-hero" className='text-white text-3xl max-w-xl left-5'>
      <TextGenerateEffect
        words="Explore the world with ease — your next adventure starts here."
      />
    </span>
    
  </div>
</section>
   
  )
}

export default Hero