import React from 'react';
import { useDeletePathMutation } from '../../api/pathApi';

const PathItem = ({ path }) => {
  const [deletePath] = useDeletePathMutation();

  const handleDelete = async () => {
    await deletePath(path.id);
  };

  return (
    <li className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center space-x-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{path.title}</h2>
        <p className="text-gray-600">{path.url}</p>
      </div>
      <button
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  );
};

export default PathItem;
