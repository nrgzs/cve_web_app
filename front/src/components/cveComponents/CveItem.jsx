import React from "react";

const CveItem = ({ cveData }) => {
  const { appProduct, cpe_name, vendor, version, url, cve } = cveData;

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-bold text-indigo-600">{appProduct}</h3>
      <p>
        <span className="font-semibold">Vendor:</span> {vendor}
      </p>
      <p>
        <span className="font-semibold">Version:</span> {version}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">CPE Name:</span> {cpe_name}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">CVE:</span> {cve}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-500 underline hover:text-indigo-700"
      >
        View Details
      </a>
    </div>
  );
};

export default CveItem;
