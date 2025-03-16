import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { useGetDashboardMetricsQuery } from '@/state/api';

// Define category colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FFAF'];

// Category mapping
const CATEGORIES = {
  '01001': 'Website & Platform Costs',
  '01002': 'Product Costs',
  '01003': 'Marketing & Advertising',
  '01004': 'Customer Support',
  '01005': 'Payment Processing Fees',
  '01006': 'Social Media Management',
  '01007': 'Miscellaneous',
};

const ExpensePieChart: React.FC = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
</div>;
  if (isError) return <div>Error fetching data</div>;

  const expenses = data?.expenses || [];

  // Calculate total spending
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Group expenses by category
  const spendingByCategory = expenses.reduce((acc, expense) => {
    const categoryName = CATEGORIES[expense.category as keyof typeof CATEGORIES];
    if (acc[categoryName]) {
      acc[categoryName] += expense.amount;
    } else {
      acc[categoryName] = expense.amount;
    }
    return acc;
  }, {} as { [key: string]: number });

  // Format data for the pie chart
  const pieChartData = Object.entries(spendingByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Fallback for empty data
  if (pieChartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold">Expense Analysis</h2>
          <p className="text-gray-500">No data available.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Expense Analysis</h2>
        <h3 className="text-2xl font-bold">Total Spending: ${totalSpending.toFixed(2)}</h3>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ExpensePieChart;