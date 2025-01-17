import React, { useState } from "react";
import Button from "../../utils/button.jsx";
import { useStopInitializeFetchServiceMutation } from "../../api/cveApi.js";

const StopCveFetch = ({setFetchStatus}) => {
  const [stopInitializeFetch] = useStopInitializeFetchServiceMutation();

  const handleFetch = async () => {
    try {
      const response = await stopInitializeFetch().unwrap(); // Get response data
      setFetchStatus(response.fetchStatus); // Update parent fetchStatus state
    } catch (err) {
      console.error("Error stopping fetch service:", err);
    }
  };

  return (
    <div>
      <Button onClick={handleFetch} label={"Stop CVE Service"} bgcolor="red" />
    </div>
  );
};

export default StopCveFetch;
