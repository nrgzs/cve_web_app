import { fetchCveData, fetchInitialCveData } from "../services/cveService.js";

export const getCveData = async (req, res, next) => {
  try {
    const data = await fetchCveData();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getInitialCveData = async (req, res, next) => {
  const app = req.body;
  console.log(app);
  
  try {
    const data = await fetchInitialCveData(app);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
