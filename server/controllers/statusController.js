import { getStatusFromDB, updateStatusInDB } from '../services/statusService.js';

// Fetch the current status
export const getStatus = async (req, res) => {
  try {
    const status = await getStatusFromDB();
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    res.json(status);
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update the status
export const updateStatus = async (req, res) => {
  try {
    const { fetchStatus } = req.body;
    const updatedStatus = await updateStatusInDB(fetchStatus);
    res.json({ message: 'Status updated successfully', status: updatedStatus });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
