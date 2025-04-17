import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosInstance from '../axiosInstance'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post('/user', {
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        password: data.password
      })
      toast.success(res.data.message)
      navigate('/verify-email', { state: { email: data.email } })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1e293b] text-white rounded-lg shadow-xl p-8 w-full max-w-md border border-[#334155] animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8">Create Account</h2>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register('fullName', { required: 'Full Name is required' })}
              className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address'
                }
              })}
              className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                }
              })}
              className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-8 py-3 text-white font-semibold rounded-xl transition-transform duration-300 ${
            isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.03] cursor-pointer'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <span className="ml-2">Creating...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-300">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
