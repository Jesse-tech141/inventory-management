"use client";

import { usePathname } from "next/navigation";
import DashboardWrapper from "./dashboardWrapper";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Exclude the login page from being wrapped
  const isLoginPage = pathname === "/sign-in";

  return <>{isLoginPage ? children : <DashboardWrapper>{children}</DashboardWrapper>}</>;
}
