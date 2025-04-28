import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { MdEditDocument } from "react-icons/md";

export default function ListFlight() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/api/flight/flights/${id}`);
    setFlights(flights.filter((flight) => flight._id !== id));
    getAllFlights(); // Refresh the flight list after deletion
  } catch (error) {
    console.error('Error deleting flight:', error);
  }
};

const getAllFlights = async () => { 
  try {
    const response = await axios.get('http://localhost:4000/api/flight/allflights');
    setFlights(response.data);
  } catch (error) {
    console.error('Error fetching flights:', error);
  } finally {
    setLoading(false);
  }
};


const handleEdit = async (id) => {
  localStorage.setItem('idflight', id);
   navigate(`/editflight`);
}
  useEffect(() => {
   
    getAllFlights();
  }, []);

  if (loading) return <p className="text-center text-violet-700 text-xl">Loading Flights...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-violet-900 mb-6">List of flights</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700" onClick={() => navigate('/addflight')}>+</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {flights.map((flight, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-semibold text-violet-800">{flight.flightNumber}</h2>
            <p className="text-gray-700"><strong>Type:</strong> {flight.flightType}</p>
            <p className="text-gray-700"><strong>Services:</strong> {flight.onboardServices}</p>

            <p className="text-gray-700"><strong>Fom:</strong> {flight.from}</p>
            <p className="text-gray-700"><strong>To:</strong> {flight.to}</p>
            <p className="text-gray-700"><strong>returnAirport:</strong> {flight.returnAirport}</p>
            <p className="text-gray-700"><strong>Departure Airport:</strong> {flight.departureAirport}</p>
            <p className="text-gray-700"><strong>Airline:</strong> {flight.airline}</p>
            <p className="text-gray-700"><strong>Duration:</strong> {flight.duration}</p>
            <p className="text-gray-700"><strong>Departure Date:</strong> {new Date(flight.departureDate).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Return Date:</strong> {new Date(flight.returnDate).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Departure Time:</strong> {flight.departureTime}</p>
            <p className="text-gray-700"><strong>Return Time:</strong> {flight.returnTime}</p>

            <p className="text-gray-700"><strong>Cabin Allowance:</strong> {flight.cabinAllowance}</p>
            <p className="text-gray-700"><strong>Refundable:</strong> {flight.refundable ? 'Yes' : 'No'}</p>
            <p className="text-gray-700"><strong>Class:</strong> {flight.classes.map((c,index)=><span key={index}>{c.name}/${c.price}/{c.availableSeats}</span>)}</p>
            <p className="text-gray-700"><strong>Included Baggage:</strong> {flight.Includedbaggage.included ? `${flight.Includedbaggage.weight} kg` : 'No'}</p>
           

           <button className='delete' onClick={()=>handleDelete(flight._id)}> <FaTrash /></button>
                       <button className='update' onClick={()=>handleEdit(flight._id)}> <MdEditDocument /></button>
           
          </div>
        ))}
       
      </div>
    </div>
  );
}
