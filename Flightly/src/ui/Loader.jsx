import React from 'react'
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Animation - 1744636846445.json"

const Loader = () => {
  return (
  
    <div className="flex absolute items-center w-full h-full justify-center">
    <Lottie animationData={loadingAnimation} loop={true} />
  </div>

  )
}

export default Loader