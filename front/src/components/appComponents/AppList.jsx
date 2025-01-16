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
    <div className="overflow-y-scroll h-44 border-b-2 border-indigo-200">
      <ul className="flex flex-col space-y-4 p-4">
        {apps.map((app) => (
          <AppItem key={app.id} app={app} />
        ))}
      </ul>
    </div>
  );
};

export default AppList;
