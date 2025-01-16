import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { initializeDatabase } from './db/dbConnect.js';
import bodyParser from 'body-parser';
import { fetchveDataForAllApps } from './services/cveService.js';
import { cronHelper } from './cron/cronHelper.js';


await initializeDatabase();

const app = express();


// Allow requests from frontend's origin
app.use(
    cors({
      origin: "*", // Replace with your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    })
  );
  
app.use(bodyParser.json());
app.use(express.json());



app.use('/api', routes);

// cronHelper(fetchveDataForAllApps)

app.use(errorHandler);



export default app;
