import React, { useRef } from 'react'
import img1 from '../assets/kyoto.jpg'
import img2 from '../assets/mountain.jpg'
import img3 from '../assets/santorini.jpg'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const TopTours = () => {
   const image1 = useRef(null)
    const image2 = useRef(null)
    const image3 = useRef(null)
    
    const images = [image1, image2, image3]
  useGSAP(() => {
    // GSAP animation for each image on scroll
    images.forEach((card, index) => {
      gsap.fromTo(
        card.current,
        {
          y: -100,
          opacity: 0,
        },
       
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card.current,
            start: 'top bottom-=100',
            toggleActions: "play reset play reset",
          },
        }
      )
    })
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-12 relative w-full h-full mt-20">
  <img src={img1}  ref={image1} className="w-full h-48 object-cover rounded-lg shadow-md translate-y-4 " />
  <img src={img2} ref={image2} className="w-full h-60 object-cover rounded-lg shadow-lg scale-105" />
  <img src={img3} ref={image3} className="w-full h-48 object-cover rounded-lg shadow-md -translate-y-4" />
</div>
  )
}

export default TopTours