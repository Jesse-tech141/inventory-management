'use server';

import pool from '@/lib/db';



type ProductFormData = {
  name: string;
  brand: string;
  size?: string;
  color?: string;
  price: number;
  stockQuantity: number;
  description?: string;
  img?: string;
  status: string;
  rating?: number;
};

export async function createProduct(productData: ProductFormData) {
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
    rating,
  } = productData;

  // Validate required fields
  if (!name || !brand || !price || !stockQuantity || !status) {
    throw new Error('Missing required fields');
  }
  if (isNaN(price) || isNaN(stockQuantity)) {
    throw new Error('Price and stockQuantity must be valid numbers');
  }

  try {
    const client = await pool.connect();

    // Insert the new product into the database
    const result = await client.query(
      `INSERT INTO "Products" (
        name, brand, size, color, price, stockQuantity, description, img, status, ratings
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        name,
        brand,
        size || null, // Set to NULL if undefined
        color || null, // Set to NULL if undefined
        price,
        stockQuantity,
        description || null, // Set to NULL if undefined
        img || null, // Set to NULL if undefined
        status,
        rating || null, // Set to NULL if undefined
      ]
    );

    client.release();
    return result.rows[0]; // Return the newly created product
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create product');
  }
}