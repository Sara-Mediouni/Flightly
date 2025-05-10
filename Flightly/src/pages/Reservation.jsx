import React, { useEffect, useState } from "react";
import { FaUser, FaCalendarAlt, FaBaby, FaPhoneAlt, FaMailBulk } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";

import {AnimatePresence,motion } from "framer-motion";
import axios from "axios";
import { FaHouseChimneyWindow } from "react-icons/fa6";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Reservation = () => {
  const [rooms, setRooms] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [Total, setTotal] = useState(0);
  const [Type, setType] = useState(null);
  const [hotels, setHotels] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [form, setForm] = useState(null);
  const hotel = localStorage.getItem("HotelReserveId");
  const [reservationData, setReservationData] = useState({
    personCount: { Adultes: 0, Enfants: 0 },
    childrenAges: [],
    checkInDate: "",
    checkOutDate: "",
    specialRequest: "",
    RoomsSelection: [], 
    TotalPrice:0
  });

  const getUser = async () => {
    axios
      .get(`http://localhost:4000/user/user/getuser/${user}`)
      .then((response) => {
        console.log(response.data);
        setForm(response.data.user);
        console.log("Infos de l'utilisateur :", response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  const getHotel = () => {
    axios
      .get(`http://localhost:4000/acc/acc/${hotel}`)
      .then((response) => {
        console.log(response.data);
        setHotels(response.data);
        setType(hotels.type);
        console.log("Hotel Type:", hotels.type);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };
  const setCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleRoomCountChange = (roomName, value) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [roomName]: Number(value),
    }));
  };

  const handleRoomClick = (roomName) => {
    setSelectedRooms((prev) => {
      const updated = { ...prev };
  
      if (updated[roomName] !== undefined) {
        // Si elle est déjà sélectionnée, on la désélectionne
        delete updated[roomName];
      } else {
        // Sinon on l'ajoute avec 1 comme nombre par défaut
        updated[roomName] = 1;
      }
  
      return updated;
    });
  };
  
  
  
  

  const getRoomsPrices = () => {
    axios
      .get(
        `http://localhost:4000/acc/acc/roomPrices/${hotel}?startDate=${checkInDate}&endDate=${checkOutDate}`
      )
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({
      ...reservationData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Crée le tableau des chambres sélectionnées à partir de selectedRooms
    const array = Object.entries(selectedRooms).map(([name, number]) => ({
      name,
      number,
    }));
    console.log(checkOutDate);
    console.log(checkInDate);
    const checkIn = new Date(checkInDate);
const checkOut = new Date(checkOutDate);
const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    // Calcule le prix total

    const totalPrice = Object.entries(selectedRooms).reduce(
      (total, [name, number]) => {
        const room = rooms?.find((r) => r.name === name);
        return total + nights * (room ? room.dynamicPrice * number : 0);
      },
      0
    );
  
    setTotal(totalPrice);
  
    // Met à jour reservationData
    setReservationData((prev) => ({
      ...prev,
      RoomsSelection: array,
    }));
  
    console.log("RoomsSelection updated:", array);
    console.log("Total:", totalPrice);
    setReservationData((prev) => ({
      ...prev,
      TotalPrice: totalPrice,
    }));
  }, [selectedRooms, rooms]);
   

  useEffect(() => {
    getUser();
    console.log("user", user);
    if (hotel) getHotel();

    console.log(hotels);
  }, []);
  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...reservationData.childrenAges];
    updatedAges[index] = value;
    setReservationData({
      ...reservationData,
      childrenAges: updatedAges,
    });
  };
  const handleChangeCount = (e) => {
    const { name, value } = e.target;
    setReservationData({
      ...reservationData,
      personCount: {
        ...reservationData.personCount,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (reservationData.personCount.Adultes <= 0) {
      toast.warning("Please enter the number of adults.");
      return;
    }
    if (reservationData.personCount.Enfants < 0) {
      toast.warning("Please enter the number of children.");
      return;
    }
    if (reservationData.childrenAges.some((age) => age < 0)) {
      toast.warning("Please enter valid ages for children.");
      return;
    }
    console.log(reservationData)
    axios.post(`http://localhost:4000/reserveacc/reserveracc/order/${user}/${hotel}`,
       {reservationData}
    )
    .then(res => {
        if (res.data && res.data.session_url) {
          toast.info("Redirecting to Paiement...")
          window.location.href = res.data.session_url; // 🔁 Redirige vers Stripe Checkout
        }
      }).catch((error)=>{
         console.log(error)
    })
  };
  useEffect(() => {
    setCheckInDate(localStorage.getItem("checkin"));
    setCheckOutDate(localStorage.getItem("checkout"));
    setReservationData({
      ...reservationData,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
    getRoomsPrices();
  }, [checkInDate, checkOutDate]);

  return (
    <div className="h-full  text-violet900 px-8 py-16 relative mx-10 my-10 mt-40">
      {/* Hotel Details Section */}
      <div className="flex items-center justify-between bg-violet-300 rounded-xl shadow-xl max-h-[400px] overflow-auto mb-8 p-8">
  <div className="w-1/2 pr-8 max-w-[300px] overflow-y-auto">
    <h2 className="md:text-3xl font-semibold text-violet900 mb-4">
      {hotels?.name}
    </h2>
    <p className="text-lg text-gray-700 mb-4">
      This is a wonderful hotel located in the heart of the city with
      amazing amenities and excellent services. It's the perfect place to
      relax and enjoy your vacation.
    </p>
    <p className="text-md text-gray-600">
      <strong>Location:</strong> {hotels?.city}, {hotels?.address},{" "}
      {hotels?.country}
    </p>

    <p className="text-md text-gray-600">
      <strong>Amenities:</strong>{" "}
      {hotels?.features &&
        Object.entries(hotels.features)
          .filter(
            ([key, value]) => value === true && key !== "petsAllowed"
          )
          .map(([key]) =>
            key
              .replace(/^has/, "") // Supprime "has"
              .replace(/([A-Z])/g, " $1") // Ajoute un espace avant majuscule
              .replace(/^./, (str) => str.toUpperCase()) // Majuscule première lettre
              .trim()
          )
          .join(", ")}
    </p>
  </div>

  <div className="w-1/2 flex items-center justify-center h-full">
    <img
      src={`http://localhost:4000${hotels?.images[0]}`}
      alt="Hotel"
      className="w-full rounded-xl shadow-lg object-cover max-h-[300px]"
    />
  </div>
</div>


      {/* Reservation Form Section */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-full max-w-4xl bg-violet-300 rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-violet900 mb-8">
            Book Your Stay
          </h1>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* Room Selection Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-violet900 mb-6">
                Select your Room(s)
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {rooms?.map((room, index) => {
                  const isSelected = selectedRooms[room.name] !== undefined;
                  return (
                    <div key={index}>
                      <div
                        className={`flex items-center justify-between p-4 border rounded-md shadow-md cursor-pointer transition-all duration-300 ${
                          isSelected ? "bg-violet-100" : "bg-white"
                        }`}
                        onClick={() => handleRoomClick(room?.name)}
                      >
                        <div className="flex items-center gap-4">
                          <FaHouseChimneyWindow  className="text-violet900 text-2xl" />
                          <div>
                            <h3 className="font-semibold text-violet900">
                              {room.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {room.description}
                            </p>
                            <p className="text-sm text-gray-600">
                              {room.amenities.join(",")}
                            </p>
                            <p className="text-sm text-gray-600">
                              {room.capacity} Guests
                            </p>
                            <p className="text-sm text-red-900">
                              {room.availableRooms} Rooms Left
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-violet700">
                          {room.dynamicPrice} € / Night
                        </p>
                      </div>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 ml-6">
                              <label className="text-sm text-gray-700 mr-2">
                                Rooms Number:
                              </label>
                              <input
                                type="number"
                                min="1"
                                max={room.availableRooms}
                                value={selectedRooms[room.name]}
                                onChange={(e) => {
                                  handleRoomCountChange(
                                    room.name,
                                    e.target.value
                                  );
                                }}
                                className="p-2 border border-violet900 rounded-md shadow-sm w-24"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Adults and Children Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4">
                <FaUser className="text-violet900 text-2xl" />
                <input
                  type="number"
                  name="Adultes"
                  value={reservationData.personCount.Adultes}
                  onChange={handleChangeCount}
                  placeholder="Adultes"
                  min="1"
                  className="w-full p-4 border border-violet-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                />
              </div>

              <div className="flex items-center gap-4">
                <MdOutlineFamilyRestroom className="text-violet900 text-2xl" />
                <select
                  name="Enfants"
                  value={reservationData.personCount.Enfants}
                  onChange={handleChangeCount}
                  className="w-full p-4 border border-violet-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                >
                  {[...Array(6)].map((_, index) => (
                    <option key={index} value={index}>
                      {index} Child{index === 1 ? "" : "ren"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Children Ages Section */}
            {reservationData.personCount.Enfants > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Enter Children's Ages
                </h2>
                {[...Array(parseInt(reservationData.personCount.Enfants))].map(
                  (_, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <FaBaby className="text-violet900 text-2xl" />
                      <input
                        type="number"
                        value={reservationData.childrenAges[index]}
                        onChange={(e) =>
                          handleChildAgeChange(index, e.target.value)
                        }
                        placeholder={`Child ${index + 1} Age`}
                        min="0"
                        className="w-full p-4 border border-violet-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {/* Dates Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-violet900 text-2xl" />
                <input
                  type="date"
                  name="checkInDate"
                  value={checkInDate}
                  onChange={setCheckInChange}
                  className="w-full p-4 border border-violet-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                />
              </div>

              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-violet900 text-2xl" />
                <input
                  type="date"
                  name="checkOutDate"
                  value={checkOutDate}
                  onChange={setCheckOutChange}
                  className="w-full p-4 border border-violet-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                       <div className="flex items-center gap-4">
                                           <FaUser className="text-violet900 text-2xl" />
                                           <input
                                               type="text"
                                               name="firstname"
                                               value={form?.firstname}
                                               readOnly
                                               placeholder="First Name"
                                               className="w-full p-4 border border-violet-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                                           />
                                       </div>
           
                                       <div className="flex items-center gap-4">
                                           <FaUser className="text-violet900 text-2xl" />
                                           <input
                                               type="text"
                                               name="lastname"
                                               value={form?.lastname}
                                               readOnly
                                               placeholder="Last Name"
                                               className="w-full p-4 border border-violet-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                                           />
                                       </div>
                                   </div>
                                   {/* Contact Information Section */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                       <div className="flex items-center gap-4">
                                       <FaPhoneAlt className="text-violet900 text-2xl" />
                                           <input
                                               type="text"
                                               name="phone"
                                               value={form?.phone}
                                               readOnly
                                               placeholder="Phone Number"
                                               className="w-full p-4 border border-violet900 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                                           />
                                       </div>
           
                                       <div className="flex items-center gap-4">
                                       <FaMailBulk className="text-violet900 text-2xl" />
                                           <input
                                               type="email"
                                               name="email"
                                               value={form?.email}
                                               readOnly
                                               placeholder="Email Address"
                                               className="w-full p-4 border border-violet900 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                                           />
                                       </div>
                                   </div>

            {/* Special Requests Section */}
            <div className="mb-8">
              <textarea
                name="specialRequest"
                value={reservationData.specialRequest}
                onChange={handleChange}
                placeholder="Special Requests"
                rows="4"
                className="w-full p-4 border border-violet-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
              />
            </div>

            <div className="w-full text-right mt-4 text-lg font-semibold">
              Prix total: <span className="text-violet900">{Total} USD</span>
            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 font-bold bg-violet900 text-white rounded-md shadow-md hover:bg-violet700 focus:outline-none focus:ring-2 focus:ring-violet900"
              >
                Complete Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
