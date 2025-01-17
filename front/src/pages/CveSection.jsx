import React, { useState } from 'react';
import StartCveFetch from '../components/cveComponents/StartCveFetch';
import StopCveFetch from '../components/cveComponents/StopCveFetch';
import StatusComponent from '../components/cveComponents/StatusComponent';
import CveList from '../components/cveComponents/CveList';

const CveSection = () => {
  const [fetchStatus, setFetchStatus] = useState(false); // Track the status

  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <StatusComponent fetchStatus={fetchStatus} /> 
      <div className="flex gap-4">
        <StartCveFetch setFetchStatus={setFetchStatus} />
        <StopCveFetch setFetchStatus={setFetchStatus} />
      </div>
      <CveList/>
    </div>
  );
};

export default CveSection;
