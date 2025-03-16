import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch and organize sales summary, ordered by date (descending)
    const salesSummary = await prisma.sales.findMany({
      orderBy: {
        saleDate: "desc",
      },
    });

    // Fetch and organize expenses, ordered by date (descending)
    const expenses = await prisma.expenses.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });

    // Fetch and organize orders, ordered by date (descending)
    const orders = await prisma.orders.findMany({
      orderBy: {
        orderDate: "desc",
      },
    });

    // Fetch and organize trending products, ordered by rating (descending)
    const trendingProducts = await prisma.products.findMany({
      orderBy: {
        stockQuantity: "desc",
      },
      take: 10, // Limit to top 10 trending products
    });

    // Send the organized data as a response
    res.json({
      salesSummary,
      expenses,
      orders,
      trendingProducts,
    });
  } catch (error) {
    console.error("Error retrieving dashboard metrics:", error);
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};