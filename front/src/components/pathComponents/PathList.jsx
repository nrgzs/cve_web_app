import React from 'react';
import Loader from '../Loader/loader.jsx';
import { useGetPathsQuery } from '../../api/pathApi.js';
import PathItem from './PathItem.jsx';

const PathList = () => {
  const { data: paths, isLoading, error } = useGetPathsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching path.</p>;

  return (
     <div className="overflow-y-scroll h-44 border-b-2 border-indigo-200">
      <ul className="flex flex-col space-y-4 p-4">
      {paths.map((path) => (
        <PathItem key={path.id} path={path} />
      ))}
    </ul>
    </div>
  );
};

export default PathList;
