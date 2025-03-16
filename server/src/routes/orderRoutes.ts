import { Router } from "express";
import { getOrders, getOrderItems } from "../controllers/orderController";

const router = Router();

// Fetch all orders
router.get("/", getOrders);

// Fetch order items for a specific order
router.get("/order-items", getOrderItems);

export default router;