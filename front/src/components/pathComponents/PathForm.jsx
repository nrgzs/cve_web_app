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
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Add New path</h2>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="title">Title</label>
        <input
          className={styles.input}
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="url">URL</label>
        <input
          className={styles.input}
          type="url"
          id="url"
          name="url"
          placeholder="URL"
          required
        />
      </div>

      <div className={styles.parameters}>
        <h3 className={styles.subheading}>Parameters</h3>
        {parameters.map((param, index) => (
          <div key={index} className={styles.parameterGroup}>
            <input
              className={styles.inputSmall}
              type="text"
              name={`param_name_${index}`} // Unique name for FormData
              placeholder="Param Name"
              value={param.name}
              onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
            />
            <input
              className={styles.inputSmall}
              type="text"
              name={`param_value_${index}`} // Unique name for FormData
              placeholder="Param Value"
              value={param.value}
              onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
            />
            <button
              className={styles.removeButton}
              type="button"
              onClick={() => handleRemoveParameter(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className={styles.addButton}
          type="button"
          onClick={handleAddParameter}
        >
          Add Parameter
        </button>
      </div>

      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
};

export default PathForm;
