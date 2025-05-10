import React, { useEffect, useState } from "react";
import CardsCollection from "../components/CardsCollection";

import { useSelector } from "react-redux";
import axios from "axios";
import Lottie from "lottie-react";


import animation from "../assets/404NotFound.json";
import { PaginationDemo } from "../components/Pagination-ui";
const Hotels = () => {

  const countries = useSelector((state) => state.country.countries);
  const [Hotels, setHotels] = useState([]);
const [minPrices, setMinPrices] = useState([]);
  const [Country, setCountry] = useState("");
  const HotelsPerPage = 6;
  const [Name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Hotels.length / HotelsPerPage); // ou selon le total de tes données
  const indexOfLastHotel = currentPage * HotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - HotelsPerPage;
  const currentHotels = Hotels.slice(indexOfFirstHotel, indexOfLastHotel);

const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const handlePrevPage = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};

const handlePageChange = (page) => {
  setCurrentPage(page);
};
  // Number of hotels per page
  const filterhotels = (e) => {
    e.preventDefault();
    JSON.stringify(Country);
    JSON.stringify(Name);
    console.log(Country);
    console.log(Name);
    axios
      .get(
        `http://localhost:4000/acc/acc/?type=Hotel&country=${Country}&name=${Name}`
      )
      .then((response) => {
        console.log(response.data);
        setHotels(response.data);
      })
      .catch((error) => {
        console.log(error);
        setHotels([]);
      });
  };
  
  const gethotels = () => {
    axios
      .get("http://localhost:4000/acc/acc/?type=Hotel")
      .then((response) => {
        console.log(response.data);
        setHotels(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

useEffect(()=>{
  if (currentHotels && currentHotels?.length > 0) {
    const pricesPerHotel = currentHotels.map(hotel => {
      const prices = hotel.roomTypes.map(room => room.price);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      return minPrice;
    });
    console.log(pricesPerHotel)
    setMinPrices(pricesPerHotel);
  }
},[currentHotels])

useEffect(() => {
  gethotels();
 
  
}, []);

  return (
    <div className="w-full h-full mt-40 my-10">
      <h1 className="text-4xl text-white relative font-bold p-20">
        The Best Stays, All in One Place
      </h1>
      <div className="grid items-center justify-center relative mx-10">
  <form onSubmit={(e) => filterhotels(e)}>
    <div className="bg-violet-300 p-10 rounded-3xl shadow-xl w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-violet-900 mb-8 text-center">Search Hotels</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-violet-900 font-medium mb-2">Country</label>
          <select
            className="h-[45px] px-4 border-2 border-violet-900 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
            defaultValue=""
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" disabled>
              Select a Country...
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-violet-900 font-medium mb-2">Hotel Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={Name}
            type="text"
            placeholder="Enter name..."
            className="h-[45px] px-4 border-2 border-violet-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="submit"
          className="bg-violet900 hover:bg-violet800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200"
        >
          Search
        </button>
      </div>
    </div>
  </form>
</div>

        {currentHotels && currentHotels?.length > 0 ? (
       <div className=" p-5 font-bold relative text-violet900 text-xl rounded-2xl shadow-2xl bg-violet-300 grid md:grid-cols-3 h-full gap-10 mx-20 mt-20">    
        {  currentHotels.map((hotel,index) => (
           
            <CardsCollection
              key={hotel._id}
              id={hotel._id}
              name={hotel.name}
              description={hotel.description}
              image={hotel.images[0]}
              type={hotel.type}
              price={minPrices[index]}
            />
          ))}
     </div>   ) : (
          <div className="flex  justify-center rounded-2xl mt-20 bg-violet-300 items-center h-screen mx-20">
            <Lottie animationData={animation} className="w-150" />
          </div>
        )}
      
      <div className="flex  justify-center items-center relative h-full py-20  w-full">
      <PaginationDemo
  currentPage={currentPage}
  totalPages={totalPages}
  handleNextPage={handleNextPage}
  handlePrevPage={handlePrevPage}
  handlePageChange={handlePageChange}
/>

      </div>
    </div>
  );
};

export default Hotels;
