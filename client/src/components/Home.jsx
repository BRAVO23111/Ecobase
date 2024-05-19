import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [editedInitiative, setEditedInitiative] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [username, setUsername] = useState('');
  const [joinedInitiatives, setJoinedInitiatives] = useState(new Set());
  const token = window.localStorage.getItem('token');

  const fetchAllInitiatives = async () => {
    try {
      const response = await axios.get('https://ecobase-1.onrender.com/initiative', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInitiatives(response.data);
    } catch (error) {
      console.error('Error fetching initiatives:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://ecobase-1.onrender.com/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(response.data.firstName);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchAllInitiatives();
    fetchProfile();
  }, []);

  const joinInitiative = async (initiativeId) => {
    try {
      const response = await axios.post(
        `https://ecobase-1.onrender.com/initiative/${initiativeId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJoinedInitiatives((prevSet) => new Set(prevSet).add(initiativeId));
      alert(`Joined as ${username}`);
    } catch (error) {
      console.error('Error joining initiative:', error);
      console.log(`Request to join initiative ${initiativeId} failed with status code:`, error.response.status);
      console.log('Error message:', error.response.data.message);
    }
  };

  const deleteInitiative = async (initiativeId) => {
    try {
      await axios.delete(`https://ecobase-1.onrender.com/initiative/${initiativeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllInitiatives();
    } catch (error) {
      console.error('Error deleting initiative:', error);
    }
  };

  const editInitiative = (initiative) => {
    setEditedInitiative(initiative);
    setEditedName(initiative.name);
    setEditedDescription(initiative.description);
    setEditedDate(initiative.date.split('T')[0]);
    setEditedLocation(initiative.location);
  };

  const saveEditedInitiative = async () => {
    try {
      await axios.put(
        `https://ecobase-1.onrender.com/initiative/${editedInitiative._id}`,
        {
          name: editedName,
          description: editedDescription,
          date: editedDate,
          location: editedLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditedInitiative(null);
      fetchAllInitiatives();
    } catch (error) {
      console.error('Error updating initiative:', error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Initiatives</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left text-gray-600">Name</th>
              <th className="py-3 px-6 text-left text-gray-600">Description</th>
              <th className="py-3 px-6 text-left text-gray-600">Location</th>
              <th className="py-3 px-6 text-left text-gray-600">Date</th>
              <th className="py-3 px-6 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initiatives.map((initiative, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{initiative.name}</td>
                <td className="py-3 px-6">{initiative.description}</td>
                <td className="py-3 px-6">{initiative.location}</td>
                <td className="py-3 px-6">
                  {new Date(initiative.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    className={`${
                      joinedInitiatives.has(initiative._id) ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white font-bold py-1 px-3 rounded-lg`}
                    onClick={() => joinInitiative(initiative._id)}
                    disabled={joinedInitiatives.has(initiative._id)}
                  >
                    {joinedInitiatives.has(initiative._id) ? 'Joined' : 'Join'}
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg"
                    onClick={() => deleteInitiative(initiative._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg"
                    onClick={() => editInitiative(initiative)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editedInitiative && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Edit Initiative</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedName">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="editedName"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedDescription">
              Description:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="editedDescription"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedDate">
              Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="editedDate"
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedLocation">
              Location:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="editedLocation"
              type="text"
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
            onClick={saveEditedInitiative}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
