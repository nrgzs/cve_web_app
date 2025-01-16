import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
