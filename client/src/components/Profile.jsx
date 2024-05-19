import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [environmentalInterests, setEnvironmentalInterests] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        const profileData = response.data;
        setProfile(profileData);
        setFirstName(profileData.firstName);
        setLastName(profileData.lastName);
        setBio(profileData.bio);
        setEnvironmentalInterests(profileData.environmentalInterests.join(", "));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setBio(profile.bio);
      setEnvironmentalInterests(profile.environmentalInterests.join(", "));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/profile",
        {
          firstName,
          lastName,
          bio,
          environmentalInterests: environmentalInterests.split(",").map((interest) => interest.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(response.data.profile);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-3xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-2 text-lg font-medium">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2 text-lg font-medium">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block mb-2 text-lg font-medium">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="environmentalInterests" className="block mb-2 text-lg font-medium">Environmental Interests</label>
            <input
              type="text"
              id="environmentalInterests"
              value={environmentalInterests}
              onChange={(e) => setEnvironmentalInterests(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <small className="text-gray-600">Separate interests with commas</small>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              Save
            </button>
            <button type="button" onClick={handleCancelClick} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium">First Name:</label>
            <p className="mt-1 text-gray-700">{profile.firstName}</p>
          </div>
          <div>
            <label className="block text-lg font-medium">Last Name:</label>
            <p className="mt-1 text-gray-700">{profile.lastName}</p>
          </div>
          <div>
            <label className="block text-lg font-medium">Bio:</label>
            <p className="mt-1 text-gray-700">{profile.bio}</p>
          </div>
          <div>
            <label className="block text-lg font-medium">Environmental Interests:</label>
            <p className="mt-1 text-gray-700">{profile.environmentalInterests.join(", ")}</p>
          </div>
          <div className="text-center">
            <button onClick={handleEditClick} className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200">
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
