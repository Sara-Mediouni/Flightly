import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-transparent shadow px-6 py-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-violet-900">Admin Panel</h2>
      <div className="space-x-4">
        <button className="bg-gray-100 px-4 py-2 rounded">Settings</button>
        <button className="bg-violet-900 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  </nav>
  )
}

export default Navbar