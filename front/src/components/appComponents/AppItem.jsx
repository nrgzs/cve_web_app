import React from 'react';
import { useDeleteAppMutation } from '../../api/appApi.js';

const AppItem = ({ app }) => {
  const [deleteApp] = useDeleteAppMutation();

  const handleDelete = async () => {
    await deleteApp(app.id);
  };

  return (
    <div className=" flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
     <div className=''>
      <h2 className="text-xl font-semibold text-gray-800">{app.product}</h2>
      <p className="text-gray-600">{app.vendor}</p>
      </div>
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
      >
        Delete
      </button>
    </div>
  );
};

export default AppItem;
