import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import styles from './Navbar.module.css'; // Importing the styles for the navbar
import AppSection from '../../pages/AppSection.jsx';
import PathSection from '../../pages/PathSection.jsx';

const Navbar = () => {
  const [activeComponent, setActiveComponent] = useState('AppList');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="text-indigo-900 border-b-2 border-indigo-800">
        <div className="container px-4 py-2 flex gap-4 items-center">
          <button
            onClick={() => setActiveComponent('AppList')}
            className={`text-xl font-semibold hover:text-indigo-800 transition duration-300 ${
              activeComponent === 'AppList'
                ? 'text-indigo-800'
                : 'text-gray-500'
            }`}
          >
            App List
          </button>
          <button
            onClick={() => setActiveComponent('PathList')}
            className={`text-xl font-semibold hover:text-indigo-800 transition duration-300 ${
              activeComponent === 'PathList'
                ? 'text-indigo-800'
                : 'text-gray-500'
            }`}
          >
            Path List
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {activeComponent === 'AppList' && <AppSection />}
        {activeComponent === 'PathList' && <PathSection />}
      </div>
    </div>
  );
};

export default Navbar;
