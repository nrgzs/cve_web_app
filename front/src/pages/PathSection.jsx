import React, { useState } from 'react';
import PathList from '../components/pathComponents/PathList.jsx';
import PathForm from '../components/pathComponents/PathForm.jsx';
import Button from '../utils/button.jsx';

const PathSection = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle between form and list

  const toggleView = () => {
    setShowForm((prev) => !prev); // Toggle between true and false
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Toggle Button */}
      <Button
        onClick={toggleView}
        label={showForm ? "View Path List" : "Add New Path"}
        bgcolor={showForm ? "blue" : "green"}
      />

      {/* Path Form and Path List */}
      <div className="w-full max-w-3xl mx-auto">
        {/* PathForm Section */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            showForm ? "opacity-100 translate-y-0 h-auto" : "opacity-0 -translate-y-10 h-0 overflow-hidden"
          }`}
        >
          {showForm && <PathForm />}
        </div>

        {/* PathList Section */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            !showForm ? "opacity-100 translate-y-0 h-auto" : "opacity-0 -translate-y-10 h-0 overflow-hidden"
          }`}
        >
          {!showForm && <PathList />}
        </div>
      </div>
    </div>
  );
};
export default PathSection;
