//Main server file

import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes'
import dotenv from 'dotenv';


dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/api/users',userRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));