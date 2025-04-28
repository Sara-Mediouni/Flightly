import React, { useEffect, useRef, useState } from 'react';
import plane from '../assets/plane.svg';
import { gsap } from "gsap";
import { useWindowScroll } from "react-use";  
import { navItems } from '../data';
import { RxAvatar } from "react-icons/rx";
import { HiMenu, HiX } from "react-icons/hi";
import LoginSignupModal from './LoginSignupModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { closeLoginPopup, openLoginPopup } from '../redux/uiSlice';

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);

 const token = useSelector((state) => state.auth.token);
 const [open, setOpen] = useState(false);
 const dispatch = useDispatch();
 const navigate=useNavigate();
 const showLoginPopup = useSelector((state) => state.ui.showLoginPopup);



  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
   
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);
  const handleLogout=()=>{
    dispatch(clearToken());
    localStorage.clear();
  }
  const handleProfile=()=>{
    navigate('/user')
  }
  const handleReservation=()=>{
    navigate('/my')
  }
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add('floating-nav');
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  return (
    <div className="top-0 flex justify-between items-center bg-transparent z-[5000] relative">
    {/* Hamburger button (mobile only) */}
    <div className="md:hidden absolute left-5 top-5 z-[6000]">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-violet-900">
        {isMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
      </button>
    </div>
  
    {/* LOGO */}
    <div className='absolute left-1/2 transform -translate-x-1/2 md:translate-x-0 top-5 md:left-10 md:top-18 z-[6000] flex items-center font-Rangile font-bold text-white md:text-3xl text-2xl'>
      Flightly <img src={plane} alt="airplane" className='w-5 h-5 md:h-10 md:w-10 ml-2' />
    </div>
  
    {/* Avatar Icon */}
    <div className="absolute md:right-5 right-5 md:top-18 top-5 z-[6000] flex items-center">
      {token ? (
        <div className="relative">
          <button onClick={() => setOpen(!open)}>
            <RxAvatar color="#231942" size={30} />
          </button>
  
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => handleReservation()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Reservations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleProfile()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => dispatch(openLoginPopup())}
          className="flex justify-center items-center px-2 font-bold text-white rounded-full border-2 border-violet700 w-30 h-10"
        >
          Login
        </button>
      )}
    </div>
  
    {/* NAVBAR LINKS */}
    <div
      ref={navContainerRef}
      className={`${
        isMenuOpen ? 'flex' : 'hidden'
      } md:flex flex-col md:flex-row font-bold min-w-fit md:left-50
      fixed z-[5000] top-20 md:top-10 md:mx-auto px-6 md:px-10 
      md:py-10 py-5 rounded-lg items-center justify-center space-y-5 md:space-y-0 
      space-x-0 md:space-x-8 md:text-lg text-sm bg-white md:bg-transparent shadow md:shadow-none w-full md:w-auto max-w-screen-lg`}
    >
      {navItems.map((navItem, idx) => (
        <a
          key={`${idx}`}
          href={navItem.link}
          className="relative md:text-xl text-sm dark:text-violet900 
          items-center flex dark:hover:text-white text-violet900"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="!cursor-pointer text-sm md:text-xl">{navItem.name}</span>
        </a>
      ))}
    </div>
  
    {showLoginPopup && <LoginSignupModal onClose={() => dispatch(closeLoginPopup())} />}
  </div>
  
  );
};

export default Navbar;
