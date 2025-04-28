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
            Discover <span className="text-violet900">our packs</span> now
            <br className="hidden md:block" />
            and live the dream
          </h1>
          <p className="text-white text-lg md:text-xl">
            Ready to explore the world in luxury? From breathtaking destinations to exclusive flights —
            we take care of everything for you.
          </p>
          <div>
            <button className="mt-4 font-bold inline-block px-8 py-4 bg-violet900 text-white text-sm md:text-base  rounded-full shadow-lg hover:bg-violet-300 transition duration-300">
              Discover
            </button>
          </div>
        </div>

        {/* Animation Lottie */}
        <div className="flex justify-center md:justify-end">
        <img src={image2}/>
        </div>
      </div>
    </section>
  )
}

export default Section
