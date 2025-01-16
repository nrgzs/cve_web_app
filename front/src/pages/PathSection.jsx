import React from 'react';
import PathList from '../components/pathComponents/PathList';
import PathForm from '../components/pathComponents/PathForm';

const PathSection = () => {
  return (
    <div className='flex flex-col gap-5'>
        <PathList/>
        <PathForm/>
    </div>
  );
};

export default PathSection;
