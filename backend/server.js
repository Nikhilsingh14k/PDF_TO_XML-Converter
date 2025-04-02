import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
connectDB(process.env.MONGODB_URL);
connectCloudinary();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',userRouter)
// Upload PDF, convert to XML, save to DB


app.listen(port, () => console.log(`Server started on port ${port}`));
