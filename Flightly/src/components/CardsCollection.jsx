import clsx from 'clsx';
import React from 'react'
import { useNavigate } from 'react-router-dom';


export const CardsCollection = ({name,image,price,  id}) => {
  console.log(image);
  const navigate = useNavigate();
  console.log(id);
  console.log(price);

const goToDetails = () => {
 
    localStorage.setItem('details', JSON.stringify(id));
    navigate('/info', {
      state: { resortData: id }, // tu passes les données directement
    })
  }
 
  

  const url=`http://localhost:4000${image}`
  console.log(url)
  return (
  
    
        <div
  className="max-w-xs w-full group/card p-5 cursor-pointer"
 
  onClick={goToDetails}
>
  <div
    className={clsx(
      "relative h-96 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
    )}
  >
    {/* Image Background */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${url})` }}
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50 bg-opacity-40 group-hover/card:bg-opacity-60 transition duration-300 z-10" />

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
      <h1 className="font-bold text-lg md:text-2xl">{name}</h1>
      <p className="text-sm mt-1">From {price} $ / night</p>
    </div>
  </div>
</div>

        );
      }
 


export default CardsCollection