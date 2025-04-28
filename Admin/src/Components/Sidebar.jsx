import React from 'react';
import { Home, Users, Settings, Hotel,TicketsPlane, LoaderPinwheel, NotepadText  } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64  shadow h-full ">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Flightly</h1>
        <nav className="space-y-8 text-violet-900 ">
          <a href="/" className="flex items-center p-2 text-violet-900 hover:bg-gray-100 rounded">
            <Home className="w-5 h-5 mr-2" /> Dashboard
          </a>
          <a href="/flights" className="flex items-center p-2 text-violet-900 hover:bg-gray-100 rounded">
            <TicketsPlane  className="w-5 h-5 mr-2" /> Flights
          </a>
          <a href="/hotels" className="flex items-center p-2 text-violet-900 hover:bg-gray-100 rounded">
            <Hotel className="w-5 h-5 mr-2" /> Hotels
          </a>
          <a href="/resorts" className="flex items-center p-2 text-violet-900 hover:bg-gray-100 rounded">
            <LoaderPinwheel  className="w-5 h-5 mr-2" /> Resorts
          </a>
                <a href="/reservations" className="flex items-center p-2 text-violet-900 hover:bg-gray-100 rounded">
            <NotepadText  className="w-5 h-5 mr-2" /> Reservations
          </a>
          <a href="/reservationsAcc " className="flex items-center p-2 text-violet-900 hover:bg-gray-100 rounded">
            <NotepadText  className="w-5 h-5 mr-2" /> Reservations Accommodation
          </a>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
