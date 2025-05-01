import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from '../assets/Animation - 1744668034987.json'
import image2 from '../assets/download (2).svg'

const Section = () => {
  return (
    <section className="py-20 px-6 md:px-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Texte */}
      <div className="text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-snug">
          Discover our <span className="text-violet900">travel packs</span>
          <br className="hidden md:block" />
          and unlock unforgettable moments
        </h1>
        <p className="text-white text-lg md:text-xl">
          Whether it's luxury resorts, dreamy beach escapes, or exclusive flights — our tailored travel packs offer everything you need for a stress-free adventure.
        </p>
        <div>
          <button className="mt-4 font-bold inline-block px-8 py-4 bg-violet900 text-white text-sm md:text-base rounded-full shadow-lg hover:bg-violet-300 transition duration-300">
            Explore Packages
          </button>
        </div>
      </div>
  
      {/* Animation ou Image */}
      <div className="flex justify-center md:justify-end">
        <img src={image2} alt="Travel illustration" className="max-w-full h-auto" />
      </div>
    </div>
  </section>
  
  )
}

export default Section
