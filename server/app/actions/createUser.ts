import { Request, Response } from 'express';
import { NewUser } from '@/types/types'; // Import the NewUser interface
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const createUser = async (req: Request, res: Response) => {
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

  try {
    // Validate required fields
    if (!username || !firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for duplicate username, email, or phoneNumber
    const existingUser = await pool.query(
      'SELECT * FROM "Users" WHERE username = $1 OR email = $2 OR phoneNumber = $3',
      [username, email, phoneNumber]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username, email, or phone number already exists' });
    }

    // Create user with PostgreSQL
    const newUser = await pool.query(
      `INSERT INTO "Users" (
        username, firstname, lastname, email, password, phoneNumber, bio, jobDescription, address, sex, img
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        username,
        firstname,
        lastname,
        email,
        password, // In a real app, hash the password before storing
        phoneNumber,
        bio,
        jobDescription,
        address,
        sex,
        img,
      ]
    );

    res.status(201).json(newUser.rows[0]); // Return the newly created user
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};