import express from "express";
import { getStatus, updateStatus } from "../controllers/statusController.js";

const router = express.Router();


router.get("/", getStatus);

router.put("/", updateStatus);

export default router;
