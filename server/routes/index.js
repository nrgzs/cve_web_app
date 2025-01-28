import { Router } from "express";
import cveRoutes from "./cveRoutes.js";
import appRoutes from "./appRoutes.js";
import pathRoutes from "./pathRoutes.js";
import statusRoutes from "./statusRoutes.js";


const router = Router();

router.use("/cve", cveRoutes);
router.use("/app", appRoutes);
router.use("/path", pathRoutes);
router.use("/status", statusRoutes);


export default router;
