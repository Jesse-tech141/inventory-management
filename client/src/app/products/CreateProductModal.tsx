import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/app/redux";

type ProductFormData = {
  name: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  stockQuantity: number;
  description?: string;
  img?: string;
  status: string;
  rating?: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    size: "",
    color: "",
    price: 0,
    stockQuantity: 0,
    description: "",
    img: "",
    status: "Available",
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Call the backend API to create the product
      const response = await fetch("http://51.21.223.255/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      const newProduct = await response.json();

      // Call the onCreate prop (if needed)
      onCreate(newProduct);

      // Reset form after successful submission
      setFormData({
        name: "",
        brand: "",
        size: "",
        color: "",
        price: 0,
        stockQuantity: 0,
        description: "",
        img: "",
        status: "Available",
        rating: 0,
      });
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to create product:", error);
      setError(error instanceof Error ? error.message : "Failed to create product");
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
              isDarkMode ? "bg-gray-800 text-white" : "bg-white"
            }`}
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h1
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Create New Product
              </h1>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
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
              {/* PRODUCT NAME */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  onChange={handleChange}
                  value={formData.name}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* BRAND */}
              <div>
                <label htmlFor="brand" className="block text-sm font-medium mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Enter brand"
                  onChange={handleChange}
                  value={formData.brand}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* SIZE */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium mb-1">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  placeholder="Enter size"
                  onChange={handleChange}
                  value={formData.size}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* COLOR */}
              <div>
                <label htmlFor="color" className="block text-sm font-medium mb-1">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  placeholder="Enter color"
                  onChange={handleChange}
                  value={formData.color}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* PRICE */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  onChange={handleChange}
                  value={formData.price}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* STOCK QUANTITY */}
              <div>
                <label htmlFor="stockQuantity" className="block text-sm font-medium mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="Enter stock quantity"
                  onChange={handleChange}
                  value={formData.stockQuantity}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  onChange={handleChange}
                  value={formData.description}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                />
              </div>

              {/* IMAGE URL */}
              <div>
                <label htmlFor="img" className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="img"
                  placeholder="Enter image URL"
                  onChange={handleChange}
                  value={formData.img}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                />
              </div>

              {/* STATUS */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  name="status"
                  onChange={handleChange}
                  value={formData.status}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              {/* RATING */}
              <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  placeholder="Enter rating (0-5)"
                  onChange={handleChange}
                  value={formData.rating}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  min={0}
                  max={5}
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
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateProductModal;