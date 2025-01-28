import React, { useState } from 'react';
import StartCveFetch from '../components/cveComponents/StartCveFetch';
import StopCveFetch from '../components/cveComponents/StopCveFetch';
import StatusComponent from '../components/cveComponents/StatusComponent';
import CveList from '../components/cveComponents/CveList';

const CveSection = () => {

  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <StatusComponent  /> 
      <div className="flex gap-4">
        <StartCveFetch/>
        <StopCveFetch  />
      </div>
      <CveList/>
    </div>
  );
};

export default CveSection;
