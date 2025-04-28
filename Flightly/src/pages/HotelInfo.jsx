import {
  FaClock,
  FaWifi,
  FaChair,
  FaStar,
  FaEarthAmericas,
  FaPhone,
  FaSpa,
  FaUmbrellaBeach,
} from "react-icons/fa6";
import { PiClockClockwiseBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  MdLocalParking,
  MdPool,
  MdDateRange,
  MdRoomPreferences,
  MdOutlineRoomPreferences,
  MdEmail,
  MdSportsGymnastics,
  MdLocalBar,
} from "react-icons/md";
import { use, useEffect, useState } from "react";
import { MdPets } from "react-icons/md";

import axios from "axios";
import { TbBeachOff, TbBrandBooking } from "react-icons/tb";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Pour personnaliser le marqueur si tu veux
import { LucideClockAlert } from "lucide-react";
import { toast } from "react-toastify";

// Exemple de longitude (Paris)
const HotelDetails = () => {
  const hotel = JSON.parse(localStorage.getItem("details"));
  const [hotels, setHotels] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [Type, setType] = useState(null);
  const handleCheckInDate = (e) => {
    setCheckInDate(e.target.value);
    console.log("Selected Check-in Date:", checkInDate);
  };
  const getHotelCoordinates = async (address) => {
    const apiKey = "YOUR_OPENCAGE_API_KEY";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const location = response.data.results[0].geometry;
      return { lat: location.lat, lng: location.lng };
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  };
  const navigate = useNavigate();
  const [hotelPosition, setHotelPosition] = useState(null);
  const hotelAddress = "10 Downing Street, London, UK"; // Exemple d'adresse d'hôtel

  useEffect(() => {
    const fetchCoordinates = async () => {
      const position = await getHotelCoordinates(hotelAddress);
      if (position) {
        setHotelPosition(position);
      }
    };

    fetchCoordinates();
  }, []);
  const navigateToReserv = (Id) => {
    localStorage.setItem("HotelReserveId", Id);
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Pour ignorer l'heure

    if (checkIn > today && checkOut > today && checkIn < checkOut) {
      localStorage.setItem("checkin", checkInDate);
      localStorage.setItem("checkout", checkOutDate);
      navigate("/reservation");
    } else {
      toast(
        "Les dates doivent être valides."
      );
    }
  };

  const handleCheckOutDate = (e) => {
    setCheckOutDate(e.target.value);
    console.log("Selected Check-out Date:", checkOutDate);
  };
  const lat = 48.8566; // Exemple de latitude (Paris)
  const lon = 2.3522;
  const getRoomsPrices = () => {
    axios
      .get(
        `http://localhost:4000/api/accommodation/roomPrices/${hotel}?startDate=${checkInDate}&endDate=${checkOutDate}`
      )
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function formatDayAndDate(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);

    const weekday = date.toLocaleDateString("en-US", { weekday: "short" }); // "Mon", "Tue", etc.
    const day = date.getDate(); // 1 → 31
    const month = date.toLocaleDateString("en-US", { month: "short" }); // Jan, Feb...
    const year = date.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
  }
  const getHotel = () => {
    axios
      .get(`http://localhost:4000/api/accommodation/${hotel}`)
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
  function formatTo12Hour(time) {
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr);
    const minute = minuteStr;
    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12; // 0 or 12 becomes 12
    return `${hour}:${minute} ${period}`;
  }
  useEffect(() => {
    getHotel();
    getRoomsPrices();
  }, []);
  console.log(hotels);
  return (
    <div className="bg-violet-300 h-full mt-40 text-violet900 px-8 py-16 relative my-10 mx-10">
      {/* Hotel Info */}

      <div className="grid md:grid-cols-[1.5fr_1fr] grid-cols-1 w-full h-full gap-5 justify-center items-center p-10 ">
        <>
          <div className="h-full w-full ">
            <img
              src={`http://localhost:4000${hotels?.images[0]}`}
              alt="Hotel"
              className="w-full h-[500px] object-cover rounded-2xl"
            />

            <div className="flex flex-col gap-5 text-violet900 items-start justify-start py-20">
              <h1 className="text-5xl font-bold">{hotels?.name}</h1>
              <span className="flex gap-5">
                {" "}
                <FaEarthAmericas size={20} /> {hotels?.address}
                {Type === "Hotel" ? (
                  <>
                    <FaStar size={20} /> {hotels?.stars}
                  </>
                ) : (
                  <></>
                )}
              </span>
              <p>{hotels?.description}</p>
              <div className="grid md:grid-cols-2 gap-10">
  <div className="grid grid-rows-3 gap-5 items-start justify-start py-10 ">
    <span className="flex gap-2 items-center wrap-break-word">
      <MdEmail size={20} /> Email: {hotels?.Email}
    </span>
    <span className="flex gap-2 items-center">
      <FaPhone size={20} /> Phone: {hotels?.Phone}
    </span>
    <span className="flex gap-2 items-center">
      <TbBrandBooking size={20} /> Reservation Phone:{" "}
      {hotels?.ReservationPhone}
    </span>
  </div>
  {Type === "Hotel" ? (
    <div className="grid grid-rows-3 gap-5 items-start justify-start py-10 max-w-full">
      <span className="flex gap-2 items-center">
        <MdOutlineRoomPreferences size={20} /> Total Rooms:{" "}
        {hotels?.TotalRooms}
      </span>
      <span className="flex gap-2 items-center">
        <MdOutlineRoomPreferences size={20} /> Total Floors:{" "}
        {hotels?.TotalFloors}
      </span>
    </div>
  ) : (
    <></>
  )}
</div>


              <div className="rounded-xl p-5 border-2 w-full h-full border-violet900">
                <h1 className="text-3xl font-bold">{Type} Informations</h1>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <div className="grid grid-rows-5 gap-2 items-start justify-start py-10">
                    <span className="flex gap-2">
                      <FaClock size={20} />
                      Check In :{" "}
                      {hotels?.checkInTime
                        ? formatTo12Hour(hotels.checkInTime)
                        : "N/A"}
                    </span>
                    <span className="flex gap-2">
                      <FaClock size={20} />
                      Check Out :{" "}
                      {hotels?.checkOutTime
                        ? formatTo12Hour(hotels.checkOutTime)
                        : "N/A"}
                    </span>
                    <span className="flex gap-2 items-center">
                      <FaClock size={20} /> Min Age to Check-In:{" "}
                      {hotels?.minAgeToCheckIn}
                    </span>
                  </div>

                  <div className="grid grid-rows-3 gap-5 items-start justify-start py-10">
                    {" "}
                    {hotels?.features.hasParking ? (
                      <span className="flex gap-2 ">
                        <MdLocalParking size={20} />
                        Parking Available
                      </span>
                    ) : (
                      <></>
                    )}
                    {hotels?.features.hasWifi ? (
                      <span className="flex gap-2 items-center">
                        <FaWifi size={20} />
                        Wifi Available
                      </span>
                    ) : (
                      <></>
                    )}
                    {hotels?.features.hasPool ? (
                      <span className="flex gap-2 items-center">
                        <MdPool size={20} /> Pool Access{" "}
                      </span>
                    ) : (
                      <></>
                    )}
                    <span className="flex gap-2 items-center">
                      <FaEarthAmericas size={20} /> Languages:{" "}
                      {hotels?.languagesSpoken
                        ? hotels?.languagesSpoken.join(", ")
                        : ""}
                    </span>
                    <span className="flex gap-2 items-center">
                      <MdPets size={20} />{" "}
                      {hotels?.features.petsAllowed
                        ? "Pets Allowed"
                        : "Pets Not Allowed"}
                    </span>
                    {hotels?.features.hasGym ? (
                      <span className="flex gap-2">
                        <MdSportsGymnastics size={20} />
                        Gym Available
                      </span>
                    ) : (
                      <></>
                    )}
                    <span className="flex gap-2">
                      {hotels?.features.hasBeach ? (
                        <span className="flex gap-2">
                          <FaUmbrellaBeach size={20} />
                          Front Beach
                        </span>
                      ) : (
                        <span className="flex gap-2">
                          <TbBeachOff size={20} />
                          No Beach
                        </span>
                      )}
                    </span>
                    {hotels?.features.hasSpa ? (
                      <span className="flex gap-2">
                        <FaSpa size={20} />
                        Spa Available{" "}
                      </span>
                    ) : (
                      <></>
                    )}
                    {hotels?.features.hasBar ? (
                      <span className="flex gap-2">
                        <MdLocalBar size={20} />
                        Bar Available
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold">{Type} Activities</h1>
                  <span>{hotels?.activities?.join(", ")}</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-violet900 mb-8 text-center">
                Room Types & Prices
              </h2>
              <div className="w-full mb-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    getRoomsPrices();
                  }}
                  className="bg-violet100 p-8 rounded-3xl shadow-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* FROM */}
                    <div className="flex flex-col w-full">
                      <label className="flex items-center gap-2 text-violet-800 text-lg font-semibold mb-2">
                        <MdDateRange size={24} />
                        From
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]} 
                        className="border-2 border-violet900 text-violet900 font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                        value={checkInDate}
                        onChange={handleCheckInDate}
                      />
                    </div>

                    {/* TO */}
                    <div className="flex flex-col w-full">
                      <label className="flex items-center gap-2 text-violet900 text-lg font-semibold mb-2">
                        <MdDateRange size={24} />
                        To
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]} 
                        className="border-2 border-violet900 text-violet900 font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                        value={checkOutDate}
                        onChange={handleCheckOutDate}
                      />
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="flex justify-center mt-10">
                    <button
                      type="submit"
                      className="bg-violet900 hover:bg-violet800 text-white font-semibold px-10 py-3 rounded-xl shadow-md transition-all duration-200"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="grid sm:grid-rows lg:grid-rows gap-6 w-full ">
                {/* Room 1 */}
                {rooms?.map((room, index) => (
                  <div
                    key={index}
                    className="border border-violet900 rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-6 p-6  hover:shadow-2xl transition-shadow duration-300"
                  >
                    {/* Image */}
                    <img
                      className="w-full h-72 object-cover rounded-2xl"
                      alt={room.name}
                      src={`http://localhost:4000${room?.roomImages[0]}`}
                    />

                    {/* Info */}
                    <div className="flex flex-col justify-between gap-4">
                      {/* Title & Description */}
                      <div>
                        <h3 className="text-2xl font-bold text-violet-900 mb-2">
                          {room.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {room.description}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          <span className="font-semibold">Amenities:</span>{" "}
                          {room?.amenities?.join(", ")}
                        </p>
                        <p>
                          <span className="font-semibold">Area:</span>{" "}
                          {room.area} m²
                        </p>
                        <p>
                          <span className="font-semibold">Room Count:</span>{" "}
                          {room.roomNumber}
                        </p>
                        <p>
                          <span className="font-semibold">Capacity:</span>{" "}
                          {room.capacity} guests
                        </p>
                      </div>

                      {/* Beds */}
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800 mb-1">
                          Beds:
                        </h4>
                        <ul className="list-disc ml-5 text-sm text-gray-700">
                          {room.beds.map((bed, index) => (
                            <li key={index}>
                              {bed.number}x {bed.typeBed}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price & Availability */}
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xl font-bold text-violet-900">
                          From ${room.dynamicPrice} / night
                        </p>
                        <span className="text-red-900 font-semibold">
                          <LucideClockAlert />
                          {room.availableRooms} left
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Room 2 */}
              </div>
            </div>
          </div>
          <div className=" h-full">
            <div className=" grid grid-rows-2 gap-4">
              <div className="w-full h-[240px]">
                <img
                  src={`http://localhost:4000${hotels?.images[1]}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="w-full h-[240px]">
                <img
                  src={`http://localhost:4000${hotels?.images[2]}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="flex text-violet900 flex-col justify-start gap-6 items-start border-1 rounded-2xl py-10 mt-20 px-10 w-full max-w-2xl">
                <MapContainer
                  center={[lat, lon]}
                  zoom={13}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={[lat, lon]}>
                    <Popup>C'est Paris !</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="flex text-violet900 flex-col justify-start gap-6 items-start border-1 rounded-2xl py-10 mt-20 px-10 w-full max-w-2xl">
                {hotels?.offers ? (
                  <>
                    <h1 className="text-4xl font-extrabold text-violet-900 mb-4">
                      {hotels?.offers?.title}
                    </h1>

                    <p className="text-xl text-gray-700 font-medium mb-6">
                      {hotels?.offers?.description}
                    </p>

                    {/* Discount */}
                    <div className="flex w-full justify-center mb-6">
                      {hotels?.offers?.discountPercentage ? (
                        <span className="bg-yellow-400 text-violet-900 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-yellow-300 transition">
                          {hotels.offers.discountPercentage}% OFF
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">
                          No discount available
                        </span>
                      )}
                    </div>

                    {/* Activities */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold mb-2">
                        Activities Included:
                      </h2>
                      <ul className="list-disc ml-6 text-gray-800 text-lg space-y-1">
                        {hotels?.offers?.activities?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Booking Info */}
                    <div className=" border border-violet-200 rounded-xl p-6 space-y-3 text-lg text-gray-800 shadow-sm">
                      <h2 className="text-xl font-bold text-violet-800 mb-2">
                        Booking Information
                      </h2>

                      <div className="flex items-center gap-2">
                        <MdDateRange size={22} className="text-violet-700" />
                        <span>
                          <strong>Check-in:</strong>{" "}
                          {hotels?.offers.validFrom
                            ? formatDayAndDate(hotels?.offers.validFrom)
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MdDateRange size={22} className="text-violet-700" />
                        <span>
                          <strong>Check-out:</strong>{" "}
                          {hotels?.offers.validTo
                            ? formatDayAndDate(hotels?.offers.validTo)
                            : "N/A"}
                        </span>
                      </div>

                      <p>
                        <strong>Max Occupancy:</strong>{" "}
                        {hotels?.offers.maxOccupancy} guests
                      </p>

                      <p>
                        <strong>Included Services:</strong>{" "}
                        {hotels?.offers?.includedServices?.join(", ") || "None"}
                      </p>

                      <p>
                        <strong>Cancellation Policy:</strong>{" "}
                        {hotels?.offers.cancellationPolicy}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col w-full">
                    <div className=" border-l-4 border-violet900 p-4 rounded my-6">
                      <p className="text-violet900 font-medium">
                        No offers available for the moment.
                      </p>
                      <p className="text-sm mt-1 text-violet900">
                        Be the first to know when an offer becomes available!
                      </p>
                      <button className="mt-2 bg-violet900 text-white px-4 py-2 rounded hover:bg-violet-500">
                        Subscribe to alerts
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-4 text-sm w-full">
                  <h1 className="text-2xl font-bold mb-4 flex justify-start gap-2">
                    Selected Dates :
                  </h1>
                  <label className="text-2xl font-bold mb-4 flex justify-start gap-2">
                    <MdDateRange size={40} />
                    Check-in Date:{" "}
                    {formatDayAndDate(checkInDate) || "No Date Selected"}
                  </label>

                  <label className="text-2xl font-bold mb-4 flex justify-start gap-2">
                    <MdDateRange size={40} />
                    Check-out Date:{" "}
                    {formatDayAndDate(checkOutDate) || "No Date Selected"}
                  </label>
                  <button
                    onClick={() => navigateToReserv(hotels._id)}
                    className="button !rounded-xl !w-full mt-6"
                  >
                    Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default HotelDetails;
