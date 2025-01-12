import express from "express";
import {
  createPathController,
  getAllPathsController,
  deletePathByIdController,
} from "../controllers/pathController.js";

const router = express.Router();

// POST route to create a new path
router.post("/", createPathController);

// GET route to get all paths
router.get("/", getAllPathsController);

// DELETE route to delete a path by title
router.delete("/:id", deletePathByIdController);

export default router;
