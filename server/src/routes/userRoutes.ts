import express from 'express';
import { getUsers, createUser } from '../controllers/userController';

const router = express.Router();

// Fetch all users
router.get('/all', getUsers);

// Create a new user
router.post('/create', (req, res) => {
  createUser(req, res).catch((error) => {
    console.error('Error in createUser route:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});



export default router;