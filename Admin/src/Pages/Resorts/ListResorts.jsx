import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { MdEditDocument } from "react-icons/md";

export default function ListResorts() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token=localStorage.getItem("admin")
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/acc/admin/${id}`
        ,{
         headers:{
          'Authorization':`Bearer ${token}`
         }}
      );
      setResorts(resorts.filter((hotel) => hotel._id !== id));
      fetchResorts(); 
    } catch (error) {
      console.error('Error deleting resort:', error);
    }
  };
  const navigate = useNavigate();
  const handleEdit = async (id) => {
    localStorage.setItem('id', id);
     navigate(`/edit`);
  }
     const fetchResorts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/acc/acc/?type=Resort');
        setResorts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      } finally {
        setLoading(false);
      }
    }
  
  useEffect(() => {
   
    fetchResorts();
    console.log(resorts);
  }, []);

  if (loading) return <p className="text-center text-violet-700 text-xl">Loading resorts...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-violet-900 mb-6">List of Resorts</h1>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-violet-800">Resorts</h2>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700" onClick={() => navigate('/add')}>+</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resorts.map((resort, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-semibold text-violet-800">{resort.name}</h2>
            <p className="text-gray-700"><strong>Country:</strong> {resort.country}</p>
            <p className="text-gray-700"><strong>Address:</strong> {resort.address}</p>
            <p className="text-gray-700"><strong>checkInTime:</strong> {resort.checkInTime}</p>
            <p className="text-gray-700"><strong>checkOutTime:</strong> {resort.checkOutTime}</p>
            <p className="text-gray-700"><strong>Email:</strong> {resort.Email}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {resort.Phone}</p>
            <p className="text-gray-700"><strong>ReservationPhone:</strong> {resort.ReservationPhone}</p>
            <p className="text-gray-700"><strong>minAgeToCheckIn:</strong> {resort.minAgeToCheckIn}</p>
            <p className="text-gray-700"><strong>description:</strong> {resort.description}</p>
            <p className="text-gray-700"><strong>activities:</strong> {resort.activities.join(",")}</p>
            <p className="text-gray-700"><strong>languagesSpoken:</strong> {resort.languagesSpoken.join(',')}</p>
            <div className="text-violet-800"><strong>Rooms:</strong>
            {resort.roomTypes.map((room,index)=>(
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
              {resort.offers && (
                <>
                  <p className="text-gray-700"><strong>Title:</strong> {resort.offers.title}</p>
                  <p className="text-gray-700"><strong>Description:</strong> {resort.offers.description}</p>
                  <p className="text-gray-700"><strong>Discount:</strong> {resort.offers.discountPercentage}</p>
                </>
              )}
            </div>
            <div className="flex justify-between mt-4"> 
             <button className='delete' onClick={()=>handleDelete(resort._id)}> <FaTrash /></button>
             <button className='update' onClick={()=>handleEdit(resort._id)}> <MdEditDocument /></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
