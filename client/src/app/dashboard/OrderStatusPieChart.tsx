import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useGetDashboardMetricsQuery } from '@/state/api';

// Define order status colors
const COLORS = ['#0088FE', '#00C49F', '#FF8042']; // Blue, Green, Orange

const OrderStatusPieChart: React.FC = () => {
  // Fetch data using the API hook
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
</div>;
  if (isError) return <div>Error fetching data</div>;

  const orders = data?.orders || [];

  // Group orders by status
  const ordersByStatus = orders.reduce((acc, order) => {
    if (!acc[order.status]) {
      acc[order.status] = 0;
    }
    acc[order.status]++;
    return acc;
  }, {} as { [key: string]: number });

  // Format data for the pie chart
  const pieChartData = Object.entries(ordersByStatus).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Order Status Distribution</h2>
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
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default OrderStatusPieChart;