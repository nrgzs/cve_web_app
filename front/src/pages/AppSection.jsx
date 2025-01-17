import React, { useState } from "react";
import AppForm from "../components/appComponents/AppForm.jsx";
import AppList from "../components/appComponents/AppList.jsx";
import Button from "../utils/button.jsx";

const AppSection = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle between form and list

  const toggleView = () => {
    setShowForm((prev) => !prev); // Toggle between true and false
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Toggle Button */}
      <Button
        onClick={toggleView}
        label={showForm ? "View App List" : "Add New App"}
        bgcolor={"blue"}
      />

      {/* App Form and App List */}
      <div className="w-full max-w-3xl mx-auto">
        {/* AppForm Section */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            showForm
              ? "opacity-100 translate-y-0 h-auto"
              : "opacity-0 -translate-y-10 h-0 overflow-hidden"
          }`}
        >
          {showForm && <AppForm />}
        </div>

        {/* AppList Section */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            !showForm
              ? "opacity-100 translate-y-0 h-auto"
              : "opacity-0 -translate-y-10 h-0 overflow-hidden"
          }`}
        >
          {!showForm && <AppList />}
        </div>
      </div>
    </div>
  );
};
export default AppSection;
