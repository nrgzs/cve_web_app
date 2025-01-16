import React, { useState } from 'react';
import styles from './pathstyles.module.css';
import { useAddPathMutation } from '../../api/pathApi.js';

const PathForm = () => {
  const [parameters, setParameters] = useState([{ name: '', value: '' }]);
  const [addApp] = useAddPathMutation();

  const handleAddParameter = () => {
    setParameters([...parameters, { name: '', value: '' }]);
  };

  const handleRemoveParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleParameterChange = (index, field, value) => {
    const updatedParams = [...parameters];
    updatedParams[index][field] = value;
    setParameters(updatedParams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);  // Collect form data using FormData

    // Prepare body data from formData
    const title = formData.get('title');
    const url = formData.get('url');

    // Gather parameters from formData as well
    const bodyData = {
      title,
      url,
      parameters: parameters.filter((param) => param.name && param.value),
    };

    // Only send parameters if they are valid
    if (bodyData.parameters.length === 0) {
      delete bodyData.parameters;
    }

    // Sending data to the API
    await addApp(bodyData);

    // Reset the form after submitting
    e.target.reset();
    setParameters([{ name: '', value: '' }]);
  };

   return (
     <form
       className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
       onSubmit={handleSubmit}
     >
       <h2 className="text-2xl font-semibold text-gray-700">Add New Path</h2>

       {/* Title Input */}
       <div className="flex flex-col space-y-2">
         <label className="text-gray-600 font-medium" htmlFor="title">
           Title
         </label>
         <input
           className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
           type="text"
           id="title"
           name="title"
           placeholder="Title"
           required
         />
       </div>

       {/* URL Input */}
       <div className="flex flex-col space-y-2">
         <label className="text-gray-600 font-medium" htmlFor="url">
           URL
         </label>
         <input
           className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
           type="url"
           id="url"
           name="url"
           placeholder="URL"
           required
         />
       </div>

       {/* Parameters Section */}
       <div className="space-y-4">
         <h3 className="text-lg font-semibold text-gray-700">Parameters</h3>
         {parameters.map((param, index) => (
           <div key={index} className="flex space-x-2">
             <input
               className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
               type="text"
               placeholder="Param Name"
               value={param.name}
               onChange={(e) =>
                 handleParameterChange(index, 'name', e.target.value)
               }
             />
             <input
               className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
               type="text"
               placeholder="Param Value"
               value={param.value}
               onChange={(e) =>
                 handleParameterChange(index, 'value', e.target.value)
               }
             />
             <button
               className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
               type="button"
               onClick={() => handleRemoveParameter(index)}
             >
               Remove
             </button>
           </div>
         ))}
         <button
           className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
           type="button"
           onClick={handleAddParameter}
         >
           Add Parameter
         </button>
       </div>

       <button
         className="w-full p-4 bg-indigo-500 text-white rounded hover:bg-indigo-600"
         type="submit"
       >
         Submit
       </button>
     </form>
   );
};

export default PathForm;
