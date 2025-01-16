import React, { useState } from 'react';
import { useAddAppMutation } from '../../api/appApi.js';
import styles from './styles/appStyle.module.css'; // Import CSS Module
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Add New App</h2>
  
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="vendor">Vendor</label>
          <input
            className={styles.input}
            type="text"
            id="vendor"
            name="vendor"
            placeholder="Vendor"
            required
          />
        </div>
  
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="product">Product</label>
          <input
            className={styles.input}
            type="text"
            id="product"
            name="product"
            placeholder="Product"
            required
          />
        </div>
  
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="version">Version</label>
          <input
            className={styles.input}
            type="text"
            id="version"
            name="version"
            placeholder="Version"
            required
          />
        </div>
  
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="cpe_name">CPE Name</label>
          <input
            className={styles.input}
            type="text"
            id="cpe_name"
            name="cpe_name"
            placeholder="CPE Name"
            required
          />
        </div>
  
        <div className={styles.additionalLinks}>
          <h3 className={styles.subheading}>Additional Links (Optional)</h3>
          {additionalLinks.map((link, index) => (
            <div key={index} className={styles.linkGroup}>
              <input
                className={styles.input}
                type="text"
                placeholder="Link Title"
                value={link.title}
                onChange={(e) =>
                  handleLinkChange(index, 'title', e.target.value)
                }
              />
              <input
                className={styles.input}
                type="url"
                placeholder="Link URL"
                value={link.url}
                onChange={(e) =>
                  handleLinkChange(index, 'url', e.target.value)
                }
              />
              <div className={styles.parameters}>
                <h4 className={styles.subheading}>Parameters</h4>
                {link.parameters.map((param, paramIndex) => (
                  <div key={paramIndex} className={styles.parameterGroup}>
                    <input
                      className={styles.inputSmall}
                      type="text"
                      placeholder="Param Name"
                      value={param.name}
                      onChange={(e) =>
                        handleParameterChange(
                          index,
                          paramIndex,
                          'name',
                          e.target.value
                        )
                      }
                    />
                    <input
                      className={styles.inputSmall}
                      type="text"
                      placeholder="Param Value"
                      value={param.value}
                      onChange={(e) =>
                        handleParameterChange(
                          index,
                          paramIndex,
                          'value',
                          e.target.value
                        )
                      }
                    />
                    <button
                      className={styles.removeButton}
                      type="button"
                      onClick={() => handleRemoveParameter(index, paramIndex)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className={styles.addButton}
                  type="button"
                  onClick={() => handleAddParameter(index)}
                >
                  Add Parameter
                </button>
              </div>
              <button
                className={styles.removeButton}
                type="button"
                onClick={() => handleRemoveLink(index)}
              >
                Remove Link
              </button>
            </div>
          ))}
          <button className={styles.addButton} type="button" onClick={handleAddLink}>
            Add Link
          </button>
        </div>
  
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    );
  };

export default AppForm;
