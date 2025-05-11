

import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import ListResorts from './Pages/Resorts/ListResorts';
import Reservations from './Pages/Reservations';
import ListHotels from './Pages/Hotels/ListHotels';
import { Route, Router, Routes, useLocation } from 'react-router-dom';

import AddFlight from './Pages/Flights/AddFlight';
import ListFlight from './Pages/Flights/ListFlights';
import Add from './Pages/Resorts/AddAcc';
import EditAcc from './Pages/Resorts/EditAcc';
import EditFlight from './Pages/Flights/EditFlight';
import ReservationAcc from './Pages/ReservationsHotel';
import ProtectedRoute from './Components/ProtectedRoutes';
import Login from './Components/Login';
import LoginRoute from './Components/LoginRoute'

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  return (
 
    <div className="flex h-screen overflow-hidden bg-violet-300">
           {!isLoginPage && <Sidebar />}
      <div className="flex-1 flex flex-col">
      {!isLoginPage && <Navbar />}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Routes>
          
            <Route path="/" element={<LoginRoute><Login/></LoginRoute>}/>
            <Route path="/flights" element={<ProtectedRoute><ListFlight /></ProtectedRoute>} />
            <Route path="/resorts" element={<ProtectedRoute><ListResorts /></ProtectedRoute>} />
            <Route path="/reservations" element={<ProtectedRoute><Reservations/></ProtectedRoute>} />
            <Route path="/reservationsAcc" element={<ProtectedRoute><ReservationAcc/></ProtectedRoute>} />
            <Route path="/hotels" element={<ProtectedRoute><ListHotels /></ProtectedRoute>} />
            <Route path="/edit" element={<ProtectedRoute><EditAcc /></ProtectedRoute>} />
            <Route path="/addflight" element={<ProtectedRoute><AddFlight /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute><Add /></ProtectedRoute>} />
            <Route path="/editflight" element={<ProtectedRoute><EditFlight /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>

  )
}

export default App