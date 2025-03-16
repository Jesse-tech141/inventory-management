import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { NewUser } from '@/types/types'; // Only import NewUser

const prisma = new PrismaClient();

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        userId: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        phoneNumber: true,
        bio: true,
        jobDescription: true,
        address: true,
        sex: true,
        img: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: 'Failed to fetch users',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
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
    } = req.body as NewUser;

    // Validate required fields
    if (!username || !firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for duplicate username, email, or phoneNumber
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { username },
          { email },
          { phoneNumber: phoneNumber || '' }, // Only check if phoneNumber is provided
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username, email, or phone number already exists' });
    }

    // Create user with Prisma
    const newUser = await prisma.users.create({
      data: {
        username: username.trim(),
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.toLowerCase().trim(),
        password, // In a real app, hash the password before storing
        phoneNumber: phoneNumber?.trim(),
        bio: bio?.trim(),
        jobDescription: jobDescription?.trim(),
        address: address?.trim(),
        sex: sex?.trim(),
        img: img?.trim(),
      },
      select: {
        userId: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: 'Failed to create user',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};