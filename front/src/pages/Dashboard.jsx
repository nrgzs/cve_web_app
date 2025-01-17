import React from 'react';
import Navbar from '../components/navbar/navbar.jsx';
import CveSection from './CveSection';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-indigo-800 shadow-md px-5 text-slate-100 pt-4 pb-3 border-b-2 border-slate-200">
        <h1 className="text-4xl font-bold">CVE Dashboard</h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Navbar Section */}
        <div className="md:w-1/2 w-full bg-gray-100 p-4 shadow-md">
          <Navbar />
        </div>

        {/* CVE Section */}
        <div className="md:w-1/2 w-full  bg-gray-100 p-4 shadow-md">
          <CveSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
