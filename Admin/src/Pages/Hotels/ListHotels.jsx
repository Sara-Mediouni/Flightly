import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { MdEditDocument } from "react-icons/md";

export default function ListHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);


const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/api/accommodation/${id}`);
    setHotels(hotels.filter((hotel) => hotel._id !== id));
    fetchhotels(); // Refresh the hotel list after deletion
  } catch (error) {
    console.error('Error deleting hotel:', error);
  }
};
const navigate = useNavigate();
const handleEdit = async (id) => {
  localStorage.setItem('id', id);
   navigate(`/edit`);
}
const fetchhotels = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/accommodation/?type=Hotel');
    setHotels(response.data);
  } catch (error) {
    console.error('Error fetching hotels:', error);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    
    fetchhotels();
  }, []);

  if (loading) return <p className="text-center text-violet-700 text-xl">Loading hotels...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-violet-900 mb-6">List of Hotels</h1>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-violet-800">Hotels</h2>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700" onClick={() => navigate('/add')}>+</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-semibold text-violet-800">{hotel.name}</h2>
            <p className="text-gray-700"><strong>Country:</strong> {hotel.country}</p>
            <p className="text-gray-700"><strong>Address:</strong> {hotel.address}</p>
            <p className="text-gray-700"><strong>Description:</strong> {hotel.description}</p>
            <p className="text-gray-700"><strong>Stars:</strong> {hotel.stars}</p>
            <p className="text-gray-700"><strong>checkInTime:</strong> {hotel.checkInTime}</p>
            <p className="text-gray-700"><strong>checkOutTime:</strong> {hotel.checkOutTime}</p>
            <p className="text-gray-700"><strong>Email:</strong> {hotel.Email}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {hotel.Phone}</p>
            <p className="text-gray-700"><strong>ReservationPhone:</strong> {hotel.ReservationPhone}</p>
            <p className="text-gray-700"><strong>minAgeToCheckIn:</strong> {hotel.minAgeToCheckIn}</p>
            <p className="text-gray-700"><strong>activities:</strong> {hotel.activities.join(",")}</p>
            <p className="text-gray-700"><strong>languagesSpoken:</strong> {hotel.languagesSpoken.join(',')}</p>
            
            <div className="text-violet-800"><strong>Rooms:</strong>
            {hotel?.roomTypes?.map((room,index)=>(
            <div key={index}>
             <p className="text-gray-700">
             <strong>Name:</strong>{room.name}
             </p>
             <p className="text-gray-700">
             <strong>description:</strong>{room.description}
             </p>
             <p className="text-gray-700">
             <strong>price:</strong>{room.price}
             </p>
             
             <p className="text-gray-700">
             <strong>area:</strong>{room.area}
             </p>
             <p className="text-gray-700">
             <strong>capacity:</strong>{room.capacity}
             </p>
             <p className="text-gray-700">
             <strong>amenities:</strong>{room.amenities.join(',')}
             </p>
           </div>)
           
            )

            }</div>
            <div>
              <h3 className="font-bold text-violet-800">Offer:</h3>
              {hotel.offers && (
                <>
                  <p className="text-gray-700"><strong>Title:</strong> {hotel.offers.title}</p>
                  <p className="text-gray-700"><strong>Description:</strong> {hotel.offers.description}</p>
                  <p className="text-gray-700"><strong>Discount</strong> ${hotel.offers.discountPercentage}</p>
                </>
              )}
            </div>  
            <button className='delete' onClick={()=>handleDelete(hotel._id)}> <FaTrash /></button>
            <button className='update' onClick={()=>handleEdit(hotel._id)}> <MdEditDocument /></button>
          </div>
                   
          
        ))}
      </div>
    </div>
  );
}
