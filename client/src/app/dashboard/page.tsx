"use client";

import CardTrendingProducts from "./CardTrendingProducts";
import SalesSummaryGraph from "./SalesSummaryGraph";
import CardExpenseSummary from "./ExpensePieChart";
import OrderStatusPieChart from "./OrderStatusPieChart";
import { DollarSign, ShoppingCart, Users, CreditCard } from "lucide-react";

const Dashboard = () => {
  // Example data for stat cards (replace with real data)
  const stats = {
    todayTotalSales: 1250,
    todayTotalOrders: 42,
    todayRevenue: 8500,
    totalVisitors: 320,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Subheader */}
      <p className="text-gray-600 mb-6">Welcome Back! Here Are Your Analytics Details</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Today Total Sales */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Today Total Sales</h3>
              <p className="text-2xl font-bold">{stats.todayTotalSales}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Today Total Orders */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Today Total Orders</h3>
              <p className="text-2xl font-bold">{stats.todayTotalOrders}</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* Today Revenue */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Today Revenue</h3>
              <p className="text-2xl font-bold">${stats.todayRevenue}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        {/* Total Visitors */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Visitors</h3>
              <p className="text-2xl font-bold">{stats.totalVisitors}</p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Grid Layout for Charts and Tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Row: Expense Summary Card (Left) and Sales Summary Graph (Right) */}
        <div className="md:col-span-1">
          <CardExpenseSummary />
        </div>
        <div className="md:col-span-2">
          <SalesSummaryGraph />
        </div>

        {/* Second Row: Trending Products Table (Left) and Order Status Pie Chart (Right) */}
        <div className="md:col-span-2">
          <CardTrendingProducts />
        </div>
        <div className="md:col-span-1">
          <OrderStatusPieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;