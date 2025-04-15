// Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Navbar = () => {
  return (
    <nav className="bg-[#1e293b] text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-[#334155]">
      <div className="text-2xl font-bold">
        <Link to="/home" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
          <span className="text-indigo-400">📝</span>
          <span>NotesApp</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <LogoutButton />
      </div>
    </nav>
  )
}

export default Navbar