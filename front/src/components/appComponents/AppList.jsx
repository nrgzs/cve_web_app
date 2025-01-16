import React from 'react';
import { useGetAppsQuery } from '../../api/appApi.js';
import AppItem from './AppItem.jsx';
import Loader from '../Loader/loader.jsx';

const AppList = () => {
  const { data: apps, isLoading, error } = useGetAppsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching apps.</p>;
console.log(apps);

  return (
    <ul>
      {apps.map((app) => (
        <AppItem key={app.id} app={app} />
      ))}
    </ul>
  );
};

export default AppList;
