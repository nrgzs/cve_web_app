import React, { useState } from 'react';
import { useAddAppMutation } from '../../api/appApi.js';
import styles from './styles/appStyle.module.css'; // Import CSS Module
import { useGetDynamicCveDataByAppIdQuery } from '../../api/cveApi.js';
const AppForm = () => {
    const [additionalLinks, setAdditionalLinks] = useState([]);

    const [addApp] = useAddAppMutation();
   


  
    const handleAddLink = () => {
      setAdditionalLinks([
        ...additionalLinks,
        { title: '', url: '', parameters: [{ name: '', value: '' }] },
      ]);
    };

    
  
    const handleRemoveLink = (index) => {
      setAdditionalLinks(additionalLinks.filter((_, i) => i !== index));
    };
  
    const handleLinkChange = (index, field, value) => {
      const updatedLinks = [...additionalLinks];
      updatedLinks[index][field] = value;
      setAdditionalLinks(updatedLinks);
    };
  
    const handleParameterChange = (linkIndex, paramIndex, field, value) => {
      const updatedLinks = [...additionalLinks];
      updatedLinks[linkIndex].parameters[paramIndex][field] = value;
      setAdditionalLinks(updatedLinks);
    };
  
    const handleAddParameter = (index) => {
      const updatedLinks = [...additionalLinks];
      updatedLinks[index].parameters.push({ name: '', value: '' });
      setAdditionalLinks(updatedLinks);
    };
  
    const handleRemoveParameter = (linkIndex, paramIndex) => {
      const updatedLinks = [...additionalLinks];
      updatedLinks[linkIndex].parameters = updatedLinks[linkIndex].parameters.filter(
        (_, i) => i !== paramIndex
      );
      setAdditionalLinks(updatedLinks);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
  
      const vendor = formData.get('vendor');
      const product = formData.get('product');
      const version = formData.get('version');
      const cpeName = formData.get('cpe_name');
  
      const appData = {
        vendor,
        product,
        version,
        cpe_name: cpeName,
        additional_links: [],
      };
  
      // Process additional links
      additionalLinks.forEach((link, index) => {
        if (link.title && link.url) {
          const linkData = {
            title: link.title,
            url: link.url,
            parameters: link.parameters.filter((param) => param.name && param.value),
          };
          if (linkData.parameters.length > 0) {
            appData.additional_links.push(linkData);
          }
        }
      });
  
      // Only send the additional_links field if it's not empty
      if (appData.additional_links.length === 0) {
        delete appData.additional_links;
      }
  
      await addApp(appData);

  
      // Reset the form
      e.target.reset();
      setAdditionalLinks([]);
    };
  
    return (
      <form
        className="min-w-full min mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-gray-800">Add New App</h2>

        {/* Vendor Input */}
        <div className="flex flex-col space-y-3">
          <label className="text-gray-700 font-medium" htmlFor="vendor">
            Vendor
          </label>
          <input
            className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            id="vendor"
            name="vendor"
            placeholder="Vendor"
            required
          />
        </div>

        {/* Product Input */}
        <div className="flex flex-col space-y-3">
          <label className="text-gray-700 font-medium" htmlFor="product">
            Product
          </label>
          <input
            className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            id="product"
            name="product"
            placeholder="Product"
            required
          />
        </div>

        {/* Version Input */}
        <div className="flex flex-col space-y-3">
          <label className="text-gray-700 font-medium" htmlFor="version">
            Version
          </label>
          <input
            className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            id="version"
            name="version"
            placeholder="Version"
            required
          />
        </div>

        {/* CPE Name Input */}
        <div className="flex flex-col space-y-3">
          <label className="text-gray-700 font-medium" htmlFor="cpe_name">
            CPE Name
          </label>
          <input
            className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            id="cpe_name"
            name="cpe_name"
            placeholder="CPE Name"
            required
          />
        </div>

        {/* Additional Links Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Additional Links (Optional)
          </h3>
          {additionalLinks.map((link, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded shadow-sm space-y-6"
            >
              <div className="flex flex-col space-y-3">
                <label
                  className="text-gray-700 font-medium"
                  htmlFor={`link-title-${index}`}
                >
                  Link Title
                </label>
                <input
                  className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  placeholder="Link Title"
                  value={link.title}
                  onChange={(e) =>
                    handleLinkChange(index, 'title', e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-3">
                <label
                  className="text-gray-700 font-medium"
                  htmlFor={`link-url-${index}`}
                >
                  Link URL
                </label>
                <input
                  className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="url"
                  placeholder="Link URL"
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(index, 'url', e.target.value)
                  }
                />
              </div>

              {/* Parameters Section */}
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-gray-600">
                  Parameters
                </h4>
                {link.parameters.map((param, paramIndex) => (
                  <div
                  key={paramIndex}
                  className="flex flex-col md:flex-row gap-3 flex-wrap md:items-center w-full"
                >
                  <input
                    className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    placeholder="Param Name"
                    value={param.name}
                    onChange={(e) =>
                      handleParameterChange(index, paramIndex, "name", e.target.value)
                    }
                  />
                  <input
                    className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    placeholder="Param Value"
                    value={param.value}
                    onChange={(e) =>
                      handleParameterChange(index, paramIndex, "value", e.target.value)
                    }
                  />
                  <button
                    className="p-3 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto"
                    type="button"
                    onClick={() => handleRemoveParameter(index, paramIndex)}
                  >
                    Remove
                  </button>
                </div>
                ))}
                <button
                  className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                  type="button"
                  onClick={() => handleAddParameter(index)}
                >
                  Add Parameter
                </button>
              </div>

              <button
                className="p-3 mt-4 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                type="button"
                onClick={() => handleRemoveLink(index)}
              >
                Remove Link
              </button>
            </div>
          ))}
          <button
            className="p-3 bg-green-500 text-white rounded hover:bg-green-600"
            type="button"
            onClick={handleAddLink}
          >
            Add Link
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

export default AppForm;
