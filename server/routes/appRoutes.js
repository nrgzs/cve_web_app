import { Router } from "express";
import { deleteAppData, getAppData, postAppData } from "../controllers/appController.js";

const router = Router();

router.get("/", getAppData);
router.post("/", postAppData);

router.delete("/:id", deleteAppData);

export default router;
