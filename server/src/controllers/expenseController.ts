// src/controllers/expenseController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all expenses
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await prisma.expenses.findMany();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

// Group expenses by category and month
export const getGroupedExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await prisma.expenses.findMany();

    // Group by category
    const categoryMap = new Map<string, number>();
    expenses.forEach((expense) => {
      const total = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, total + expense.amount);
    });

    // Group by month
    const monthMap = new Map<string, number>();
    expenses.forEach((expense) => {
      const date = new Date(expense.timestamp);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-MM
      const total = monthMap.get(month) || 0;
      monthMap.set(month, total + expense.amount);
    });

    res.status(200).json({
      categories: Object.fromEntries(categoryMap),
      months: Object.fromEntries(monthMap),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to group expenses" });
  }
};