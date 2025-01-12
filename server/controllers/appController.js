import { createApplication, deleteApplicationService, getApplications } from "../services/appService.js";

export const getAppData = async (req, res, next) => {
  try {
    const applications = await getApplications();
    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error in getApplicationsList:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const postAppData = async (req, res, next) => {
  try {
    const applicationData = req.body;
    console.log(req.body);

    // Input validation
    if (
      !applicationData.vendor ||
      !applicationData.product ||
      !applicationData.version ||
      !applicationData.cpe_name
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Call service to create application
    const application = await createApplication(applicationData);
    return res.status(201).json(application);
  } catch (error) {
    console.error("Error in postApplication:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteAppData = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteApplicationService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
