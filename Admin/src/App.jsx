import React, { useState } from 'react'

import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import ListResorts from './Pages/Resorts/ListResorts';
import Reservations from './Pages/Reservations';
import ListHotels from './Pages/Hotels/ListHotels';
import { Route, Router, Routes } from 'react-router-dom';

import AddFlight from './Pages/Flights/AddFlight';
import ListFlight from './Pages/Flights/ListFlights';
import Add from './Pages/Resorts/AddAcc';
import EditAcc from './Pages/Resorts/EditAcc';
import EditFlight from './Pages/Flights/EditFlight';
import ReservationAcc from './Pages/ReservationsHotel';


const App = () => {
  return (
 
    <div className="flex h-screen overflow-hidden bg-violet-300">
      <Sidebar  />
      <div className="flex-1 flex flex-col">
        <Navbar/>
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Routes>
            
            <Route path="/flights" element={<ListFlight />} />
            <Route path="/resorts" element={<ListResorts />} />
            <Route path="/reservations" element={<Reservations/>} />
            <Route path="/reservationsAcc" element={<ReservationAcc/>} />
            <Route path="/hotels" element={<ListHotels />} />
            <Route path="/edit" element={<EditAcc />} />
            <Route path="/addflight" element={<AddFlight />} />
            <Route path="/add" element={<Add />} />
            <Route path="/editflight" element={<EditFlight />} />
          </Routes>
        </main>
      </div>
    </div>

  )
}

export default App