import React, { useEffect, useMemo, useState } from "react";
import CardsCollection from "../components/CardsCollection";
import { PaginationDemo } from "../components/Pagination-ui";
import { useSelector } from "react-redux";
import animation from "../assets/404NotFound.json";
import axios from "axios";
import Lottie from "lottie-react";

const Resorts = () => {
    const countries = useSelector((state) => state.country.countries);
    const [Resorts, setResorts] = useState([]);
  const [minPrices, setMinPrices] = useState([]);
  
    const [Country, setCountry] = useState("");
    const [Name, setName] = useState("");
       const ResortsPerPage = 6;
    
       const [currentPage, setCurrentPage] = useState(1);
       const totalPages = Math.ceil(Resorts.length / ResortsPerPage); // ou selon le total de tes données
       const indexOfLastResort = currentPage * ResortsPerPage;
       const indexOfFirstResort = indexOfLastResort - ResortsPerPage;
    // Number of hotels per page
    const currentResorts =useMemo(()=> 
      Resorts.slice(indexOfFirstResort, indexOfLastResort),
    [Resorts,indexOfFirstResort,indexOfLastResort])
    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    
    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    const filterResorts = (e) => {
      e.preventDefault();
      JSON.stringify(Country);
      JSON.stringify(Name);
      console.log(Country);
      console.log(Name);
      axios
        .get(
          `http://localhost:4000/acc/acc/?type=Resort&country=${Country}&name=${Name}`
        )
        .then((response) => {
          console.log(response.data);
          setResorts(response.data);
        })
        .catch((error) => {
          console.log(error);
          setResorts([]);
        });
    };
    
    const getresorts = () => {
      axios
        .get("http://localhost:4000/acc/acc/?type=Resort")
        .then((response) => {
          console.log(response.data);
          setResorts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  ;
    useEffect(()=>{
 if (currentResorts && currentResorts.length > 0) {
      const pricesPerResort = currentResorts.map(hotel => {
        const prices = hotel.roomTypes.map(room => room.price);
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        return minPrice;
      });
      setMinPrices(pricesPerResort);
    }
    },[currentResorts])
  
    useEffect(() => {
     getresorts();
    
    }, []);
  return (
 <div className="w-full h-full mt-40 my-10">
       <h1 className="text-4xl text-white relative font-bold p-20">
         The Best Stays, All in One Place
       </h1>
       <div className="grid items-center justify-center relative mx-10">
  <form onSubmit={(e) => filterResorts(e)}>
    <div className="bg-violet-300 p-10 rounded-3xl shadow-2xl w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-violet-900 mb-8 text-center">
        Search Resorts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
          <label className="text-violet-900 font-medium mb-2">Resort Name</label>
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

     
         {currentResorts && currentResorts.length > 0 ? (
             <div className=" p-5 font-bold relative text-violet900 text-xl 
             rounded-2xl shadow-2xl bg-violet-300 grid md:grid-cols-3 h-full
              gap-10 mx-20 mt-20">
          { currentResorts.map((resort,index) => (
            
             <CardsCollection
               data-testid="resort_card"
               key={resort._id}
               id={resort._id}
               name={resort.name}
               description={resort.description}
               image={resort.images[0]}
               type={resort.type}
               price={minPrices[index]}
             />

             
           ))}  </div>
         ) : (
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
     </div>)}
     export default Resorts;