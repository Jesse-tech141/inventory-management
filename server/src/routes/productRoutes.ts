import express from 'express';
import { getProducts, createProduct } from '../controllers/productController';

const router = express.Router();

// GET all products
router.get('/', getProducts);

// POST create new product
router.post('/', createProduct);

export default router;