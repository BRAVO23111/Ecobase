import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../store/authState';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaPlus, FaLeaf, FaUsers, FaBook, FaUser, FaComments, FaMap, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ onToggle }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null });
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('token');
    navigate('/login');
    setIsExpanded(false);
    onToggle(false);
  };

  const token = window.localStorage.getItem('token');

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    onToggle(!isExpanded);
  };

  const handleLinkClick = () => {
    setIsExpanded(false);
    onToggle(false);
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/create', label: 'Create Initiative', icon: <FaPlus /> },
    { path: '/eco-action', label: 'Log Eco Action', icon: <FaLeaf /> },
    { path: '/initiativesjoined', label: 'Joined Initiatives', icon: <FaUsers /> },
    { path: '/resources', label: 'Resources', icon: <FaBook /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
    { path: '/community', label: 'Community Chat', icon: <FaComments /> },
    { path: '/map', label: 'Maps', icon: <FaMap /> }
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-0 left-0 z-50 lg:hidden bg-green-900 text-white p-4 rounded-2xl m-2"
      >
        {isExpanded ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`fixed top-0 left-0 h-screen z-40 transform ${isExpanded ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out bg-green-700 lg:bg-opacity-100 bg-opacity-100 text-white shadow-lg`}>
        <div className="flex flex-col p-4">
          <div className="flex flex-col space-y-6">
            <div className="text-xl font-bold mb-6 text-center">
              <Link to='/' onClick={handleLinkClick} className="hover:text-gray-200 transition duration-300 ease-in-out">EcoBase</Link>
            </div>
            {token ? (
              <>
                {menuItems.map((item, index) => (
                  <Link key={index} to={item.path} onClick={handleLinkClick} className="flex items-center border border-transparent py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300 ease-in-out">
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                <button onClick={handleLogout} className="flex items-center border border-transparent py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300 ease-in-out mt-auto">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={handleLinkClick} className="flex items-center border border-transparent py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300 ease-in-out">
                <FaSignInAlt className="mr-2" /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
