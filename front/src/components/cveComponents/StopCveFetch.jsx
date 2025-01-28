import React, { useState } from "react";
import Button from "../../utils/button.jsx";
import { useStopInitializeFetchServiceMutation } from "../../api/cveApi.js";
import { useGetStatusQuery } from "../../api/statusApi.js";

const StopCveFetch = () => {
  const [stopInitializeFetch] = useStopInitializeFetchServiceMutation();
  const { refetch, isLoading, isError } = useGetStatusQuery(null, {
    // Ensures refetching behavior
    cacheTime: 0, // Disable caching for the status data
    staleTime: 0, // Always consider data as stale and refetch
    refetchOnMount: true, // Ensures the status is refetched when component mounts
  });

  const handleFetch = async () => {
    try {
      const response = await stopInitializeFetch().unwrap(); // Get response data
refetch()   
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
