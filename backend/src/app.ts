import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import exerciseRoutes from './routes/exerciseRoutes';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import connectDB from './database';


dotenv.config();
connectDB();


const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

app.use(cors());
app.use(express.json());
app.use('/exercises', express.static('assets/exercises')); // Serve as imagens

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/exercises', exerciseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/api/exercises/:id/generate', (req, res, next) => {
  console.log(`AI Request for exercise: ${req.params.id}`);
  console.log('API Key:', process.env.OPENAI_KEY?.slice(0, 5) + '...');
  next();
});