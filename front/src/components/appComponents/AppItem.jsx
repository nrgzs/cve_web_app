import React from 'react';
import { useDeleteAppMutation } from '../../api/appApi.js';

const AppItem = ({ app }) => {
  const [deleteApp] = useDeleteAppMutation();

  const handleDelete = async () => {
    await deleteApp(app.id);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    {/* Main App Details */}
    <div>
      <h2 className="text-xl font-semibold text-gray-800">{app.product}</h2>
      <p className="text-gray-600"><strong>Vendor:</strong> {app.vendor}</p>
      <p className="text-gray-600"><strong>Version:</strong> {app.version}</p>
      <p className="text-gray-600">
        <strong>CPE Name:</strong> <span className="text-sm text-gray-500">{app.cpe_name}</span>
      </p>
    </div>
  
    {/* Additional Links Section */}
    {app.additionalLinks?.length > 0 && (
      <div className="mt-2">
        <h3 className="font-medium text-gray-700">Additional Links:</h3>
        <ul className="list-disc list-inside">
          {app.additionalLinks.map((link) => (
            <li key={link.id} className="text-sm">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {link.title}
              </a>
              {/* Render additional link parameters */}
              {link.parameters?.length > 0 && (
                <div className="ml-4 text-gray-500">
                  {link.parameters.map((param, idx) => (
                    <p key={idx}>
                      <strong>{param.name}:</strong> {param.value}
                    </p>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  
    {/* Delete Button */}
    <button
      onClick={handleDelete}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 self-start"
    >
      Delete
    </button>
  </div>
  
  );
};

export default AppItem;
