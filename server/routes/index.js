import { Router } from "express";
import cveRoutes from "./cveRoutes.js";
import appRoutes from "./appRoutes.js";
import pathRoutes from "./pathRoutes.js";

const router = Router();

router.use("/cve", cveRoutes);
router.use("/app", appRoutes);
router.use("/path", pathRoutes);

export default router;
