"use client";

import React, { useState } from "react";
import { useGetOrdersQuery, useGetOrderItemsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import OrderItemsModal from "./OrderItemsModal";

// Define the Order interface
export interface Order {
  orderId: number; // Primary Key
  orderDate: string; // Date when the order was placed
  totalAmount: number; // Total amount of the order
  status: string; // Status of the order (e.g., "Received", "Pending")
  createdAt: string; // Timestamp when the order was created
}

const Orders = () => {
  // Fetch orders using the API hook
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const [pageSize, setPageSize] = useState<number>(20);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch order items for the selected order
  const {
    data: orderItems,
    isLoading: isOrderItemsLoading,
    isError: isOrderItemsError,
  } = useGetOrderItemsQuery(selectedOrderId!, {
    skip: !selectedOrderId, // Skip the query if no order is selected
  });

  // Handle row click
  const handleRowClick = (params: GridRowParams) => {
    setSelectedOrderId(params.row.orderId);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !orders) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch orders</div>
    );
  }

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "orderDate", headerName: "Order Date", width: 200 },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
    },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  return (
    <div className="flex flex-col">
      <Header name="Orders" />

      {/* Wrap DataGrid in a div with a lower z-index */}
      <div className="z-10">
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row.orderId}
          checkboxSelection
          pagination
          initialState={{
            pagination: {
              paginationModel: { pageSize },
            },
          }}
          onPaginationModelChange={(params) => setPageSize(params.pageSize)}
          pageSizeOptions={[20, 40, 60]}
          loading={isLoading}
          onRowClick={handleRowClick} // Use the updated handleRowClick function
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "transparent",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "bold",
              borderBottom: "2px solid #e5e7eb",
            },
            "& .MuiDataGrid-columnHeader": {
              padding: "10px",
              borderRight: "1px solid #e5e7eb",
            },
            "& .MuiDataGrid-columnHeader:last-of-type": {
              borderRight: "none",
            },
            "& .MuiDataGrid-cell": {
              padding: "8px",
            },
            "& .MuiDataGrid-pagination": {
              borderTop: "1px solid #e5e7eb",
              padding: "8px",
            },
            "& .MuiButtonBase-root": {
              color: "#4f46e5",
              "&:hover": {
                backgroundColor: "#e0e7ff",
              },
            },
            "& .MuiSelect-select": {
              color: "#4f46e5",
            },
            "& .MuiSvgIcon-root": {
              color: "#4f46e5",
            },
          }}
          className="bg-white shadow rounded-lg border border-gray-200 mt-5 font-semibold !text-gray-700"
        />
      </div>

      {/* OrderItemsModal Component */}
      <OrderItemsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedOrderId={selectedOrderId}
        orderItems={orderItems}
        isLoading={isOrderItemsLoading}
        isError={isOrderItemsError}
      />
    </div>
  );
};

export default Orders;