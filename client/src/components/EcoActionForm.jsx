import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EcoActionForm = () => {
  const [actionType, setActionType] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/ecoAction',
        {
          actionType,
          description,
          time: parseFloat(time),
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        }
      );
      alert('Action logged successfully');
      setActionType('');
      setDescription('');
      setTime('');
      setDate('');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging action:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Log Eco Action</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="actionType">Action Type</label>
          <input
            type="text"
            name="actionType"
            id="actionType"
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="time">Time (in minutes)</label>
          <input
            type="number"
            name="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200">
            Log Action
          </button>
        </div>
      </form>
    </div>
  );
};

export default EcoActionForm;
