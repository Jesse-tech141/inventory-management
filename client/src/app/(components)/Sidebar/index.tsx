"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed, setIsDarkMode } from "@/state";
import {
  Dashboard,
  ContentPaste,
  Settings,
  AttachMoney,
  ViewSidebarRounded,
  People,
  AllInbox,
  DarkMode,
  LightMode,
} from "@mui/icons-material"; // Material Design Icons
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useEffect, useRef, useState } from "react";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = memo(({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } 
       hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
         isActive ? "bg-blue-600 text-white" : "text-gray-700"
       }`}
      >
        <Icon className="w-6 h-6" />
        {!isCollapsed && <span className="font-medium ml-3">{label}</span>}
      </div>
    </Link>
  );
});

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  // Collapse sidebar when clicking outside on smaller screens
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isSidebarCollapsed &&
        isSmallScreen
      ) {
        dispatch(setIsSidebarCollapsed(true));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarCollapsed, dispatch, isSmallScreen]);

  // Check screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // 768px is the `md` breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } transition-all duration-300 ease-in-out overflow-hidden h-full shadow-md z-40 bg-gray-100 text-gray-700`;

  return (
    <div ref={sidebarRef} className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div className="flex items-center px-5 py-4 space-x-10">
        <div className="text-gray-700">Logo</div>
        {!isSidebarCollapsed && (
          <h1 className="ml-3 font-extrabold text-2xl text-gray-700">LEAP</h1>
        )}

        {/* BUTTON AFTER TOP LOGO */}
        <button
          aria-label="Toggle Sidebar"
          className="md:hidden -ml-14 px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors duration"
          onClick={toggleSidebar}
        >
          <ViewSidebarRounded className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Dashboard}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/orders"
          icon={AllInbox}
          label="Orders"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={ContentPaste}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={People}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={Settings}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={AttachMoney}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* DARK MODE TOGGLE (ONLY FOR SMALL SCREENS) */}
      {isSmallScreen && (
        <div className="flex justify-center items-center py-4">
          <button
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <LightMode className="w-6 h-6 text-gray-700" />
            ) : (
              <DarkMode className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      )}

      {/* FOOTER */}
      {!isSidebarCollapsed && (
        <div className="mb-10 px-4">
          <p className="text-center text-xs text-gray-500">&copy; 2025 Leap</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;