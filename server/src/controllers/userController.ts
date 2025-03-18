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
      }
    });


    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error });
  }
};