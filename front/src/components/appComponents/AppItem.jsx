import React from 'react';
import { useDeleteAppMutation } from '../../api/appApi.js';

const AppItem = ({ app }) => {
  const [deleteApp] = useDeleteAppMutation();

  const handleDelete = async () => {
    await deleteApp(app.id);
  };

  return (
    <li>
      <h2>{app.product}</h2>
      <p>{app.vendor}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default AppItem;
