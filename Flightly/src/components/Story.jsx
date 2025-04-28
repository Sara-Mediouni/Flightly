import React from "react";
import img from '../assets/eiffel.png'
const Story = () => {
  return (
<div
  id="story"
  className="flex mt-10 items-center justify-center w-full h-full relative p-20"
>
  <div className="grid grid-cols-2 h-full gap-5 md:mx-25">
    {/* Colonne 1 : Texte */}
    <div className="flex flex-col justify-center md:p-5 md:w-full relative ">
      <h1 className="max-w-full break-words md:text-7xl text-2xl text-white font-bold">
        Explore one of the most beautiful cities in the world,
        <span className="text-violet900"> Paris.</span>
      </h1>
    </div>

    {/* Colonne 2 : Image */}
    <div className="flex items-end bottom-0 justify-end absolute right-0">
      <img src={img} className="w-3/5 md:h-4/5  object-cover" />
    </div>
  </div>
</div>

  );
};

export default Story;
