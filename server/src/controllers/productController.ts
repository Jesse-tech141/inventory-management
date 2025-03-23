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

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  console.log('Request Body:', req.body); // Log the request body
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
      ratings,
    } = req.body;

    // Validate required fields
    if (!name || !brand || !price || !stockQuantity || !status) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Create the product
    const newProduct = await prisma.products.create({
      data: {
        name,
        brand,
        size,
        color,
        price,
        stockQuantity,
        description,
        img,
        status,
        ratings,
      },
    });

    // Log the created product
    console.log('Created Product:', newProduct);

    // Send the response
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params; // Extract product ID from URL params
  const data = req.body; // Extract updated fields from request body

  try {
    // Validate required fields
    if (!id || !data) {
      res.status(400).json({ message: 'Missing product ID or update data' });
      return;
    }

    // Update the product
    const updatedProduct = await prisma.products.update({
      where: { productId: Number(id) }, // Convert ID to number
      data, // Pass the updated fields
    });

    // Log the updated product
    console.log('Updated Product:', updatedProduct);

    // Send the response
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params; // Extract product ID from URL params

  try {
    // Validate required fields
    if (!id) {
      res.status(400).json({ message: 'Missing product ID' });
      return;
    }

    // Delete the product
    await prisma.products.delete({
      where: { productId: Number(id) }, // Convert ID to number
    });

    // Log the deletion
    console.log('Deleted Product with ID:', id);

    // Send the response
    res.status(204).send(); // No content to return
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};