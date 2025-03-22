import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmationModalProps) => {
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
            <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;