// Home.jsx
import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { toast } from 'react-hot-toast'
import Navbar from '../components/Navbar'

const Home = () => {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editId, setEditId] = useState(null)

  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get('/note')
      setNotes(res.data.notes)
    } catch (error) {
      toast.error('Failed to fetch notes')
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      return toast.error('Fields cannot be empty or spaces only')
    }

    try {
      if (editId) {
        const res = await axiosInstance.put(`/note/${editId}`, { title, description })
        toast.success(res.data.message || 'Note updated')
      } else {
        const res = await axiosInstance.post('/note', { title, description })
        toast.success(res.data.message || 'Note created')
      }

      setTitle('')
      setDescription('')
      setEditId(null)
      fetchNotes()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/note/${id}`)
      toast.success('Note deleted')
      
      fetchNotes()
      
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

  const handleEdit = (note) => {
    setEditId(note._id)
    setTitle(note.title)
    setDescription(note.description)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 text-indigo-400 flex items-center justify-center gap-3">
            <span>📝</span>
            <span>My Notes</span>
          </h1>
          <p className="text-gray-400">Create and manage your personal notes</p>
        </div>

        {/* Note Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155] mb-10"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] text-white border border-[#334155] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg bg-[#0f172a] text-white border border-[#334155] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full mt-4 py-3 rounded-lg font-medium transition-all ${
              editId 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {editId ? 'Save Changes' : 'Add New Note'}
          </button>
        </form>

        {/* Notes List */}
        {notes.length === 0 ? (
          <div className="text-center py-10 bg-[#1e293b] rounded-xl border border-[#334155]">
            <p className="text-gray-400 text-lg">No notes yet. Start by adding one!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li
                key={note._id}
                className="bg-[#1e293b] border border-[#334155] p-5 rounded-lg hover:border-indigo-500 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-indigo-300 mb-1">{note.title}</h3>
                    <p className="text-gray-300">{note.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home