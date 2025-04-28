import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { MdHotel, MdDateRange, MdLocationOn, MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";

const MyReservations = () => {
    const [reservations, setreservations] = useState()
    const [RoomReservations, setRoomreservations] = useState()
    const user=useSelector((state=>state.auth.user));
   const getmyreservations=()=>{
    axios.get(`http://localhost:4000/api/reserver/getall/${user}`)
    .then((response)=>{
      setreservations(response.data.orders)
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
   }
   const getmyroomsreservations=()=>{
    axios.get(`http://localhost:4000/api/reserveracc/getall/${user}`)
    .then((response)=>{
      setRoomreservations(response.data.orders)
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
   }
   const formatDateForInput = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };
   useEffect(()=>{
    getmyreservations();
    getmyroomsreservations();
   },[])
   return (
    <div className="min-h-screen mt-40 bg-violet-300 mx-10 my-10 py-10 px-4 md:px-10 space-y-20">
      
      {/* Vols Reservations */}
      <section className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-3xl font-bold text-violet-800">My Flight Reservations</h1>
        </div>
  
        {reservations?.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No reservations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reservations?.map((res, index) => (
              <div key={index} className="bg-violet-300 rounded-2xl shadow-md p-6 flex flex-col space-y-4 border border-violet-400">
              <h2 className="text-2xl font-semibold text-violet900 mb-4">Reservation #{index + 1}</h2>
                <div className="space-y-2 text-gray-800">
                  <h2 className="text-xl font-bold">{res.hotelName}</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <MdLocationOn className="mr-1" />
                    {res.flight.from} → {res.flight.to}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MdLocationOn className="mr-1" />
                    {res.flight.departureTime} → {res.flight.returnTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MdLocationOn className="mr-1" />
                    Duration: {res.flight.duration}
                  </div>
                  <div className="flex items-center text-sm">
                    <MdDateRange className="mr-1" />
                    {formatDateForInput(res.flight.departureDate)} → {formatDateForInput(res.flight.returnDate)}
                  </div>
                  <p className="text-sm">Class: {res.flightClass}</p>
                  <p className="text-sm">Person Count: {res?.personCount?.Adultes + res?.personCount?.Enfants}</p>
                  <p className="text-sm font-semibold">Total: ${res.TotalPrice}</p>
                  <p className="text-sm font-semibold">Refundable: {res.refundable ? 'Yes' : 'No'}</p>
                  <p className="text-sm font-semibold">Created At: {res.createdAt}</p>
                </div>
  
                <div className="flex items-center justify-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    res.paymentStatus === "Paid" ? "bg-green-100 text-green-800"
                    : res.paymentStatus === "Pending" ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                  }`}>
                    {res.paymentStatus}
                  </span>
  
               
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
  
      {/* Hôtel Reservations */}
      <section className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
         
          <h1 className="text-3xl font-bold text-violet-800">My Rooms Reservations</h1>
        </div>
  
        {RoomReservations?.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No reservations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RoomReservations?.map((res, index) => (
              <div key={index} className="bg-violet-300 rounded-2xl shadow-md p-6 flex flex-col space-y-4 border border-violet-400">
              <h2 className="text-2xl font-semibold text-violet900 mb-4">Reservation #{index + 1}</h2>

                <div className="flex flex-col gap-4 text-gray-800">
                  <img
                    src={`http://localhost:4000${res.accommodation.images[0]}`}
                    alt={res.accommodation.name}
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                  <h2 className="text-xl font-bold">{res.accommodation.name}</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <MdLocationOn className="mr-1" />
                    {res.accommodation.address}, {res.accommodation.city}
                  </div>
                  <div className="flex items-center text-sm">
                    <MdDateRange className="mr-1" />
                    {formatDateForInput(res.checkInDate)} → {formatDateForInput(res.checkOutDate)}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    {res.RoomsSelection.map((room, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>Name: {room.name}</span>
                        <span>Number: {room.number}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm">Person Count: {res?.personCount?.Adultes + res?.personCount?.Enfants}</p>
                  <p className="text-sm font-semibold">Total: ${res.TotalPrice}</p>
                  <p className="text-sm font-semibold">Created At: {res.createdAt}</p>
                </div>
  
                <div className="flex items-center justify-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    res.paymentStatus === "Paid" ? "bg-green-100 text-green-800"
                    : res.paymentStatus === "Pending" ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                  }`}>
                    {res.paymentStatus}
                  </span>
  
                
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
  
    </div>
  );
  
};

export default MyReservations;
