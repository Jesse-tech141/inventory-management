import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/app/(components)/Header";
import Rating from "@mui/material/Rating"; // Import Material-UI Rating
import Stack from "@mui/material/Stack"; // Import Stack for spacing
import { Star } from "lucide-react";

type ProductDetailModalProps = {
  product: any;
  onClose: () => void;
};

const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  if (!product || !product.name || !product.price) return null;

  return (
    <AnimatePresence>
      {product && (
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
              <Header name="Product Details" />
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
                {product.img ? (
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-48 h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-lg text-blue-600 font-medium">
                  ${product.price.toFixed(2)}
                </p>
                {/* Add Rating Here */}
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    value={product.ratings || 0} // Use `ratings` from the product
                    precision={0.5} // Allow half-star precision
                    readOnly // Make it read-only
                    emptyIcon={
                      <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                </Stack>
              </div>

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
                  <p className={
                    product.stockQuantity > 0 
                      ? "text-green-600" 
                      : "text-red-600"
                  }>
                    {product.stockQuantity}
                  </p>
                </div>
                <div>
                  <label className="text-gray-600">Status:</label>
                  <p className={
                    product.status === "Available" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }>
                    {product.status}
                  </p>
                </div>
                <div>
                  <label className="text-gray-600">Created At:</label>
                  <p className="text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
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