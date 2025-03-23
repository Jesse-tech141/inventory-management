import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Star } from "lucide-react";
import Image from "next/image";

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
  createdAt?: string; // Optional field for creation date
};

type ProductDetailModalProps = {
  product: Product | null;
  isOpen: boolean; // Controls modal visibility
  onClose: () => void; // Function to close the modal
};

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  if (!product) return null;

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
            className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6"
          >
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Product Details</h2>
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

            {/* PRODUCT DETAILS */}
            <div className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                {/* IMAGE CONTAINER */}
                <div className="w-48 h-48 relative mb-4 flex justify-center items-center">
                  {product.img ? (
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={192}
                      height={192}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                {/* PRODUCT NAME AND PRICE */}
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {product.name}
                </h2>
                <p className="text-lg text-blue-600 font-medium">
                  ${product.price.toFixed(2)}
                </p>

                {/* RATING */}
                <Stack spacing={1} className="mt-2">
                  <Rating
                    name="half-rating-read"
                    value={product.ratings || 0}
                    precision={0.5}
                    readOnly
                    emptyIcon={
                      <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                </Stack>
              </div>

              {/* PRODUCT ATTRIBUTES */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-gray-600">Brand:</label>
                  <p className="text-gray-900">{product.brand}</p>
                </div>
                <div>
                  <label className="text-gray-600">Size:</label>
                  <p className="text-gray-900">{product.size}</p>
                </div>
                <div>
                  <label className="text-gray-600">Color:</label>
                  <p className="text-gray-900">{product.color}</p>
                </div>
                <div>
                  <label className="text-gray-600">Stock:</label>
                  <p
                    className={
                      product.stockQuantity > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.stockQuantity}
                  </p>
                </div>
                <div>
                  <label className="text-gray-600">Status:</label>
                  <p
                    className={
                      product.status === "Available"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.status}
                  </p>
                </div>
                {product.createdAt && (
                  <div>
                    <label className="text-gray-600">Created At:</label>
                    <p className="text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {product.description && (
                  <div className="col-span-2">
                    <label className="text-gray-600">Description:</label>
                    <p className="text-gray-900">{product.description}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;