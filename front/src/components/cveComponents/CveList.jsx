import React, { useState } from "react";
import CveItem from "./CveItem";
import { useGetAllCvesFromLocalQuery } from "../../api/cveApi";
import Loader from "../Loader/loader";
import { data } from "react-router-dom";
import FilterComponent from "./FilterComponent";

const CveList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [onFilter, setOnFilter] = useState(false);
  const { data: cveDataList, isLoading, error } = useGetAllCvesFromLocalQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching CVEs.</p>;

  const handleFilteredData = (data) => {
    setFilteredData(data);
    setOnFilter(true)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <FilterComponent
        cveDataList={cveDataList} // Pass the original data to filter
        onFilteredData={handleFilteredData} // Set the filtered data
      />

      <div className="mt-4">
        <div className="space-y-4">
          {!onFilter ? (
            <div className="max-w-4xl mx-auto mt-6 p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                CVE Records
              </h2>
              <div className="h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {cveDataList.map((cveData, index) => (
                  <CveItem key={index} cveData={cveData} />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {filteredData.length > 0 ? (
            filteredData.map((cve, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">{cve.cve}</h3>
                <p>
                  <strong>App Product:</strong> {cve.appProduct}
                </p>
                <p>
                  <strong>Vendor:</strong> {cve.vendor}
                </p>
                <p>
                  <strong>Version:</strong> {cve.version}
                </p>
                <p>
                  <a
                    href={cve.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    View CVE
                  </a>
                </p>
              </div>
            ))
          ) : ''}
        </div>
      </div>
    </div>
  );
};

export default CveList;
