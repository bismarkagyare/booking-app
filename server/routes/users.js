import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('this is user endpoint');
});

router.get('/register', (req, res) => {
  res.send('this is user registration endpoint');
});

export default router;
