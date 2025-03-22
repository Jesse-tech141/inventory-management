import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/app/redux";
import { NewUser } from "@/types/types"; // Import the NewUser interface

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (newUser: NewUser) => Promise<void>; // Callback for adding a user
};

const AddUserModal = ({ isOpen, onClose, onAddUser }: AddUserModalProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [formData, setFormData] = useState<NewUser>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    bio: "",
    jobDescription: "",
    address: "",
    sex: "",
    img: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.username || !formData.email || !formData.password) {
        throw new Error("Username, email, and password are required");
      }

      // Clean optional fields by removing empty values
      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
      ) as NewUser;

      // Call the backend API to create the user
      const response = await fetch("https://j1u6ax7a11.execute-api.eu-north-1.amazonaws.com/prod/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      const newUser = await response.json();

      // Call the onAddUser prop (if needed)
      await onAddUser(newUser);

      // Reset form after successful submission
      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phoneNumber: "",
        bio: "",
        jobDescription: "",
        address: "",
        sex: "",
        img: "",
      });
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to add user:", error);
      setError(error instanceof Error ? error.message : "Failed to add user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20 flex items-center justify-center"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-lg shadow-lg w-full max-w-md mx-4 p-4 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            style={{ maxHeight: "90vh", overflowY: "auto" }} // Enable scrolling
          >
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h1
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Add New User
              </h1>
              <button
                onClick={onClose}
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Required Fields */}
              {["username", "firstname", "lastname", "email", "password"].map(
                (field) => (
                  <FormField
                    key={field}
                    field={field as keyof NewUser}
                    formData={formData}
                    handleChange={handleChange}
                    isDarkMode={isDarkMode}
                    required
                  />
                )
              )}

              {/* Optional Fields */}
              {[
                "phoneNumber",
                "jobDescription",
                "address",
                "sex",
                "img",
              ].map((field) => (
                <FormField
                  key={field}
                  field={field as keyof NewUser}
                  formData={formData}
                  handleChange={handleChange}
                  isDarkMode={isDarkMode}
                />
              ))}

              {/* BIO TEXTAREA */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Bio
                </label>
                <textarea
                  name="bio"
                  placeholder="Enter bio"
                  onChange={handleChange}
                  value={formData.bio}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  rows={3}
                />
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              {/* FORM ACTIONS */}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    isDarkMode
                      ? "bg-gray-600 text-white hover:bg-gray-700"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  {isSubmitting ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Reusable FormField Component
const FormField = ({
  field,
  formData,
  handleChange,
  isDarkMode,
  required = false,
}: {
  field: keyof NewUser;
  formData: NewUser;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDarkMode: boolean;
  required?: boolean;
}) => {
  const labels: Record<string, string> = {
    username: "Username",
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email",
    password: "Password",
    phoneNumber: "Phone Number",
    jobDescription: "Job Description",
    address: "Address",
    sex: "Sex/Gender",
    img: "Profile Image URL",
  };

  return (
    <div>
      <label
        className={`block text-sm font-medium mb-1 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {labels[field]}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={field === "password" ? "password" : "text"}
        name={field}
        placeholder={`Enter ${labels[field].toLowerCase()}`}
        onChange={handleChange}
        value={formData[field] || ""}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          isDarkMode
            ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        required={required}
      />
    </div>
  );
};

export default AddUserModal;