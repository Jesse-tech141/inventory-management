"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

const LoginPage = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Redirect authenticated users to the dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect to a default route
    }
  }, [user, router]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          role="status"
          aria-label="Loading"
        ></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <SignIn.Root>
          <SignIn.Step name="start" className="p-10 flex flex-col gap-6">
            {/* Logo and Heading */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <Image
                        src="https://s3-ims-inventorymanagement.s3.eu-north-1.amazonaws.com/sneakers.png"
                        alt="LEAP-logo"
                        width={27}
                        height={27}
                        className="rounded w-8"
                      />
              <h1 className="text-3xl font-bold text-gray-800">LEAP</h1>
              <h2 className="text-gray-500 text-sm">Sign in to your account</h2>
            </motion.div>

            {/* Global Error */}
            <Clerk.GlobalError className="text-sm text-red-500 text-center" />

            {/* Form Fields */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              {/* Username Field */}
              <Clerk.Field name="identifier" className="flex flex-col gap-2">
                <Clerk.Label className="text-sm text-gray-600" aria-label="Username">
                  Username
                </Clerk.Label>
                <Clerk.Input
                  type="text"
                  required
                  className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-800"
                />
                <Clerk.FieldError className="text-xs text-red-500 mt-1" />
              </Clerk.Field>

              {/* Password Field */}
              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Label className="text-sm text-gray-600" aria-label="Password">
                  Password
                </Clerk.Label>
                <div className="relative">
                  <Clerk.Input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-800 w-full pr-10"
                  />
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={handleClickShowPassword}
                    edge="end"
                    className="absolute inset-y-0 right-0 p-2"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
                <Clerk.FieldError className="text-xs text-red-500 mt-1" />
              </Clerk.Field>

              {/* Sign In Button */}
              <SignIn.Action
                submit
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
              >
                Sign In
              </SignIn.Action>
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center text-sm text-gray-500"
            >
              <SignIn.Action
                navigate="forgot-password"
                className="hover:text-blue-500 transition-colors"
              >
                Forgot your password?
              </SignIn.Action>
            </motion.div>
          </SignIn.Step>
        </SignIn.Root>
      </motion.div>
    </div>
  );
};

export default LoginPage;