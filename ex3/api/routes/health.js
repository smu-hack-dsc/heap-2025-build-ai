// YOU DO NOT NEED TO TOUCH THIS FILE

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is healthy',
    uptime: process.uptime(),  
    timestamp: new Date(),
  });
});

export default router;