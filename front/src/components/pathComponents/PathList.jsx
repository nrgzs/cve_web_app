import React from 'react';
import Loader from '../Loader/loader.jsx';
import { useGetPathsQuery } from '../../api/pathApi.js';
import PathItem from './PathItem.jsx';

const PathList = () => {
  const { data: paths, isLoading, error } = useGetPathsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching path.</p>;
console.log(paths);

  return (
    <ul>
      {paths.map((path) => (
        <PathItem key={path.id} path={path} />
      ))}
    </ul>
  );
};

export default PathList;
