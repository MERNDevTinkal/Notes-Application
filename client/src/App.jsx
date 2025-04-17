import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Verify from './pages/Verify'
import { UserDetailsProvider } from './context/userDetail'

function App() {

  return (
    
    <UserDetailsProvider> 
      <BrowserRouter>
        <ToastContainer />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserDetailsProvider>
  )
}

export default App
