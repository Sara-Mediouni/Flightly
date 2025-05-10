import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { MdEditDocument } from "react-icons/md";

export default function Reservation() {
  const [reserve, setReserve] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/reserveflight/admin/flights/${id}`);
    setReserve(reserve.filter((r) => r._id !== id));
    getAllReservations(); 
  } catch (error) {
    console.error('Error deleting :', error);
  }
};

const getAllReservations = async () => { 
  try {
    const response = await axios.get('http://localhost:4000/reserveflight/reserveflight/');
    setReserve(response.data.data);
    console.log(response.data.data)
  } catch (error) {
    console.error('Error fetching reservations:', error);
  } finally {
    setLoading(false);
  }
};


const handleEdit = async (id) => {
  localStorage.setItem('idflight', id);
   navigate(`/editflight`);
}
  useEffect(() => {
   
    getAllReservations();
  }, []);

  if (loading) return <p className="text-center text-violet-700 text-xl">Loading Flights...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-violet-900 mb-6">List of Flights Reservations</h1>
   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {reserve?.map((r, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-semibold text-violet-800">{r.flightNumber}</h2>
            <p className="text-gray-700"><strong>Class:</strong> {r.flightClass}</p>
            <p className="text-gray-700"><strong>Status:</strong> {r.paymentStatus}</p>
            <p className="text-gray-700"><strong>LastName:</strong> {r.user.firstname}</p>
            <p className="text-gray-700"><strong>FirstName:</strong> {r.user.lastname}</p>

            <p className="text-gray-700"><strong>From:</strong> {r.flight.from}</p>
            <p className="text-gray-700"><strong>To:</strong> {r.flight.to}</p>
            <p className="text-gray-700"><strong>returnAirport:</strong> {r.flight.returnAirport}</p>
            <p className="text-gray-700"><strong>Departure Airport:</strong> {r.flight.departureAirport}</p>
            <p className="text-gray-700"><strong>Airline:</strong> {r.flight.airline}</p>
            <p className="text-gray-700"><strong>Duration:</strong> {r.flight.duration}</p>
            <p className="text-gray-700"><strong>Departure Date:</strong> {new Date(r.flight.departureDate).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Return Date:</strong> {new Date(r.flight.returnDate).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Departure Time:</strong> {r.flight.departureTime}</p>
            <p className="text-gray-700"><strong>Return Time:</strong> {r.flight.returnTime}</p>
            <p className="text-gray-700"><strong>Transit:</strong> {r.flight.transit}</p>
            <p className="text-gray-700"><strong>Cabin Allowance:</strong> {r.flight.cabinAllowance}</p>
            <p className="text-gray-700"><strong>Refundable:</strong> {r.flight.refundable ? 'Yes' : 'No'}</p>
           

           <button className='delete' onClick={()=>handleDelete(r._id)}> <FaTrash /></button>
                       <button className='update' onClick={()=>handleEdit(r._id)}> <MdEditDocument /></button>
           
          </div>
        ))}
       
      </div>
    </div>
  );
}
