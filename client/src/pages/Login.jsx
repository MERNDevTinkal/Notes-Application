// Login.jsx
import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post('/user/login', { email, password })
      toast.success(res.data.message)
      navigate('/home')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4">
      <form onSubmit={handleLogin} className="bg-[#1e293b] text-white rounded-lg shadow-xl p-8 w-full max-w-md border border-[#334155] animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center mb-8">Welcome Back</h2>
        
        <div className="space-y-6">
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
          Sign In
        </button>

        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login