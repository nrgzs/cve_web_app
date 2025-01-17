import React, { useState } from "react";

const FilterComponent = ({ cveDataList, onFilteredData }) => {
  const [appProductFilter, setAppProductFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [versionFilter, setVersionFilter] = useState("");

  const handleFilterChange = () => {
    // Apply filters on the cveDataList
    const filteredData = cveDataList.filter((cveData) => {
      const matchesAppProduct = appProductFilter
        ? cveData.appProduct.toLowerCase().includes(appProductFilter.toLowerCase())
        : true;
      const matchesVendor = vendorFilter
        ? cveData.vendor.toLowerCase().includes(vendorFilter.toLowerCase())
        : true;
      const matchesVersion = versionFilter
        ? cveData.version.toLowerCase().includes(versionFilter.toLowerCase())
        : true;

      return matchesAppProduct && matchesVendor && matchesVersion;
    });

    // Pass filtered data to parent component
    onFilteredData(filteredData);
  };

  return (
    <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm">
    <div className="flex flex-col gap-3">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
        placeholder="App Product"
        value={appProductFilter}
        onChange={(e) => setAppProductFilter(e.target.value)}
      />
      <input
        type="text"
        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
        placeholder="Vendor"
        value={vendorFilter}
        onChange={(e) => setVendorFilter(e.target.value)}
      />
      <input
        type="text"
        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 text-sm"
        placeholder="Version"
        value={versionFilter}
        onChange={(e) => setVersionFilter(e.target.value)}
      />
    </div>
  
    <button
      onClick={handleFilterChange}
      className="mt-3 w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
    >
      Apply Filters
    </button>
  </div>
  );
};

export default FilterComponent;
