import React, { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaBaby,
  FaPhoneAlt,
  FaMailBulk,
} from "react-icons/fa";
import flightImage from "../assets/jack-ward-rknrvCrfS1k-unsplash.jpg";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FlightReservation = () => {
  const [form, setForm] = useState(null);
  const idFlight = localStorage.getItem("idFlight");
  const [pricePerPerson, setpricePerPerson] = useState(null);
  const [flight, setFlight] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const [flightData, setFlightData] = useState({
    flightClass: "",
    personCount: { Adultes: 0, Enfants: 0 },
    TotalPrice: 0,
    childrenAges: [],
    SpecialRequest: "",
    paymentStatus: "Pending", // Default class
  });

  // Liste des vols disponibles (exemple)

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };
  const handleChangeCount = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      personCount: {
        ...flightData.personCount,
        [name]: parseInt(value),
      },
    });
  };

  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...flightData.childrenAges];
    updatedAges[index] = value;
    setFlightData({
      ...flightData,

      childrenAges: updatedAges,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateTotalPrice();
    if (!flightData.flightClass) {
      toast.error("Please select a flight class.");
      return;
    }
    if (flightData.personCount.Adultes <= 0) {
      toast.error("Please enter the number of adults.");
      return;
    }
    if (flightData.personCount.Enfants < 0) {
      toast.error("Please enter the number of children.");
      return;
    }
    if (flightData.childrenAges.some((age) => age < 0)) {
      toast.error("Please enter valid ages for children.");
      return;
    }
    if (
      flightData.personCount.Adultes + flightData.personCount.Enfants >
      flight?.availableSeats
    ) {
      toast.error(
        "Not enough available seats for the selected number of passengers."
      );
      return;
    }
    console.log(flightData);
    axios
      .post(
        `http://localhost:4000/reserveflight/reserveflight/order/${user}/${idFlight}`,
        { flightData }
      )
      .then((res) => {
        if (res.data && res.data.session_url) {
          toast.info("Redirecting to Paiement...");
          window.location.href = res.data.session_url; // 🔁 Redirige vers Stripe Checkout
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formatDateForInput = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };
  const handleFlightSelection = (name, price) => {
    setpricePerPerson(price);
    console.log(pricePerPerson);

    setFlightData({
      ...flightData,
      flightClass: name,
    });
  };
  const getFlightData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/flight/flight/${idFlight}`
      );
      const flight = response.data;
      setFlight(flight);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };
  const calculateTotalPrice = () => {
    const adultes = flightData.personCount?.Adultes || 0;
    const enfants = flightData.personCount?.Enfants || 0;
    const totalPersons = adultes + enfants;
    const totalprice = totalPersons * pricePerPerson;

    setFlightData((prev) => ({
      ...prev,
      TotalPrice: parseInt(totalprice),
    }));
  };

  useEffect(() => {
    getFlightData();
    getUser();
  }, []);
  useEffect(() => {
    calculateTotalPrice();
  }, [flightData.personCount?.Adultes, flightData.personCount?.Enfants]);
  return (
    <div className="h-full  text-violet900 px-8 py-16 relative mx-10 mt-40">
      {/* Flight Details Section */}
      <div className="flex items-center justify-between bg-violet-300 rounded-xl 
      shadow-xl max-h-[400px] overflow-auto mb-8 p-8">
        <div className="w-1/2 pr-8 max-w-[300px] overflow-y-auto">
          <h2 data-testid="Book Your Flight" className="md:text-3xl font-semibold text-violet900 mb-4">
            Book Your Flight
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Choose from a variety of flights and enjoy the best services during
            your journey. We offer different classes and comfortable flight
            options to ensure a great experience.
          </p>
          <p className="text-md text-gray-600">
            <strong>Traveling From:</strong> {flight?.departurePlace},{" "}
            {flight?.departureAirport}
          </p>
          <p className="text-md text-gray-600">
            <strong>Destination:</strong> {flight?.returnPlace},{" "}
            {flight?.returnAirport}
          </p>
          <p className="text-md text-gray-600">
            <strong>Duration:</strong> {flight?.duration}
          </p>
        </div>
        <div className="w-1/2">
          <img
            src={flightImage}
            alt="Flight"
            className="w-full  rounded-xl shadow-lg object-cover max-h-[300px]"
          />
        </div>
      </div>

      {/* Reservation Form Section */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-full max-w-4xl bg-violet-300 rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-violet-900 mb-8">
            Flight Reservation
          </h1>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* Flight Selection Section */}

            {/* Flight Class Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Select Your Flight Class
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {flight?.classes.map((cls, index) => (
                  <div
                    key={index}
                    name="flightClass"
                    className={`flex items-center justify-between p-4 border rounded-md shadow-md cursor-pointer ${
                      flightData.flightClass === cls.name
                        ? "bg-violet-100"
                        : "bg-white"
                    }`}
                    onClick={() => handleFlightSelection(cls.name, cls.price)}
                  >
                    <div>
                      <h3 className="font-semibold text-violet-900 capitalize">
                        {cls.name} Class
                      </h3>
                      <p className="text-sm text-gray-700">
                        {cls.availableSeats} Seats
                      </p>
                    </div>
                    <p className="text-lg font-bold text-violet-700">
                      ${cls.price} / Ticket
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Passengers Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4">
                <FaUser className="text-violet900 text-2xl" />
                <input
                  type="number"
                  name="Adultes"
                  value={flightData.personCount.Adultes}
                  onChange={handleChangeCount}
                  placeholder="Adults"
                  min="1"
                  className="w-full p-4 border border-violet900 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                />
              </div>

              <div className="flex items-center gap-4">
                <FaUser className="text-violet900 text-2xl" />
                <select
                  name="Enfants"
                  value={flightData.personCount.Enfants}
                  onChange={handleChangeCount}
                  className="w-full p-4 border border-violet900 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
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
            {flightData.personCount.Enfants > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Enter Children's Ages
                </h2>
                {[...Array(parseInt(flightData.personCount.Enfants))].map(
                  (_, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <FaBaby className="text-violet900 text-2xl" />
                      <input
                        type="number"
                        value={flightData.childrenAges[index]}
                        onChange={(e) =>
                          handleChildAgeChange(index, e.target.value)
                        }
                        placeholder={`Child ${index + 1} Age`}
                        min="0"
                        className="w-full p-4 border border-violet900 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
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
                  name="departureDate"
                  value={formatDateForInput(flight?.departureDate)}
                  className="w-full p-4 border border-violet900 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
                />
              </div>

              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-violet900 text-2xl" />
                <input
                  type="date"
                  name="returnDate"
                  value={formatDateForInput(flight?.returnDate)}
                  className="w-full p-4 border border-violet900 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
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
                name="SpecialRequest"
                value={flightData.SpecialRequest}
                onChange={handleChange}
                placeholder="Special Requests"
                rows="4"
                className="w-full p-4 border border-violet900 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet900"
              />
            </div>

            <div className="w-full text-right mt-4 text-lg font-semibold">
              Total Price:{" "}
              <span className="text-violet900">
                {flightData.TotalPrice} USD
              </span>
            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 font-bold bg-violet900 text-white rounded-md shadow-md hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet900"
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

export default FlightReservation;
