"use client";

import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { useGetProductsQuery } from "@/state/api"; // Keep using RTK Query
import Header from "@/app/(components)/Header";
import CreateProductModal from "./CreateProductModal";
import ProductDetailModal from "./ProductDetailModal";
import { motion, AnimatePresence } from "framer-motion";
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
  rating?: number;
};

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


const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products using RTK Query
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  // Handle creating a new product
  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      const response = await fetch("http://localhost:8000/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      const newProduct = await response.json();
      refetch(); // Refetch products after creating a new one
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products. Please try again later.
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full px-4 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <Header name="Products" />
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Product
          </button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* PRODUCT IMAGE */}
              <div className="flex flex-col items-center">
                img</div>

              {/* ESSENTIAL PRODUCT INFO */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className={`text-sm ${
                    product.stockQuantity > 0 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {product.stockQuantity} in stock
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Brand: {product.brand}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CREATE PRODUCT MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />

      {/* PRODUCT DETAIL MODAL */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Products;