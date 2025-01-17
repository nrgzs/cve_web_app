import React, { useState } from "react";
import CveItem from "./CveItem";
import { useGetAllCvesFromLocalQuery } from "../../api/cveApi";
import Loader from "../Loader/loader";
import { data } from "react-router-dom";
import FilterComponent from "./FilterComponent";

const CveList = () => {
  const { data: cveDataList, isLoading, error } = useGetAllCvesFromLocalQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching apps.</p>;

  const [filteredData, setFilteredData] = useState(cveDataList||[]);

  const handleFilteredData = (data) => {
    setFilteredData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <FilterComponent
        cveDataList={cveDataList}
        onFilteredData={handleFilteredData}
      />
      <CveList cveDataList={filteredData} />
    </div>
  );
};

export default CveList;
