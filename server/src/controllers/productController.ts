import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { 
      name,
      brand,
      size,
      color,
      price,
      stockQuantity,
      description,
      img,
      status,
      rating
    } = req.body;

    // Ensure you're not manually setting productId
    const newProduct = await prisma.products.create({
      data: {
        name,
        brand,
        size,
        color,
        price: price,
        stockQuantity,
        description,
        img,
        status,
        ratings: rating
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Error creating product', error });
  }
};