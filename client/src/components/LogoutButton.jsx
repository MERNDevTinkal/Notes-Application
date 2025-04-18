import { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      localStorage.removeItem('token')
      await axiosInstance.post('/user/logout')
      toast.success("Logged out successfully")
      navigate('/')
    } catch (error) {
      toast.error("Logout failed")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`text-sm px-4 py-2 rounded text-white transition-colors duration-200 ${
        isLoggingOut
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-red-600 hover:bg-red-700'
      }`}
    >
      {isLoggingOut ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <span className="ml-2">Logging out...</span>
        </div>
      ) : (
        'Logout'
      )}
    </button>
  )
}

export default LogoutButton
