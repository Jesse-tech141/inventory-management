"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Helper function to aggregate sales data by week, month, or year
const aggregateSalesData = (data: any[], timeframe: string) => {
  const aggregatedData: { [key: string]: number } = {};

  data.forEach((sale) => {
    const date = new Date(sale.saleDate);
    let key: string;

    if (timeframe === "weekly") {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of the week (Sunday)
      key = `${weekStart.toISOString().split("T")[0]}`;
    } else if (timeframe === "monthly") {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    } else {
      key = `${date.getFullYear()}`;
    }

    if (!aggregatedData[key]) {
      aggregatedData[key] = 0;
    }
    aggregatedData[key] += sale.totalAmount;
  });

  return Object.entries(aggregatedData).map(([key, totalAmount]) => ({
    date: key,
    totalAmount,
  }));
};

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">(
    "weekly"
  );

  // Aggregate sales data based on the selected timeframe
  const aggregatedData = aggregateSalesData(salesData, timeframe);

  // Calculate total sales amount
  const totalSalesAmount = aggregatedData.reduce(
    (sum, data) => sum + data.totalAmount,
    0
  );

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Total Sales</p>
                <span className="text-2xl font-extrabold text-blue-600">
                  ${totalSalesAmount.toLocaleString("en")}
                </span>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded"
                value={timeframe}
                onChange={(e) =>
                  setTimeframe(e.target.value as "weekly" | "monthly" | "yearly")
                }
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart
                data={aggregatedData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    if (timeframe === "weekly") {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    } else if (timeframe === "monthly") {
                      const date = new Date(value);
                      return date.toLocaleString("default", { month: "short" });
                    } else {
                      return value;
                    }
                  }}
                />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Bar
                  dataKey="totalAmount"
                  fill="#3b82f6"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>{aggregatedData.length || 0} intervals</p>
              <p className="text-sm">
                Highest Sales:{" "}
                <span className="font-bold">
                  $
                  {Math.max(...aggregatedData.map((data) => data.totalAmount))}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CardSalesSummary;