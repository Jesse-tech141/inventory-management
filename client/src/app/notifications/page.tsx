"use client";

import React, { useState } from "react";
import { useGetNotificationsQuery } from "@/state/api";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes"; // For dark mode support

export default function  NotificationsPage() {
  // Fetch all notifications
  const { data: notifications, isLoading, isError } = useGetNotificationsQuery();

  // Hook to detect dark mode
  const { theme } = useTheme();

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");

  // Filter notifications based on the active tab
  const allNotifications = notifications || [];
  const unreadNotifications = allNotifications.filter((notification) => !notification.readStatus);
  const readNotifications = allNotifications.filter((notification) => notification.readStatus);

  // Determine which notifications to display based on the active tab
  const displayedNotifications =
    activeTab === "all"
      ? allNotifications
      : activeTab === "unread"
      ? unreadNotifications
      : readNotifications;

  return (
    <div className="container mx-auto p-4">
      {/* Notifications Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {isError && (
          <div className="text-center text-red-500">Error fetching notifications</div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "all"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "unread"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Unread Notifications
          </button>
          <button
            onClick={() => setActiveTab("read")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "read"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Read Notifications
          </button>
        </div>

        {/* Displayed Notifications */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {displayedNotifications.map((notification) => (
              <motion.div
                key={notification.notificationId}
                className={`p-4 border rounded-lg shadow-sm ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
                } hover:shadow-md transition-shadow duration-200`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-medium">{notification.message}</p>
                <div className="mt-2 text-sm space-y-1">
                  <p className={theme === "dark" ? "text-gray-300" : "text-gray-500"}>
                    From User ID: {notification.userId}
                  </p>
                  <p className={theme === "dark" ? "text-gray-300" : "text-gray-500"}>
                    Created At: {new Date(notification.createdAt).toLocaleString()}
                  </p>
                  <p
                    className={`inline-block px-2 py-1 rounded ${
                      notification.readStatus
                        ? theme === "dark"
                          ? "bg-green-800 text-green-200"
                          : "bg-green-100 text-green-700"
                        : theme === "dark"
                        ? "bg-yellow-800 text-yellow-200"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {notification.readStatus ? "Read" : "Unread"}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}