import express from 'express';
import { getUsers, createUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// Fetch all users
router.get('/', getUsers);

// Create a new user
router.post('/', createUser);

// Delete a user
router.delete('/:userId', deleteUser);

export default router;