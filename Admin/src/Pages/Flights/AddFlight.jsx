import { useState } from 'react';
import axios from 'axios';
import countries from '../../data/countries';
import {toast} from 'react-toastify'

export default function AddFlight() {
  const [flightData, setFlightData] = useState({
    airline: '',
    flightNumber: '',
    departureAirport: '',
    returnAirport: '',
    departurePlace: '',
    returnPlace: '',
    from: '',
    to: '',
    departureTime: '',
    returnTime: '',
    departureDate: '',
    returnDate: '',
    duration: '',
    onboardServices: [],
    Includedbaggage: { included: false, weight: 0 },
    cabinAllowance: '',
    refundable: false,
    flightType: '',
    classes: [
      {
        name: '', // e.g., "Economy"
        price: 0,
        availableSeats: 0,
      },
    ],
    
  });
  const token=localStorage.getItem("admin");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();

    // Assure-toi que Reservation.date est bien un objet Date, sinon convertis-le
    const reservationDate = new Date(flightData.departureDate.date);
    
    // Mets les heures, minutes, secondes et millisecondes à zéro pour ne comparer que la date
    today.setHours(0, 0, 0, 0);
    reservationDate.setHours(0, 0, 0, 0);
    // Basic validation
    if (!flightData.from || !flightData.to || !flightData.airline || !flightData.flightNumber || !flightData.departureAirport || !flightData.departureTime || !flightData.departureDate || !flightData.duration || !flightData.flightType) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (reservationDate<today) {
      toast.error('Departure Date has already passed.');
      return;
    }
    if (flightData.departureDate>flightData.returnDate) {
      toast.error('Dates are not valid');
      return;
    }
    try {
      await axios.post('http://localhost:4000/flight/admin/flights',
         flightData,
        {headers:{
          'Authorization':`Bearer ${token}`
         }
      });
      toast.success('Flight added successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Error adding flight');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-violet-200 shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl text-violet-900 font-bold mb-4">Flight Information</h2>
      
      {/* From */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">From</label>
        <select
          
          className="input"
          value={flightData.from}
          onChange={(e) => setFlightData({ ...flightData, from: e.target.value })}
          required
        >
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* To */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">To</label>
        <select
          className="input"
          value={flightData.to}
          onChange={(e) => setFlightData({ ...flightData, to: e.target.value })}
          required
        >
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Airline */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Airline</label>
        <input
          type="text"
          className="input"
          placeholder="Airline Name"
          value={flightData.airline}
          onChange={(e) => setFlightData({ ...flightData, airline: e.target.value })}
          required
        />
      </div>

      {/* Flight Number */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Flight Number</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. AF123"
          value={flightData.flightNumber}
          onChange={(e) => setFlightData({ ...flightData, flightNumber: e.target.value })}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Departure Airport</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. CDG"
          value={flightData.departureAirport}
          onChange={(e) => setFlightData({ ...flightData, departureAirport: e.target.value })}
          required
        />
      </div>
      {/* Departure Airport */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Departure Place</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. CDG"
          value={flightData.departurePlace}
          onChange={(e) => setFlightData({ ...flightData, departurePlace: e.target.value })}
          required
        />
      </div>

      {/* Departure Time */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Departure Time</label>
        <input
          type="time"
          className="input"
          value={flightData.departureTime}
          onChange={(e) => setFlightData({ ...flightData, departureTime: e.target.value })}
          required
        />
      </div>

      {/* Departure Date */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Departure Date</label>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]} 
          className="input"
          value={flightData.departureDate}
          onChange={(e) => setFlightData({ ...flightData, departureDate: e.target.value })}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Arrival Place</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. CDG"
          value={flightData.returnPlace}
          onChange={(e) => setFlightData({ ...flightData, returnPlace: e.target.value })}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Arrival Airport</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. CDG"
          value={flightData.returnAirport}
          onChange={(e) => setFlightData({ ...flightData, returnAirport: e.target.value })}
          required
        />
      </div>

      {/* Departure Time */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Arrival Time</label>
        <input
          type="time"
          className="input"
          value={flightData.returnTime}
          onChange={(e) => setFlightData({ ...flightData, returnTime: e.target.value })}
          required
        />
      </div>

     
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Return Date</label>
        <input
          type="date"
          className="input"
          min={new Date().toISOString().split("T")[0]} 
          value={flightData.returnDate}
          onChange={(e) => setFlightData({ ...flightData, returnDate: e.target.value })}
          required
        />
      </div>
      {/* Flight Type */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-xl text-violet-900">Flight Type</label>
        <select
          value={flightData.flightType}
          onChange={(e) => setFlightData({ ...flightData, flightType: e.target.value })}
          className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full"
          required
        >
          <option value="">Select option</option>
          <option value="one-way">One-way</option>
          <option value="round-trip">Round-trip</option>
        </select>
      </div>

      {/* Flight Duration */}
      <div className="flex flex-col">
        <label className="font-bold text-xl text-violet-900">Flight Duration</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. 8h 30m"
          value={flightData.duration}
          onChange={(e) => setFlightData({ ...flightData, duration: e.target.value })}
          required
        />
      </div>

      {/* Onboard Services */}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-xl text-violet-900">Onboard Services</label>
        <div className="flex flex-wrap gap-2">
          {['Meal', 'WiFi', 'Entertainment', 'USB Charging', 'Blanket'].map((service) => (
            <label key={service} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={flightData.onboardServices.includes(service)}
                onChange={(e) => {
                  const newServices = [...flightData.onboardServices];
                  if (e.target.checked) {
                    newServices.push(service);
                  } else {
                    const index = newServices.indexOf(service);
                    if (index > -1) newServices.splice(index, 1);
                  }
                  setFlightData({ ...flightData, onboardServices: newServices });
                }}
              />
              {service}
            </label>
          ))}
        </div>
      </div>

      {/* Flight Classes */}
      <div className="flex flex-col gap-4">
        <label className="font-bold text-xl text-violet-900">Flight Classes</label>
        <div className="grid grid-cols-3 gap-4">
          {flightData.classes.map((cls, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 items-center col-span-3">
              <select
                value={cls.name}
                onChange={(e) => {
                  const updatedClasses = [...flightData.classes];
                  updatedClasses[index].name = e.target.value;
                  setFlightData({ ...flightData, classes: updatedClasses });
                }}
                className="h-[45px] border-2 px-4 border-violet-900 rounded-lg"
                required
              >
                <option value="">Select class</option>
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
              <input
                type="number"
                placeholder="Seats"
                min={0}
                value={cls.availableSeats}
                onChange={(e) => {
                  const updatedClasses = [...flightData.classes];
                  updatedClasses[index].availableSeats = e.target.value;
                  setFlightData({ ...flightData, classes: updatedClasses });
                }}
                className="h-[45px] border-2 px-4 border-violet-900 rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Price"
                min={0}
                value={cls.price}
                onChange={(e) => {
                  const updatedClasses = [...flightData.classes];
                  updatedClasses[index].price = e.target.value;
                  setFlightData({ ...flightData, classes: updatedClasses });
                }}
                className="h-[45px] border-2 px-4 border-violet-900 rounded-lg"
                required
              />
            </div>
          ))}
        </div>
      </div>
 <div className="flex items-center gap-2">
      <label className="font-bold text-xl text-violet-900">Weight Baggage (kg)</label>
      <input
        type="number"
        className="input"
        value={flightData?.Includedbaggage?.weight || 0}
        onChange={e =>
          setFlightData({
            ...flightData,
            Includedbaggage: {
              ...flightData?.Includedbaggage,
              weight: parseInt(e.target.value) || 0,
            },
          })
        }
      />
    </div>
          <div className="flex items-center gap-2">
            <label className="font-bold text-xl text-violet-900">Cabin Allowance</label>
            <input type="text" className='input' value={flightData?.cabinAllowance}
              onChange={e => setFlightData({ ...flightData, cabinAllowance: e.target.value })} />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-bold text-xl text-violet-900">Refundable</label>
            <input value={flightData?.refundable}
            type="checkbox" checked={flightData?.refundable}
              onChange={e => setFlightData({ ...flightData, refundable: e.target.checked })} />
          </div>
    
        
      {/* Submit Button */}
      <div className="flex justify-center">
        <button type="submit" className="bg-violet-900 text-white px-6 py-2 rounded-lg text-xl">
          Add Flight
        </button>
      </div>
    </form>
  );
}
