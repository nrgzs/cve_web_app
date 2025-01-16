import React from 'react';
import { useDeletePathMutation } from '../../api/pathApi';

const PathItem = ({ path }) => {
  const [deletePath] = useDeletePathMutation();

  const handleDelete = async () => {
    await deletePath(path.id);
  };

  return (
    <li>
      <h2>{path.title}</h2>
      <p>{path.url}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default PathItem;
