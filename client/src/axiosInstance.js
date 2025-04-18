import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://notes-application-2-vv1k.onrender.com/api/v1',
  withCredentials: true, //  Send cookies in requests
})

export default axiosInstance
