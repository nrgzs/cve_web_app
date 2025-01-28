import React from "react";
import { useGetStatusQuery } from "../../api/statusApi.js";
import Loader from "../Loader/loader.jsx";

const StatusComponent = () => {
const { data, isLoading, isError } = useGetStatusQuery(null, {
  // Ensures refetching behavior
  cacheTime: 0, // Disable caching for the status data
  staleTime: 0, // Always consider data as stale and refetch
  refetchOnMount: true, // Ensures the status is refetched when component mounts
});


if (isLoading) return <Loader/>;
if (isError) return <p>Error fetching Status</p>;



  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        data?.fetchStatus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {data?.fetchStatus ? "CVE Fetch Service is Running" : "CVE Fetch Service is Stopped"}
    </div>
  );
};

export default StatusComponent;
