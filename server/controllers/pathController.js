import {
  createPath,
  deletePathById,
  getAllPaths,
} from "../services/pathService.js";

// Controller to create a new path
export async function createPathController(req, res) {
  try {
    const pathData = req.body; // Get the data from the request body
    const newPath = await createPath(pathData); // Call the service to create a path
    res.status(201).json(newPath); // Respond with the created path
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller to get all paths
export async function getAllPathsController(req, res) {
  try {
    const paths = await getAllPaths(); // Call the service to get all paths
    res.status(200).json(paths); // Respond with the list of paths
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller to delete a path by title
export async function deletePathByIdController(req, res) {
  try {
    const id = req.params.id; // Get the title from the URL parameter
    const response = await deletePathById(id); // Call the service to delete the path
    res.status(200).json(response); // Respond with a success message
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
