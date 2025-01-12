import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { initializeDatabase } from './db/dbConnect.js';
import bodyParser from 'body-parser';


await initializeDatabase();

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);



export default app;
