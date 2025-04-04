import React, { useEffect, useRef, useState } from 'react'
import plane from '../assets/plane.svg'
import {gsap} from "gsap";
import { useWindowScroll } from "react-use";  
import { navItems } from '../data';

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const {y:currentScrollY}=useWindowScroll();
  const navContainerRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(()=>{
    gsap.to(navContainerRef.current,{
      y: isNavVisible ? 0:-100,
      opacity: isNavVisible ?1:0,
      duration:0.2,
    })
  
  },[isNavVisible]);
  useEffect(() => {
    if (currentScrollY===0){
      setIsNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav');}
      else if(currentScrollY>lastScrollY){
        setIsNavVisible(false);
        navContainerRef.current.classList.add('floating-nav');
      }
      else if (currentScrollY<lastScrollY){
        setIsNavVisible(true);
        navContainerRef.current.classList.add('floating-nav');
      }
      setLastScrollY(currentScrollY);
    }
    ,[currentScrollY,lastScrollY]);
  return (
    <div className='top-0 flex justify-center items-center w-full bg-transparent'>

    {/* NAVBAR */}
    <div
      ref={navContainerRef}
      className='flex font-bold max-w-fit md:min-w-[70vw] 
      lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto 
      px-10 py-5 rounded-lg items-center justify-center space-x-8 !text-lg'
    >
      {navItems.map((navItem, idx) => (
        <a
          key={`${idx}`}
          href={navItem.link}
          className="relative !text-xl  dark:text-violet900 items-center flex space-x-1 
          dark:hover:text-white"
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="!cursor-pointer text-xl">{navItem.name}</span>
        </a>
      ))}
    </div>
   <div
      className='relative top-15 -left-100 z-[5000] 
      px-5 py-2 rounded-lg flex items-center 
      justify-center font-Rangile font-bold text-white text-3xl'
    >
      Flightly <img src={plane} alt="airplane" className='w-10 h-10 ml-2' />
    </div>
    {/* LOGO */}
   
  
  </div>
 
 )
}

export default Navbar