// Register.jsx
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../axiosInstance'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post('/user', { fullName, email, password })
      toast.success(res.data.message)
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4">
      <form 
        onSubmit={handleRegister} 
        className="bg-[#1e293b] text-white rounded-lg shadow-xl p-8 w-full max-w-md border border-[#334155] animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8">Create Account</h2>

        <div className="space-y-6">
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            placeholder="Full Name" 
            className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
            required 
          />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full mt-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-transform duration-300 hover:scale-[1.03]"
        >
          Create Account
        </button>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register