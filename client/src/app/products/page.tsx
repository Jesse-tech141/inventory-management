"use client";

import { useState } from "react";
import { PlusCircleIcon, MoreVertical, Trash2, Edit, Eye } from "lucide-react";
import { useGetProductsQuery, useDeleteProductMutation } from "@/state/api";
import Header from "@/app/(components)/Header";
import CreateProductModal from "./CreateProductModal";
import ProductDetailModal from "./ProductDetailModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditProductModal from "./EditProductModal";
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

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // New state for detail modal

  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId).unwrap();
      refetch();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
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

  const productsWithImages = products.map((product) => ({
    ...product,
    img: `https://s3-ims-inventorymanagement.s3.eu-north-1.amazonaws.com/product${
      Math.floor(Math.random() * 32) + 1
    }.jpg`,
  }));

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
          {productsWithImages.map((product, index) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden relative"
            >
              {/* THREE-DOT MENU */}
              <div className="absolute top-2 right-2">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                  {selectedProduct?.productId === product.productId && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsEditModalOpen(true);
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDetailModalOpen(true); // Open detail modal
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* PRODUCT IMAGE */}
              <div className="flex justify-center items-center p-6">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-2xl object-cover w-48 h-48"
                />
              </div>

              {/* PRODUCT INFO */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm ${
                      product.stockQuantity > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
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
        onCreate={() => refetch()}
      />

      {/* EDIT PRODUCT MODAL */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onUpdate={() => refetch()}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          if (selectedProduct) {
            handleDeleteProduct(selectedProduct.productId);
          }
        }}
      />

      {/* PRODUCT DETAIL MODAL */}
      <ProductDetailModal
  product={selectedProduct}
  isOpen={isDetailModalOpen}
  onClose={() => setIsDetailModalOpen(false)}
/>
    </div>
  );
};

export default Products;