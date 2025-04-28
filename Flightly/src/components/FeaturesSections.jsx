import React from "react";
import hike from '../assets/vlad-marisescu-i7Jcpyqq578-unsplash.jpg'
const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 text-center">


      <h2 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-2 flex-wrap">
        <span className="text-white">Elevate</span>
        <img
          src={hike}
          alt="icon"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-violet900">your well-being.</span>
      </h2>

      <h3 className="text-xl text-white md:text-2xl font-semibold mt-2 mb-4">
        Go to the mountains!
      </h3>

      <p className="max-w-2xl mx-auto text-white mb-12">
        Enhance your adventure with waterfall hikes, thrilling exploration, gourmet culinary experiences, and serene mountaintop views.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl shadow-md bg-white text-left">
          <div className="text-3xl mb-3 text-violet900">💧</div>
          <h4 className="font-bold text-lg mb-1">Stunning waterfalls</h4>
          <p className="text-gray-600 text-sm">
            Hike to fabulous falls, discover hidden gems, and feel the freedom of nature.
          </p>
        </div>

        {/* Card 2 - Highlighted */}
        <div className="p-6 rounded-2xl shadow-md bg-violet700 text-white text-left">
          <div className="text-3xl mb-3">🧘‍♂️</div>
          <h4 className="font-bold text-lg mb-1">Camping under the stars</h4>
          <p className="text-sm">
            Enjoy cozy starry nights amidst breathtaking wilderness and total tranquility.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-2xl shadow-md bg-white text-left">
          <div className="text-3xl mb-3 text-blue-600">🧭</div>
          <h4 className="font-bold text-lg mb-1">Scenic hiking trails</h4>
          <p className="text-gray-600 text-sm">
            Hike stress-free, experiencing breathtaking views and stunning landscapes everywhere.
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-6 rounded-2xl shadow-md bg-white text-left">
          <div className="text-3xl mb-3 text-blue-600">🌍</div>
          <h4 className="font-bold text-lg mb-1">Cultural exploration</h4>
          <p className="text-gray-600 text-sm">
            Visit mountain villages, explore local crafts, and embrace authentic traditions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
