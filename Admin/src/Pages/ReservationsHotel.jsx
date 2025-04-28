import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { MdEditDocument } from "react-icons/md";

export default function ReservationAcc() {
  const [reserve, setReserve] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/api/r/flights/${id}`);
    setReserve(reserve.filter((r) => r._id !== id));
    getAllAcc(); // Refresh the r list after deletion
  } catch (error) {
    console.error('Error deleting r:', error);
  }
};

const getAllAcc = async () => { 
  try {
    const response = await axios.get('http://localhost:4000/api/reserveracc/');
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
   
    getAllAcc();
  }, []);

  if (loading) return <p className="text-center text-violet-700 text-xl">Loading Flights...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-violet-900 mb-6">List of Flights Reservations</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {reserve?.map((r, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-semibold text-violet-800">{r.accommodation.name}</h2>
            <p className="text-gray-700"><strong>Status:</strong> {r.paymentStatus}</p>
            <p className="text-gray-700"><strong>LastName:</strong> {r.user.firstname}</p>
            <p className="text-gray-700"><strong>FirstName:</strong> {r.user.lastname}</p>
            <p className="text-gray-700"><strong>Check-in:</strong> {r.checkInDate}</p>
            <p className="text-gray-700"><strong>Check-out:</strong> {r.checkOutDate}</p>
            <p className="text-gray-700"><strong>Type:</strong> {r.accommodation.type}</p>

            <p className="text-gray-700"><strong>Country:</strong> {r.accommodation.country}</p>
            <p className="text-gray-700"><strong>City:</strong> {r.accommodation.city}</p>
            <p className="text-gray-700"><strong>Address:</strong> {r.accommodation.address}</p>
            <div className="text-gray-700"><strong>Rooms:</strong>
             {r.RoomsSelection.map((i)=>{return(
              <><span className='px-2'>name:{i.name}</span>
              <span>number:{i.number}</span></>)
            })}
            </div>
            <p className="text-gray-700"><strong>Created At:</strong> {r.createdAt}</p>
            <p className="text-gray-700"><strong>Total Price:</strong> {r.TotalPrice}$</p>


           <button className='delete' onClick={()=>handleDelete(r._id)}> <FaTrash /></button>
                       <button className='update' onClick={()=>handleEdit(r._id)}> <MdEditDocument /></button>
           
          </div>
        ))}
       
      </div>
    </div>
  );
}
