import StatusModel from '../models/statusModel.js';

// Fetch the current status from the database
export const getStatusFromDB = async () => {
  try {
    const status = await StatusModel.findOne({ where: { id: 1 } });
    return status;
  } catch (error) {
    throw new Error('Error fetching status from the database');
  }
};

// Update the status in the database
export const updateStatusInDB = async (fetchStatus) => {
  try {
    let status = await StatusModel.findOne({ where: { id: 1 } });

    if (!status) {
      // Create a new status entry if it doesn't exist
      status = await StatusModel.create({ fetchStatus });
    } else {
      // Update the existing status
      status.fetchStatus = fetchStatus;
      await status.save();
    }

    return status;
  } catch (error) {
    throw new Error('Error updating status in the database');
  }
};
