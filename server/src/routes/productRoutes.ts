import express from 'express';
import { getProducts, createProduct } from '../controllers/productController';

const router = express.Router();

// GET all products
router.get('/all', getProducts);

// POST create new product
router.post('/create', (req, res) => {
    createProduct(req, res).catch((error) => {
      console.error('Error in createProduct route:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
  });

export default router;