import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3005;

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
