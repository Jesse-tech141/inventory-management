// src/routes/expenseRoutes.ts
import { Router } from "express";
import { getExpenses, getGroupedExpenses } from "../controllers/expenseController";

const router = Router();

// Fetch all expenses
router.get("/", getExpenses);

// Fetch grouped expenses (by category and month)
router.get("/grouped", getGroupedExpenses);

export default router;