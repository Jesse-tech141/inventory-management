"use client";

import React, { useState } from "react";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import AddUserModal from "./AddUserModal";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";
import { User, NewUser } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
];

const Users = () => {
  const { data: users, isError, isLoading, refetch } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [pageSize, setPageSize] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]); // Track selected rows

  const handleAddUser = async (newUser: NewUser) => {
    try {
      await createUser(newUser).unwrap();
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      // Delete all selected users
      await Promise.all(
        selectedRows.map((userId) => deleteUser(userId as number).unwrap())
      );
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedRows([]); // Clear selected rows after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !users) {
    console.error("Failed to fetch users:", isError);
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  const transformedUsers = users.map((user) => ({
    ...user,
    name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
  }));

  return (
    <div className="flex flex-col">
      {/* Header with "Add User" and "Delete User" buttons */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Users" />
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" /> Add User
          </button>
          {selectedRows.length > 0 && ( // Show delete button only if rows are selected
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              <TrashIcon className="w-5 h-5 mr-1" />
            </button>
          )}
        </div>
      </div>

      {/* DataGrid for displaying users */}
      <div className="z-10">
        <DataGrid
          rows={transformedUsers}
          columns={columns}
          getRowId={(row) => row.userId}
          onRowClick={(params) => setSelectedUser(params.row)}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection); // Update selected rows
          }}
          rowSelectionModel={selectedRows} // Controlled selection
          pagination
          initialState={{
            pagination: {
              paginationModel: { pageSize },
            },
          }}
          onPaginationModelChange={(params) => setPageSize(params.pageSize)}
          pageSizeOptions={[10, 20, 30]}
          loading={isLoading}
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

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Delete User Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
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
              className="relative rounded-lg shadow-lg w-full max-w-md mx-4 p-4 bg-white"
            >
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete the selected user(s)?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;