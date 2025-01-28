import React, { useState } from "react";
import { useInitializeFetchMutation } from "../../api/cveApi.js";
import Button from "../../utils/button.jsx";
import { useGetStatusQuery } from "../../api/statusApi.js";

const StartCveFetch = () => {
  const [initializeFetch] = useInitializeFetchMutation();
  const { refetch, isLoading, isError } = useGetStatusQuery(null, {
    // Ensures refetching behavior
    cacheTime: 0, // Disable caching for the status data
    staleTime: 0, // Always consider data as stale and refetch
    refetchOnMount: true, // Ensures the status is refetched when component mounts
  });

  const handleFetch = async () => {
    try {
      const response = await initializeFetch().unwrap(); // Get response data
     refetch()// Refetch status data after successful fetch start
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
