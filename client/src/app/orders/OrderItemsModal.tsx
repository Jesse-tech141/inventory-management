
import React from "react";
import {
  Modal,
  Box,
  DialogTitle,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  IconButton,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Define the OrderItem interface
export interface OrderItem {
  orderItemId: number; // Primary Key
  orderId: number; // Foreign Key referencing the Order
  productId: number; // Foreign Key referencing the Product
  quantityOrdered: number; // Quantity of the product ordered
  pricePerUnit: number; // Price per unit of the product
  subtotal: number; // Subtotal for the order item (quantityOrdered * pricePerUnit)
}

interface OrderItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrderId: number | null;
  orderItems: OrderItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const OrderItemsModal: React.FC<OrderItemsModalProps> = ({
  isOpen,
  onClose,
  selectedOrderId,
  orderItems,
  isLoading,
  isError,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="h2" gutterBottom color="textPrimary">
          Order Items for Order ID: {selectedOrderId}
        </Typography>
        <IconButton onClick={onClose} size="small"> {/* Smaller close button */}
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
        {isLoading ? (
          <Typography>Loading order items...</Typography>
        ) : isError || !orderItems ? (
          <Typography color="error">Failed to load order items</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price Per Unit</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item: OrderItem) => (
                  <TableRow key={item.orderItemId}>
                    <TableCell>{item.productId}</TableCell>
                    <TableCell>{item.quantityOrdered}</TableCell>
                    <TableCell>${item.pricePerUnit.toFixed(2)}</TableCell>
                    <TableCell>${item.subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Modal>
  );
};

export default OrderItemsModal;