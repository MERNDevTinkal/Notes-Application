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
    
    <BrowserRouter>
    <UserDetailsProvider> 
        <ToastContainer />
        <Toaster position="top-right" />
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </UserDetailsProvider>
    </BrowserRouter>


  )
}

export default App
