import React from "react";

const StatusComponent = ({ fetchStatus }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        fetchStatus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {fetchStatus ? "CVE Fetch Service is Running" : "CVE Fetch Service is Stopped"}
    </div>
  );
};

export default StatusComponent;
