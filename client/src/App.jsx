// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CreateInitiative from './components/CreateInitiative';
import Dashboard from './components/Dashboard';
import EcoActionForm from './components/EcoActionForm';
import JoinedInitiatives from './components/JoinedIntiatives';
import Resource from './components/Resource';
import Profile from './components/Profile';
import Chat from './components/Community-Chat';
import Map from './components/Map';
import Sidebar from './components/Navbar';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Sidebar/>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<CreateInitiative/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/eco-action" element={<EcoActionForm/>}/>
            <Route path="/intiativesjoined" element={<JoinedInitiatives/>}/>
            <Route path="/resources" element={<Resource/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/community" element={<Chat/>}/>
            <Route path='/map' element={<Map/>}/>
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
