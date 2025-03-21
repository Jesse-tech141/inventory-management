"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";

export default function ProfileSettingsPage() {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Details</h1>

      {/* Clerk UserProfile Component Integrated Directly */}
      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full max-w-4xl mx-auto", // Customize the root container
            card: "shadow-lg rounded-lg mb-8", // Customize the card and add margin
            headerTitle: "text-2xl font-bold text-blue-600", // Customize the header title
            headerSubtitle: "text-gray-600", // Customize the header subtitle
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700", // Customize primary buttons
            formButtonReset: "text-gray-600 hover:text-gray-800", // Customize secondary buttons
            footerActionText: "text-gray-600", // Customize footer text
          },
          variables: {
            colorPrimary: "#2563eb", // Set primary color
            colorText: "#1f2937", // Set text color
            colorBackground: "#ffffff", // Set background color
            colorInputBackground: "#f9fafb", // Set input background color
          },
        }}
      />
    </div>
  );
}