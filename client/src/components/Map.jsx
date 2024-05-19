import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const center = {
  lat: 37.7749, // Default center (San Francisco)
  lng: -122.4194,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ isSidebarExpanded }) => {
  const [initiatives, setInitiatives] = useState([]);
  const [filter, setFilter] = useState({ category: '', location: '' });
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const fetchInitiatives = async () => {
      const q = query(collection(db, 'initiatives'), where('category', '==', filter.category));
      const querySnapshot = await getDocs(q);
      let initiatives = [];
      querySnapshot.forEach((doc) => {
        initiatives.push({ ...doc.data(), id: doc.id });
      });
      setInitiatives(initiatives);
    };
    fetchInitiatives();
  }, [filter]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDwhqt_JqFBZgRd3y03j1eq1xYq3y0npUc", // Use your environment variable here
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const google = window.google;
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: 10,
        options: options,
      });

      const input = document.getElementById('locationSearch');
      const searchBox = new google.maps.places.SearchBox(input);

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        mapInstance.current.panTo({ lat, lng });
        mapInstance.current.setZoom(14);
      });
    });
  }, []);

  const handleCategoryChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFilter({ ...filter, location: e.target.value });
  };

  return (
    <div className="flex flex-col h-screen ml-20 lg:ml-64">
      <div className="mb-4 p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Environmental Initiatives</h1>
        <div className="mb-4 flex space-x-4">
          <select
            value={filter.category}
            onChange={handleCategoryChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            <option value="clean-up">Clean-up</option>
            <option value="planting">Planting</option>
            <option value="education">Education</option>
          </select>
          <input
            id="locationSearch"
            type="text"
            value={filter.location}
            onChange={handleLocationChange}
            placeholder="Location"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="flex-grow relative">
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} className="absolute inset-0"></div>
        {initiatives.map(({ id, lat, lng, title }) => (
          <Marker key={id} position={{ lat, lng }} title={title} />
        ))}
      </div>
    </div>
  );
};

export default Map;
