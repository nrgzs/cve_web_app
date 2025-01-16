import { Router } from 'express';
import { getCveData, getCveDataForAllApps, getDynamicCveData, getInitialCveData, initializeFetch, stopInitializeFetchService } from '../controllers/cveController.js';

const router = Router();

router.get('/', getCveData);

router.post('/getInitialCveData/:appId', getInitialCveData)

router.get('/getDynamicCveData/:appId', getDynamicCveData)

router.get('/getCveDataForAllApps', getCveDataForAllApps)

router.get('/initializeFetch', initializeFetch)

router.get('/stopInitializeFetchService', stopInitializeFetchService)





export default router;
