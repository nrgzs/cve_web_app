import React from 'react';
import { useGetAppsQuery } from '../../api/appApi.js';
import AppItem from './AppItem.jsx';
import Loader from '../Loader/loader.jsx';

const AppList = () => {
  const { data: apps, isLoading, error } = useGetAppsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching apps.</p>;

  return (
    <div className="overflow-y-scroll h-full border-b-2 border-indigo-200">
      <ul className="flex flex-col space-y-4 p-4">
        {apps.map((app) => (
          <AppItem key={app.id} app={app} />
        ))}
      </ul>
    </div>
  );
};

export default AppList;
