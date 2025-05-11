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
 <div className="fixed top-8 w-full flex items-center justify-between px-6 py-4 bg-transparent z-[5000] ">

  {/* Logo */}
  <div className="flex items-center font-Rangile font-bold text-white text-2xl md:text-3xl z-[6000]">
    Flightly
    <img src={plane} alt="airplane" className="w-5 h-5 md:w-10 md:h-10 ml-2" />
  </div>

  {/* Menu Burger (mobile) */}
  <div className="md:hidden z-[6000]">
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
      {isMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
    </button>
  </div>

  {/* Navigation items */}
  <div
    ref={navContainerRef}
    className={`${
      isMenuOpen ? 'flex' : 'hidden'
    } navbar-style`}
  >
    {navItems.map((navItem, idx) => (
      <a
        key={idx}
        href={navItem.link}
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center text-sm md:text-lg font-bold md:text-white text-violet900 hover:text-violet700"
      >
        <span className="block md:hidden mr-2">{navItem.icon}</span>
        {navItem.name}
      </a>
    ))}
  </div>

  {/* Login / Avatar */}
  <div className="relative z-[6000]">
    {token ? (
      <div className="relative">
        <button onClick={() => setOpen(!open)}>
          <RxAvatar color="#231942" size={30} />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <button onClick={handleReservation} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Reservations
                </button>
              </li>
              <li>
                <button onClick={handleProfile} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Profile
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
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
        className="px-4 py-2 font-bold text-white border-2 border-violet700 rounded-full"
      >
        Login
      </button>
    )}
  </div>

  {showLoginPopup && <LoginSignupModal onClose={() => dispatch(closeLoginPopup())} />}
</div>

  
  );
};

export default Navbar;
