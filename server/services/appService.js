import { Application, AdditionalLink } from "../models/applicationModel.js";

// Service to create a new application
export async function createApplication(applicationData) {
  try {

    const { additional_links, ...applicationFields } = applicationData;

    // Create the Application
    const application = await Application.create({...applicationFields, flagsearch:0});
  
    // Save Additional Links (if provided)
    if (additional_links && additional_links.length > 0) {
      const additionalLinksData = additional_links.map((link) => ({
        title: link.title,
        url: link.url,
        parameters: link.parameters, // Save parameters directly
        applicationId: application.id, // Link to the application

      }));
  
      // Bulk create additional links
      await AdditionalLink.bulkCreate(additionalLinksData);
    }
  
    return application;
    
  } catch (error) {
    console.error("Error in createApplication:", error.message);
    throw new Error("Failed to create application.");
  }
}

// Service to fetch all applications
export async function getApplications() {
  try {
    const applications = await Application.findAll({
      include: [
        {
          model: AdditionalLink,
          as: "additionalLinks",
        },
      ],
    });
    return applications;
  } catch (error) {
    console.error("Error in getApplications:", error.message);
    throw new Error("Failed to fetch applications.");
  }
}


export const deleteApplicationService = async (id) => {
  const application = await Application.findByPk(id, {
    include: [{ model: AdditionalLink, as: "additionalLinks" }],
  });

  if (!application) {
    throw new Error(`Application with ID ${id} not found.`);
  }

  await application.destroy(); // This will automatically remove associated AdditionalLinks if cascade is enabled.
  return { message: `Application with ID ${id} deleted successfully.` };
};
