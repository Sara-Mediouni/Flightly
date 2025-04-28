import React from 'react'

import { TextGenerateEffect } from '../ui/text-generate-effect'



const Hero = () =>
    
    
    
{
  return (
    <section
    className="hero relative top-0 left-0 w-full h-full py-50"
   
  >
    <div className="flex items-center justify-center h-full w-full bg-black/40"> {/* Assombrir un peu pour lisibilité */}
      <span
        id="text-hero"
        className="text-white text-2xl md:text-4xl font-bold text-center p-10 max-w-2xl"
      >
        <TextGenerateEffect
          words="Explore the world with ease — your next adventure starts here."
        />
      </span>
    </div>
  </section>
   
  )
}

export default Hero