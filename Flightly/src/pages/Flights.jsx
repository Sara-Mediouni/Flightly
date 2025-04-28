import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import planeAnim from "../assets/planeanim.json";
import Lottie from "lottie-react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { LuBaggageClaim } from "react-icons/lu";
import { MdBackpack } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import ReactSlider from "react-slider";
import axios from "axios";
import animation from '../assets/404NotFound.json'
import  { useNavigate }  from "react-router-dom";
const Flights = () => {
  const [openIndex, setOpenIndex] = useState(null); // null = aucune carte ouverte


  const [Flights, setFlights] = useState(null);
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [passengers, setpassengers] = useState('');
  const [type, setType] = useState("");
  const [dateDep, setdateDep] = useState("");
  const [dateArr, setdateArr] = useState("");
  const [classType, setclassType] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://localhost:4000/api/flight/flights?from=${from}&to=${to}&departureDate=${dateDep}&returnDate=${dateArr}&classType=${classType}&passengers=${passengers}&type=${type}`
      )
      .then((response) => {
        console.log(response.data);
        setFlights(response.data);
      })
      .catch((error) => {
        console.log(error);
        setFlights([]);
      });
  };
  const navigate = useNavigate();
  const GoToReservation = (id) => {
    localStorage.setItem("idFlight", id);
    navigate('/reservflight');
  };
 
  const toggleFlightDetails = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Fermer si déjà ouvert
    } else {
      setOpenIndex(index); // Ouvrir la carte cliquée
    }
  };
  const getFlights = () => {
    axios
      .get("http://localhost:4000/api/flight/allflights")
      .then((response) => {
        console.log(response.data);
        setFlights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function formatTo12Hour(time) {
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr);
    const minute = minuteStr;
    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12; // 0 or 12 becomes 12
    return `${hour}:${minute} ${period}`;
  }

  function formatDayAndDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);

    const weekday = date.toLocaleDateString("en-US", { weekday: "short" }); // "Mon", "Tue", etc.
    const day = date.getDate(); // 1 → 31
    const month = date.toLocaleDateString("en-US", { month: "short" }); // Jan, Feb...
    const year = date.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
  }
  useEffect(() => {
    getFlights();
  }, []);

  const countries = useSelector((state) => state.country.countries);
 
  return (
    <div className="h-auto my-10 mt-40 px-auto mx-20">
      <h1 className="text-sm md:text-4xl text-white relative font-bold p-20">
        Fly Smarter, Travel Better
      </h1>
      <div className="grid items-center justify-center relative mx-20">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            className="bg-violet-300 text-violet900 p-5 h-full rounded-2xl shadow-2xl 
  w-[90vw] md:w-[70vw] lg:w-[60vw] flex flex-col justify-between items-center relative mx-auto py-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-4">
              {/* From */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-sm">From</label>
                <select
                  onChange={(e) => setfrom(e.target.value)}
                  value={from}
                  className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full"
                >
                  <option value="">Select a country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* To */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-sm">To</label>
                <select
                  onChange={(e) => setto(e.target.value)}
                  value={to}
                  className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full"
                >
                  <option value="">Select a country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure Date */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-sm">
                  Departure Date
                </label>
                <input
                  onChange={(e) => setdateDep(e.target.value)}
                  value={dateDep}
                  type="date"
                  className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full"
                />
              </div>

              {/* Return Date */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-sm">
                  Return Date
                </label>
                <input
                  onChange={(e) => setdateArr(e.target.value)}
                  value={dateArr}
                  type="date"
                  className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full"
                />
              </div>

              {/* Passengers */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-sm">Passengers</label>
                <input
                  onChange={(e) => setpassengers(e.target.value)}
                  value={passengers}
                  type="number"
                  min="0"
                  placeholder="Number of passengers"
                  className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full"
                />
              </div>

              {/* Class Dropdown */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-sm">Class</label>
                <select
                  onChange={(e) => setclassType(e.target.value)}
                  value={classType}
                  className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full"
                >
                  <option value="">Select class</option>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>

              {/* Transit Dropdown */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-sm">Type</label>
                <select
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full"
                >
                  <option value="">Select option</option>
                  <option value="one-way">One-way</option>
                  <option value="round-trip">Round-Trip</option>
                  
                </select>
              </div>
            </div>
            <div className="my-10">
              <button type="submit" className="button">
                Search
              </button>
            </div>
          </div>
        </form>
        {/* Search Button */}
      </div>
      {Flights && Flights.length > 0 ? ( 
      Flights?.map((flight, index) => {
        return (
          <>
            <div className="p-5 grid grid-cols-[1fr_1fr]  text-violet900 md:text-xl rounded-2xl shadow-2xl w-full bg-violet-300  mt-30">
              <div className="w-full ">
                <h1 className="font-bold">{flight.airline}</h1>
                <div className="flex gap-10  text-gray-600">
                  <span>{flight.flightNumber}</span>
                  <span>{flight.duration}</span>
                </div>
              </div>
              <div className="md:text-lg text-sm gap-2 grid md:grid-cols-3">
              <div className="flex flex-col gap-1">
  {flight.classes.map((cls, idx) => (
    <div key={idx} className=" px-3 py-1 rounded-lg text-sm text-violet900 border-2 border-violet900 shadow-sm">
      <p className="font-semibold">{cls.name}</p>
      <div className="flex justify-between text-xs">
        <span>{cls.availableSeats} seats</span>
        
      </div>
    </div>
  ))}
</div>

                <span className="p-2 rounded-full h-10 ">
                  {flight?.flightType}
                  
                </span>
                
                <button
                  onClick={() => toggleFlightDetails(index)}
                  className="rounded-full flex justify-end "
                >
                  {openIndex === index ? (
                    <IoIosArrowDropdownCircle size={30} />
                  ) : (
                    <IoIosArrowDropupCircle size={30} />
                  )}
                </button>
              </div>
            </div>

            <div
              key={index}
              className={`bg-violet-300 p-4 rounded-2xl shadow-2xl w-full mt-6 flex flex-col justify-start items-start h-auto
         
          ${openIndex === index ? "flex" : "hidden"}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                {/* FROM */}
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl">{flight.from}</h1>
                  <span className="text-xl text-gray-600">
                    {flight.departurePlace}
                  </span>
                  <span className="text-sm text-gray-600">
                    {flight.departureAirport}
                  </span>
                </div>

                {/* PLANE ANIMATION */}
                <div className="flex justify-center items-center">
                  <Lottie animationData={planeAnim} className="w-50 h-20" />
                </div>

                {/* TO */}
                <div className="flex flex-col items-end lg:items-start">
                  <h1 className="font-bold text-xl">{flight.to}</h1>
                  <span className="text-xl text-gray-600">
                    {flight.returnPlace}
                  </span>
                  <span className="text-sm text-gray-600">
                    {flight.returnAirport}
                  </span>
                </div>
              </div>

              {/* TIME & DURATION */}
              <div className="grid grid-cols-3 gap-4 mt-4 text-center w-full">
                <div className="flex flex-col justify-start items-start">
                  <h2 className="font-bold text-lg">
                    {formatTo12Hour(flight.departureTime)}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {formatDayAndDate(flight.departureDate)}
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-500">{flight.duration}</p>
                  <p className="text-sm text-gray-500">
                    {flight?.flightType}
                  </p>
                </div>
                <div className="flex flex-col justify-start items-start">
                  <h2 className="font-bold text-lg">
                    {formatTo12Hour(flight.returnTime)}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {formatDayAndDate(flight.returnDate)}
                  </p>
                </div>
              </div>

              {/* BAGGAGE + PRICE + BUTTON */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-6 w-full">
                <div className="flex flex-col gap-2">
                  <p className="text-sm">
                    {flight.Includedbaggage?.included
                      ? "Includes baggage"
                      : "Non-Included Baggage"}
                  </p>
                  <div className="flex gap-4 text-gray-700">
                    <span className="flex items-center gap-1 text-sm">
                      <LuBaggageClaim size={20} />{" "}
                      {flight.Includedbaggage?.weight + " kg"}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <MdBackpack size={20} /> {flight.cabinAllowance + " kg"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <span className="font-bold text-xl">
                  USD {Math.min(...flight.classes.map(cls => cls.price))} / Person
                  </span>
                  <button onClick={()=>GoToReservation(flight._id)} 
                  className="bg-violet900 text-white text-sm font-semibold px-6 py-2 rounded-full hover:opacity-90 transition">
                    Select Flight
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })):(
        <div className="flex justify-center items-center mt-20 rounded-2xl bg-violet-300">
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={animation} className="w-150" />
       
      </div> 
      </div>)}
    </div>
  );
};

export default Flights;
