import Path from "../models/pathModel.js";

// Service to create a new path
export async function createPath(data) {
  try {
    // Create a new path in the database
    const newPath = await Path.create({
      title: data.title,
      url: data.url,
      parameters: data.parameters,  // parameters will be saved as JSON
    });
    return newPath;
  } catch (error) {
    throw new Error(`Error creating path: ${error.message}`);
  }
}

// Service to get all paths
export async function getAllPaths() {
  try {
    // Fetch all paths from the database
    const paths = await Path.findAll();
    return paths;
  } catch (error) {
    throw new Error(`Error fetching paths: ${error.message}`);
  }
}


// Service to delete a path by title
export async function deletePathById(id) {
  try {
    // Delete path by title
    const deleted = await Path.destroy({ where: { id } });
    if (deleted === 0) {
      throw new Error(`No path found with the id: ${id}`);
    }
    return { message: "Path deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting path: ${error.message}`);
  }
}
