import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      bio,
      jobDescription,
      address,
      sex,
      img,
    } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      res.status(400).json({ message: 'Username, email, and password are required' });
      return; // Use `return` to exit the function
    }

    // Check if username or email already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Username or email already exists' });
      return; // Use `return` to exit the function
    }

    const newUser = await prisma.users.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        bio,
        jobDescription,
        address,
        sex,
        img,
      },
    });

    res.status(201).json(newUser); // No `return` here
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user'});
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await prisma.users.delete({
      where: { userId: Number(userId) },
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};