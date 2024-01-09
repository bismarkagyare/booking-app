import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import authHotels from './routes/hotels.js';
import authRooms from './routes/rooms.js';
import authUsers from './routes/users.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw error;
  }
};

app.get('/', (req, res) => {
  res.send('hello');
});

//middlewares
app.use('/api/auth', authRouter);

app.listen('8000', () => {
  connect();
  console.log('connected to server');
});
