import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateInitiativeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecobase-1.onrender.com/initiative', formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      });
      alert('Initiative created successfully');
      setFormData({
        name: '',
        description: '',
        date: '',
        location: ''
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating initiative:', error);
      alert('Failed to create initiative');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg mt-6 md:mt-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Create Initiative</h2>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 md:p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 md:p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 md:p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 md:p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-green-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-green-600 transition duration-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInitiativeForm;
