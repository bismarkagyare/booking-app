import express from 'express';
import { createError } from '../utils/error.js';

import { verifyAdmin } from '../utils/verifyToken.js';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from '../controllers/room.js';

const router = express.Router();

// CREATE
router.post('/:hotelid', verifyAdmin, createRoom);

// UPDATE
router.put('/:id', verifyAdmin, updateRoom);

// DELETE
router.delete('/:id', verifyAdmin, deleteRoom);

// GET A SINGLE HOTEL
router.get('/:id', getRoom);

// GET ALL
router.get('/', getRooms);

export default router;
