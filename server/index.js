import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import hotelsRouter from './routes/hotels.js';
import roomsRouter from './routes/rooms.js';
import usersRouter from './routes/users.js';
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
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);

app.use((error, req, res, next) => {
  const errorMessage = error.message || 500;
  const errorStatus = error.status || 'Something went wrong';
  res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: error.stack,
  });
  next();
});

app.listen('8000', () => {
  connect();
  console.log('connected to server');
});
