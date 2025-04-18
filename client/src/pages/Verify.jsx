import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

const Verify = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state?.email || ''

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async ({ code }) => {
    setIsLoading(true)
    try {
      const res = await axiosInstance.post('/user/verifyEmail', { code })
      toast.success(res.data.message)
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0f172a] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1e293b] text-white rounded-lg shadow-xl p-8 w-full max-w-md border border-[#334155]"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>

        <p className="text-center text-gray-400 mb-6">
          We have sent an OTP to <span className="text-white font-semibold">{email}</span>
        </p>

        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            {...register('code', {
              required: 'OTP is required',
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'OTP must be exactly 6 digits'
              }
            })}
            className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
          />
          {errors.code && (
            <p className="text-red-400 text-sm mb-4">{errors.code.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white font-semibold rounded-xl transition-transform duration-300 ${
            isLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.03] cursor-pointer'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            'Verify'
          )}
        </button>
      </form>
    </div>
  )
}

export default Verify
