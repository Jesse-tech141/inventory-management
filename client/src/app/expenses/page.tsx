// src/app/expenses/page.tsx
"use client";

import { useGetGroupedExpensesQuery } from "@/state/api"; // Import the new hook
import { useMemo, useState } from "react";
import Header from "@/app/(components)/Header";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define category colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919", "#19FFAF"];

// Define category labels
const CATEGORY_LABELS: { [key: string]: string } = {
  "01001": "Website & Platform Costs",
  "01002": "Product Costs",
  "01003": "Marketing & Advertising",
  "01004": "Customer Support",
  "01005": "Payment Processing Fees",
  "01006": "Social Media Management",
  "01007": "Miscellaneous",
};

export default function ExpensesPage() {
  const { data, isLoading } = useGetGroupedExpensesQuery(); // Use the new hook
  const [groupBy, setGroupBy] = useState<"category" | "month">("category");

  // Process data for pie charts
  const processedData = useMemo(() => {
    if (!data) return [];

    if (groupBy === "category") {
      return Object.entries(data.categories).map(([category, total]) => ({
        name: CATEGORY_LABELS[category] || category,
        value: total,
      }));
    } else {
      return Object.entries(data.months).map(([month, total]) => ({
        name: month,
        value: total,
      }));
    }
  }, [data, groupBy]);

  // Calculate percentages and sort data
  const sortedData = useMemo(() => {
    const total = processedData.reduce((sum, item) => sum + item.value, 0);
    return processedData
      .map((item) => ({
        ...item,
        percentage: ((item.value / total) * 100).toFixed(2),
      }))
      .sort((a, b) => b.value - a.value);
  }, [processedData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <Header name="Expenses" />
      <p className="text-gray-600 mb-6 text-center md:text-left">
        Manage and analyze your expenses
      </p>

      {/* Grouping Buttons */}
      <div className="flex justify-center md:justify-start gap-4 mb-8">
        <button
          onClick={() => setGroupBy("category")}
          className={`px-6 py-2 rounded-lg transition-all ${
            groupBy === "category"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Group by Category
        </button>
        <button
          onClick={() => setGroupBy("month")}
          className={`px-6 py-2 rounded-lg transition-all ${
            groupBy === "month"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Group by Month
        </button>
      </div>

      {/* Chart and Breakdown Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            {groupBy === "category" ? "Spending by Category" : "Spending by Month"}
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processedData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {processedData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Breakdown</h2>
          <ul className="space-y-3">
            {sortedData.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
              >
                <span className="font-semibold text-gray-700">{item.name}</span>
                <span className="text-gray-600">
                  ${item.value.toFixed(2)} ({item.percentage}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}