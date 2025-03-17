"use client";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import {
  Search,
  Notifications,
  DarkMode,
  LightMode,
  Settings,
  ViewSidebarRounded,
} from "@mui/icons-material"; // Material Design Icons
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";


const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement | null>(null);

  // Toggle sidebar collapse
  const toggleSidebar = () => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));

  // Toggle dark mode
  const toggleDarkMode = () => dispatch(setIsDarkMode(!isDarkMode));

  // Handle search redirection
  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (query === "dashboard") {
      router.push("/dashboard");
    } else if (query === "orders") {
      router.push("/orders");
    } else if (query === "products") {
      router.push("/products");
    } else if (query === "nike") {
      router.push("/products");
    } else if (query === "adidas") {
      router.push("/products");
    } else if (query === "user") {
      router.push("/users");
    } else if (query === "settings") {
      router.push("/settings");
    } else if (query === "expenses") {
      router.push("/expenses");
    }
    setSearchQuery("");
    setSearchFocused(false);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center w-full mb-7 px-4 md:px-8 lg:px-12">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors duration-200"
          onClick={toggleSidebar}
        >
          <ViewSidebarRounded className="w-4 h-4" />
        </button>

        {/* Search Bar */}
        <div className="relative w-52 md:w-60 lg:w-72" ref={searchRef}>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search groups & products"
            className={`pl-10 pr-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 
              ${
              isDarkMode ? "bg-gray-800 text-white" : ""
            }`}
            onFocus={() => setSearchFocused(true)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          className="hover:bg-blue-100 p-2 rounded-full transition-colors duration-200 hidden md:block"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <LightMode className="text-gray-500" />
          ) : (
            <DarkMode className="text-gray-500" />
          )}
        </button>

        {/* Notifications */}
        <div
          className="relative hover:bg-blue-100 p-2 rounded-full transition-colors duration-200 hidden md:block cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          <Notifications className="text-gray-500" />
        </div>

        {/* Profile Icon */}
        <div
          className="relative flex items-center hover:bg-blue-100 p-2 rounded-full transition-colors duration-200 cursor-pointer"
          
        >
          <UserButton />
        </div>

        {/* Settings Icon */}
        <div
          className="relative hover:bg-blue-100 p-2 rounded-full transition-colors duration-200 cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          <Settings className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;