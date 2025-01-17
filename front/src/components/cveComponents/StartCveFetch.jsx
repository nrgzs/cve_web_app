import React, { useState } from "react";
import { useInitializeFetchMutation } from "../../api/cveApi.js";
import Button from "../../utils/button.jsx";

const StartCveFetch = ({setFetchStatus}) => {
  const [initializeFetch] = useInitializeFetchMutation();

  const handleFetch = async () => {
    try {
      const response = await initializeFetch().unwrap(); // Get response data
      setFetchStatus(response.fetchStatus); // Update parent fetchStatus state
    } catch (err) {
      console.error("Error starting fetch service:", err);
    }
  };

  return (
    <div>
      <Button onClick={handleFetch} label={"Start CVE Service"} bgcolor="green" />
    </div>
  );
};

export default StartCveFetch;
