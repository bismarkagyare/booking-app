import express from 'express';
import { createError } from '../utils/error.js';
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from '../controllers/hotel.js';

const router = express.Router();

// CREATE
router.post('/', createHotel);

// UPDATE
router.put('/:id', updateHotel);

// DELETE
router.delete('/:id', deleteHotel);

// GET A SINGLE HOTEL
router.get('/:id', getHotel);

// GET ALL
router.get('/', getAllHotels);

export default router;
