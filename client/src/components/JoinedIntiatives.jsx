import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JoinedInitiatives = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchJoinedInitiatives = async () => {
      try {
        const response = await axios.get('https://ecobase-1.onrender.com/initiative/joined', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        });
        setInitiatives(response.data);
      } catch (error) {
        console.error('Error fetching joined initiatives:', error);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchJoinedInitiatives();
    fetchProfile();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Joined Initiatives</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Welcome, {profile.firstName} {profile.lastName}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left text-gray-600">Name</th>
              <th className="py-3 px-6 text-left text-gray-600">Description</th>
              <th className="py-3 px-6 text-left text-gray-600">Location</th>
              <th className="py-3 px-6 text-left text-gray-600">Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {initiatives.length === 0 && (
        <p className="text-center mt-4 text-gray-600">No joined initiatives found.</p>
      )}
    </div>
  );
};

export default JoinedInitiatives;