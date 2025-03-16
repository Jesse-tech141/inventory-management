import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.orders.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrderItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { orderId } = req.query;

  if (!orderId) {
    res.status(400).json({ message: "orderId is required" });
    return;
  }

  try {
    const orderItems = await prisma.orderItems.findMany({
      where: {
        orderId: Number(orderId),
      },
    });

    if (!orderItems || orderItems.length === 0) {
      res.status(404).json({ message: "No order items found for this order" });
      return;
    }

    res.json(orderItems);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ message: "Failed to fetch order items" });
  }
};