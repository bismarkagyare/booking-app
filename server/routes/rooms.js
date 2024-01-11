import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('this is room endpoint');
});

router.get('/register', (req, res) => {
  res.send('this is room registration endpoint');
});

export default router;
