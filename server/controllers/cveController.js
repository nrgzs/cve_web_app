import { stopCronHelper } from "../cron/cronHelper.js";
import { fetchCveData, fetchDynamicCveData, fetchInitialCveData, fetchveDataForAllApps, initializeFetchService } from "../services/cveService.js";

export const getCveData = async (req, res, next) => {
  try {
    const data = await fetchCveData();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getInitialCveData = async (req, res, next) => {
  const { appId } = req.params;
  console.log(appId);
  
  try {
    const data = await fetchInitialCveData(appId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getDynamicCveData = async (req, res, next) => {
  const { appId } = req.params;
  console.log(appId);
  
  try {
    const data = await fetchDynamicCveData(appId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getCveDataForAllApps = async (req, res, next) => {
  try {
    const data = await fetchveDataForAllApps();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const initializeFetch = async (req, res, next) => {
  try {
    const data = await initializeFetchService();
    res.status(200).json({"message":"Fetch service started","fetchStatus":true});
  } catch (error) {
    next(error);
  }
};


export const stopInitializeFetchService = async (req, res, next) => {
  try {
   stopCronHelper()
    res.status(200).json({"message":"Fetch service Stopped","fetchStatus":false});
  } catch (error) {
    next(error);
  }
};
