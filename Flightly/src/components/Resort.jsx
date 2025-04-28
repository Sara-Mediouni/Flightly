import React, { useEffect, useState } from "react";
import image from "../assets/fabio-fistarol-qai_Clhyq0s-unsplash.jpg";
import { FaEarthAmericas, FaPhone, FaSpa } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { MdEmail, MdLocalActivity, MdOutlineBedroomParent, MdPets } from "react-icons/md";
import { LiaChairSolid } from "react-icons/lia";
import { MdOutlineBathroom } from "react-icons/md";
import { MdPool } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { LuRefrigerator } from "react-icons/lu";
import { TbAirConditioning, TbBeachOff, TbBrandBooking } from "react-icons/tb";
import { PiOvenBold } from "react-icons/pi";
import { PiWashingMachineDuotone } from "react-icons/pi";
import { FaClock } from "react-icons/fa";
import { MdLocalParking } from "react-icons/md";
import { FaChair } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { IoHelpCircle } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Pour personnaliser le marqueur si tu veux

import axios from "axios";

const Resort = () => {
    const resort = JSON.parse(localStorage.getItem('resortDetails'));
    const [resorts, setResorts] = useState(null)
  
    const getResort=()=>{
      axios.get(`http://localhost:4000/api/resort/resort/${resort}`)
      .then((response)=>{
        console.log(response.data)
        setResorts(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    const [hotelPosition, setHotelPosition] = useState(null);
    const hotelAddress = '10 Downing Street, London, UK'; // Exemple d'adresse d'hôtel
    const getHotelCoordinates = async (address) => {
      const apiKey = 'YOUR_OPENCAGE_API_KEY';
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    
      try {
        const response = await axios.get(url);
        const location = response.data.results[0].geometry;
        return { lat: location.lat, lng: location.lng };
      } catch (error) {
        console.error('Error fetching location:', error);
        return null;
      }
    };
    
    useEffect(() => {
      const fetchCoordinates = async () => {
        const position = await getHotelCoordinates(hotelAddress);
        if (position) {
          setHotelPosition(position);
        }
      };
  
      fetchCoordinates();
    }, []);
    function formatDayAndDate(isoString) {
      if (!isoString) return "";
      const date = new Date(isoString);
  
      const weekday = date.toLocaleDateString("en-US", { weekday: "short" }); // "Mon", "Tue", etc.
      const day = date.getDate(); // 1 → 31
      const month = date.toLocaleDateString("en-US", { month: "short" }); // Jan, Feb...
      const year = date.getFullYear();
      return `${weekday}, ${day} ${month} ${year}`;
    }
 const lat = 48.8566;  // Exemple de latitude (Paris)
  const lon = 2.3522;
    function formatTo12Hour(time) {
      const [hourStr, minuteStr] = time.split(":");
      let hour = parseInt(hourStr);
      const minute = minuteStr;
      const period = hour >= 12 ? "PM" : "AM";
  
      hour = hour % 12 || 12; // 0 or 12 becomes 12
      return `${hour}:${minute} ${period}`;
    }
    useEffect(()=>{
      getResort()
    },[])
  return (
    <div className=" mt-50  bg-violet-300 relative mx-10 p-10">
     
      <div className="grid md:grid-cols-[1.5fr_1fr] grid-cols-1 w-full gap-5 justify-center items-center p-10 ">
        <div className="h-full w-full ">
          <img
            src={`http://localhost:4000${resorts?.images[0]}`}
            className="w-full h-[500px] object-cover rounded-2xl"
          />

          <div className="flex flex-col gap-5 text-violet900 items-start justify-start py-20">
            <h1 className="text-5xl font-bold">{resorts?.name}</h1>
            <span className="flex gap-5 text-gray-700">
              {" "}
              <FaEarthAmericas size={20} /> {resorts?.address}
              
            </span>
            <p className="text-gray-700">
             {resorts?.description}
            </p>
            <div className="flex flex-col gap-4">
                     <span className="flex gap-2 items-center"><MdEmail size={20}/> Email: {resorts?.Email}</span>
                     <span className="flex gap-2 items-center"><FaPhone size={20}/> Phone: {resorts?.Phone}</span>
                     <span className="flex gap-2 items-center"><TbBrandBooking size={20}/> Reservation Phone: {resorts?.ReservationPhone}</span>
                     </div>
            <div className="rounded-xl p-5 border-2 w-full h-full border-violet900 mt-10">
              <h1 className="text-3xl font-bold">Amenities</h1>
              <div className="grid md:grid-grid-3 grid-cols-1 gap-4">
             
                 <div  className="grid grid-cols-3 gap-5 items-start justify-start py-10">
                  {resorts?.amenities.map((item, index) => 
                  ( <span key={index} className="flex gap-2">
                    <IoHelpCircle size={20} />
                    {item.name} : {item.quantity}
                  </span>
           ))}
                </div>
             
               
              
              
              </div>
              <h1 className="text-3xl font-bold">Activities</h1>
              <div className="grid md:grid-grid-3 grid-cols-1 gap-4">
             
                 <div  className="grid grid-cols-3 gap-5 items-start justify-start py-10">
                  {resorts?.activities.map((item, index) => 
                  ( <span key={index} className="flex gap-2">
                    <MdLocalActivity size={20} />
                    {item} 
                  </span>
           ))}
                </div>
             
               
              
              
              </div>
            </div>
            <div className="rounded-xl p-5 border-2 w-full h-full border-violet900">
              <h1 className="text-3xl font-bold">Resort Informations</h1>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="grid grid-rows-5 gap-5 items-start justify-start py-10">
                <span className="flex gap-2">
  <FaClock size={20} />
  Check In : {resorts?.checkInTime ? formatTo12Hour(resorts.checkInTime) : "N/A"}
</span>
                 <span className="flex gap-2">
  <FaClock size={20} />
  Check Out : {resorts?.checkOutTime ? formatTo12Hour(resorts.checkOutTime) : "N/A"}
</span>
                  <span className="flex gap-2">
                    <FaClock size={20} /> Minimum Age To Check In : {resorts?.minAgeToCheckIn}
                  </span>
                </div>
                <div className="grid grid-rows-3 gap-5 items-start justify-start py-10">
                  <span className="flex gap-2">
                    <MdLocalParking size={20} />
                    {resorts?.hasParking ? "Parking Available" : "No Parking Available"}
                  </span>
                  <span className="flex gap-2">
                    <MdPets size={20} />
                    {resorts?.petsAllowed ? "Pets Allowed" : "Pets Not Allowed"}
                  </span>
                  <span className="flex gap-2">
                    <FaWifi size={20} />
                    {resorts?.hasWifi ? "Free Wifi" : "No Wifi"}
                  </span>
                  <span className="flex gap-2">
                    <MdPool size={20} />
                    {resorts?.hasPool ? "Swimming Pool" : "No Pools"}
                  </span>
                  <span className="flex gap-2">
                  
                    {resorts?.hasBeach ? <span className="flex gap-2"><FaUmbrellaBeach size={20}/>Front Beach</span> : <span className="flex gap-2"><TbBeachOff size={20}/>No Beach</span>}
                      
                  </span>
                  <span className="flex gap-2">
                  <FaSpa size={20} />
                  {resorts?.hasSpa ? "Spa Available": "No Spa"}
                    
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-full">
          <div className=" grid grid-rows-2 gap-4">
            <div className="w-full h-[240px]">
              <img
                src={`http://localhost:4000${resorts?.images[1]}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="w-full h-[240px]">
              <img
                src={`http://localhost:4000${resorts?.images[2]}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
             <div className="flex text-violet900 flex-col justify-start gap-6 items-start border-1 rounded-2xl py-10 mt-20 px-10 w-full max-w-2xl">
                        <MapContainer center={[lat, lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={[lat, lon]} >
                    <Popup>
                      C'est Paris !
                    </Popup>
                  </Marker>
                </MapContainer>
                        </div>
          <div className="flex text-violet900 flex-col justify-start gap-6 items-start border-1 rounded-2xl py-10 mt-20 px-10 w-full max-w-2xl">
         {resorts?.offersResort ?
                    <><h1 className="text-3xl font-bold mb-4">{resorts?.offersResort.title}</h1>
                    <p className="text-2xl font-bold mb-4">{resorts?.offersResort.description}</p>
                    <p className="text-2xl font-bold mb-4">{resorts?.offersResort.pricePerNight} USD / Night</p>
<ul className="flex flex-col gap-2 text-lg">Activities Included:
{resorts?.offersResort?.activities?.map((item, index) => (
<li key={index}> {item}</li>
))}
  
  
</ul>
<div className="flex flex-col gap-2 text-lg">
  <span className="flex flex-col gap-2 text-lg">Booking Information:</span>
  <span className="flex"><MdDateRange size={20}/>Check-in: {resorts?.offersResort.bookingInfo.checkInDate ? formatDayAndDate(resorts?.offersResort.bookingInfo.checkInDate) : "N/A"}</span>
  <span className="flex"><MdDateRange size={20}/>Check-out: {resorts?.offersResort.bookingInfo.checkOutDate ? formatDayAndDate(resorts?.offersResort.bookingInfo.checkOutDate) : "N/A"}</span>
  <span className="flex">Max Occupancy: {resorts?.offersResort.bookingInfo.maxOccupancy} guests</span>
  <span className="flex">Included Services: {resorts?.offersResort.bookingInfo.includedServices.join(", ")}</span>
  <span className="flex">Cancellation Policy: {resorts?.offersResort.bookingInfo.cancellationPolicy}</span>
</div>
</>:
(<div className="flex flex-col w-full">
  <div className=" border-l-4 border-violet900 p-4 rounded my-6">
  <p className="text-violet900 font-medium">No offers available for the moment.</p>
  <p className="text-sm mt-1 text-violet900">Be the first to know when an offer becomes available!</p>
  <button className="mt-2 bg-violet900 text-white px-4 py-2 rounded hover:bg-violet-500">
  Subscribe to alerts
  </button>
</div>
 </div>)}





  <button className="button !rounded-xl !w-full mt-6">Reservation</button>
</div>

        </div>
  
      </div>
       <div className="w-full p-5 grid grid-cols-[1.2fr_1fr] gap-10 text-white bg-violet900 rounded-xl">
      <img src={image} className="w-full h-[250px] rounded-xl"/>
     <div> <h1>Resort</h1>
      <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p></div>
      </div> 
    </div>
  );
};

export default Resort;
