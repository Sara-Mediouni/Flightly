import axios from 'axios';
import React, { useEffect, useState } from 'react'
import countries from '../../data/countries';

const EditFlight = () => {
    const id=localStorage.getItem('idflight');
    console.log(id)
    const [flightData, setFlightData] = useState(null);
    
    const getFlightData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/flight/${id}`);
            const flight = response.data;
            setFlightData(flight);
        } catch (error) {
            console.error('Error fetching flight data:', error);
        }
    };
    const formatDateForInput = (date) => {
        return date ? new Date(date).toISOString().split("T")[0] : "";
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
       
        
    
        try {
          await axios.put(`http://localhost:4000/api/flight/edit/${id}`, flightData);
          alert('Flight Updated successfully!');
        } catch (err) {
          console.error(err);
          alert('Error Updating flight');
        }
      };
    useEffect(() => {
        getFlightData();
        console.log(flightData)
        }
        , []);
      
      return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-violet-200 shadow-md rounded-lg space-y-6">
          <h2 className="text-2xl text-violet-900 font-bold mb-4">Flight Information</h2>
          <div className="flex flex-col">
          <label className="font-bold text-xl text-violet-900">From</label><select
             className="input"
             value={flightData?.from}
             onChange={(e) => setFlightData({ ...flightData, from: e.target.value })}
           >
             <option value="">Select a Country</option>
             {countries.map((country) => (
               <option key={country} value={country}>
                 {country}
               </option>
             ))}
           </select></div>
           <div className="flex flex-col">
          <label className="font-bold text-xl text-violet-900">To</label><select
             className="input"
             value={flightData?.to}
             onChange={(e) => setFlightData({ ...flightData, to: e.target.value })}
           >
             <option value="">Select a Country</option>
             {countries.map((country) => (
               <option key={country} value={country}>
                 {country}
               </option>
             ))}
           </select></div>
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Airline</label>
            <input type="text" className="input"
            value={flightData?.airline}
             placeholder="Airline Name"
              onChange={e => setFlightData({ ...flightData, airline: e.target.value })} />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Departure Place</label>
            <input type="text" 
            value={flightData?.departurePlace}
            className="input" placeholder="Departure Place"
              onChange={e => setFlightData({ ...flightData, departurePlace: e.target.value })} />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Arrival Place</label>
            <input type="text" value={flightData?.returnPlace}
             className="input" placeholder="Arrival Place"
              onChange={e => setFlightData({ ...flightData, returnPlace: e.target.value })} />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Flight Number</label>
            <input type="text" value={flightData?.flightNumber}
            className="input" placeholder="e.g. AF123"
              onChange={e => setFlightData({ ...flightData, flightNumber: e.target.value })} />
          </div>
    
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Departure Airport</label>
            <input type="text" value={flightData?.departureAirport}
            className="input" placeholder="e.g. CDG"
              onChange={e => setFlightData({ ...flightData, departureAirport: e.target.value })} />
          </div>
    
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Arrival Airport</label>
            <input type="text" className="input"
             placeholder="e.g. JFK" value={flightData?.returnAirport}
              onChange={e => setFlightData({ ...flightData, returnAirport: e.target.value })} />
          </div>
     <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Departure Time</label>
            <input type="time" className="input" value={flightData?.departureTime}
              onChange={e => setFlightData({ ...flightData, departureTime: e.target.value })} />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Arrival Time</label>
            <input type="time" className="input" value={flightData?.returnTime}
              onChange={e => setFlightData({ ...flightData, returnTime: e.target.value })} />
          </div>
    
         
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Departure Date</label>
            <input type="date" className="input" value={formatDateForInput(flightData?.departureDate)}
              onChange={e => setFlightData({ ...flightData, departureDate: e.target.value })} />
          </div>
    
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Arrival Date</label>
            <input type="date" className="input" value={formatDateForInput(flightData?.returnDate)}
              onChange={e => setFlightData({ ...flightData, returnDate: e.target.value })} />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-xl text-violet-900">Flight Duration</label>
            <input type="text" className="input" value={flightData?.duration}
            placeholder="e.g. 8h 30m"
              onChange={e => setFlightData({ ...flightData, duration: e.target.value })} />
          </div>
    
       
          <div className="flex flex-col gap-2">
        <label className="font-bold text-xl text-violet-900">Transit</label>
        <select onChange={e => setFlightData({ ...flightData, transit: e.target.value })} 
        value={flightData?.transit}
        className="h-[45px] border-2 px-4 border-violet-900 rounded-lg w-full">
                    <option value="">Select option</option>
                    <option value="stops">Stops</option>
                    <option value="non-stop">Non-Stop</option>
                    <option value="transit">Transit</option>
                  </select>
        
      </div>
      <div className="flex flex-col gap-4">
  <label className="font-bold text-xl text-violet-900">Flight Classes</label>

  <div className="grid grid-cols-3 gap-4">
    {flightData?.classes.map((cls, index) => (
      <div key={index} className="grid grid-cols-3 gap-2 items-center col-span-3">
        {/* Dropdown for class name */}
        <select
          value={cls.name}
          onChange={e => {
            const updatedClasses = [...flightData.classes];
            updatedClasses[index].name = e.target.value;
            setFlightData({ ...flightData, classes: updatedClasses });
          }}
          className="h-[45px] border-2 px-4 border-violet-900 rounded-lg"
        >
          <option value="">Select class</option>
          <option value="Economy">Economy</option>
          <option value="Premium Economy">Premium Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </select>

        {/* Seats input */}
        <input
          type="number"
          placeholder="Seats"
          min={0}
          value={cls.availableSeats}
          onChange={e => {
            const updatedClasses = [...flightData.classes];
            updatedClasses[index].availableSeats = e.target.value;
            setFlightData({ ...flightData, classes: updatedClasses });
          }}
          className="h-[45px] border-2 px-4 border-violet-900 rounded-lg"
        />

        {/* Price input */}
        <input
          type="number"
          placeholder="Price"
          min={0}
          value={cls.price}
          onChange={e => {
            const updatedClasses = [...flightData.classes];
            updatedClasses[index].price = e.target.value;
            setFlightData({ ...flightData, classes: updatedClasses });
          }}
          className="h-[45px] border-2 px-4 border-violet-900 rounded-lg"
        />
      </div>
    ))}
  </div>

  {/* Buttons */}
  <div className="flex gap-4">
    <button
      onClick={() =>
        setFlightData({
          ...flightData,
          classes: [
            ...flightData.classes,
            { name: "", price: 0, availableSeats: 0 },
          ],
        })
      }
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
    >
      Add Class
    </button>

    <button
      onClick={() => {
        const updated = [...flightData.classes];
        updated.pop();
        setFlightData({ ...flightData, classes: updated });
      }}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Remove Last
    </button>
  </div>
</div>

          
    
      
          <div className="flex items-center gap-2">
      <label className="font-bold text-xl text-violet-900">Baggage Included</label>
      <input value={flightData?.Includedbaggage?.included || false}
        type="checkbox"
        checked={flightData?.Includedbaggage?.included || false}
        onChange={e =>
          setFlightData({
            ...flightData,
            Includedbaggage: {
              ...flightData?.Includedbaggage,
              included: e.target.checked,
            },
          })
        }
      />
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
    
        
    
          <button type="submit" className="bg-violet-900 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded">
            Add Flight
          </button>
        </form>
      );
    }

export default EditFlight