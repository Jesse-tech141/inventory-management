import express from 'express';
import { getUsers, createUser } from '../controllers/userController';

const router = express.Router();

// Fetch all users
router.get('/', getUsers);

// Create a new user
router.post('/', createUser);



export default router;