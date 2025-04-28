import React from 'react'
import image from '../assets/Cherry-Blossom-Tree-Shinjuku-Gyoen-Tokyo-.jpg'
const Japan = () => {
  return (
    <div className="flex items-center justify-between  rounded-xl shadow-xl mb-8 p-8">
                   <div className="w-1/2 pr-8">
                       <h2 className="text-3xl font-semibold text-violet900 mb-4">Book Your Flight</h2>
                    
                   </div>
                   <div className="w-1/2">
                       <img
                           src={image}
                           alt="Flight"
                           className="w-full  h-auto rounded-xl shadow-lg"
                       />
                   </div>
               </div>
  )
}

export default Japan