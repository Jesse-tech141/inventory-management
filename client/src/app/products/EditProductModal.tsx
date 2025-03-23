import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUpdateProductMutation } from "@/state/api";
import { useAppSelector } from "@/app/redux";

type Product = {
  productId: number;
  name: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  stockQuantity: number;
  description?: string;
  img?: string;
  status: string;
  ratings?: number;
};

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdate: () => void;
};

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  onUpdate,
}: EditProductModalProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    brand: "",
    size: "",
    color: "",
    price: 0,
    stockQuantity: 0,
    description: "",
    status: "Available",
    ratings: 0,
  });

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        size: product.size,
        color: product.color,
        price: product.price,
        stockQuantity: product.stockQuantity,
        description: product.description || "",
        status: product.status,
        ratings: product.ratings || 0,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      try {
        console.log("Updating product with data:", { id: product.productId, data: formData }); // Log the payload
        const result = await updateProduct({
          id: product.productId,
          data: formData,
        }).unwrap();
        console.log("Product updated successfully:", result); // Log the result
        onUpdate(); // Refresh the product list
        onClose(); // Close the modal
      } catch (error) {
        console.error("Failed to update product:", error); // Log the error
        alert("Failed to update product. Please check the console for details.");
      }
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
                Edit Product
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
                  value={formData.ratings}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "border-gray-300"
                  }`}
                  min={0}
                  max={5}
                />
              </div>

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
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProductModal;