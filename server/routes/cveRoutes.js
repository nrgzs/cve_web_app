import { Router } from 'express';
import { getCveData, getInitialCveData } from '../controllers/cveController.js';

const router = Router();

router.get('/', getCveData);

router.post('/getInitialCveData', getInitialCveData)

export default router;
