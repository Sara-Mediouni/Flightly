import React from "react";
import hike from '../assets/vlad-marisescu-i7Jcpyqq578-unsplash.jpg'
const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-2 flex-wrap">
      <span className="text-white">Explore</span>
      <img
        src={hike}
        alt="icon"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="text-violet900">the world with ease.</span>
    </h2>
  
    <h3 className="text-xl text-white md:text-2xl font-semibold mt-2 mb-4">
      Discover top destinations and seamless travel experiences
    </h3>
  
    <p className="max-w-2xl mx-auto text-white mb-12">
      From luxurious resorts and curated hotel stays to convenient flight bookings and personalized trip plans — we bring the world closer to you.
    </p>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
      {/* Card 1 */}
      <div className="p-6 rounded-2xl shadow-md bg-white text-left">
        <div className="text-3xl mb-3 text-violet900">✈️</div>
        <h4 className="font-bold text-lg mb-1">Book your flights</h4>
        <p className="text-gray-600 text-sm">
          Find and book the best flight deals across global airlines in just a few clicks.
        </p>
      </div>
  
      {/* Card 2 - Highlighted */}
      <div className="p-6 rounded-2xl shadow-md bg-violet700 text-white text-left">
        <div className="text-3xl mb-3">🏖️</div>
        <h4 className="font-bold text-lg mb-1">Luxury resorts</h4>
        <p className="text-sm">
          Escape to paradise with our handpicked selection of stunning seaside and mountain resorts.
        </p>
      </div>
  
      {/* Card 3 */}
      <div className="p-6 rounded-2xl shadow-md bg-white text-left">
        <div className="text-3xl mb-3 text-blue-600">🏨</div>
        <h4 className="font-bold text-lg mb-1">Hotel reservations</h4>
        <p className="text-gray-600 text-sm">
          Choose from thousands of hotels and book your perfect stay with ease and flexibility.
        </p>
      </div>
  
      {/* Card 4 */}
      <div className="p-6 rounded-2xl shadow-md bg-white text-left">
        <div className="text-3xl mb-3 text-blue-600">🌍</div>
        <h4 className="font-bold text-lg mb-1">Tailored experiences</h4>
        <p className="text-gray-600 text-sm">
          Customize your trips with guided tours, activities, and local experiences for every destination.
        </p>
      </div>
    </div>
  </section>
  
  );
};

export default FeaturesSection;
