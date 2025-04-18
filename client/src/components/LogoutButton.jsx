import axiosInstance from '../axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useLoader } from '../context/LoaderContext'

const LogoutButton = () => {
  const navigate = useNavigate()
  const { setLoading } = useLoader();

  const handleLogout = async () => {
    setLoading(true);

    try {
      localStorage.removeItem('token')

      await axiosInstance.post('/user/logout')

      toast.success("Logged out successfully")

      navigate('/')
    } catch (error) {
      toast.error("Logout failed")
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
    >
      Logout
    </button>
  )
}

export default LogoutButton
