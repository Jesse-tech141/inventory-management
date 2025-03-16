"use client";

import React, { useState } from "react";
import { useGetUsersQuery } from "@/state/api"; // Keep this if you're still using it for fetching users
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddUserModal from "./AddUserModal";
import { PlusCircleIcon } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";
import { User, NewUser } from "@/types/types"; // Import both User and NewUser interfaces

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
];

const Users = () => {
  const { data: users, isError, isLoading, refetch } = useGetUsersQuery();
  const [pageSize, setPageSize] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = async (newUser: NewUser) => {
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }
  
      const createdUser = await response.json();
      console.log("User added successfully:", createdUser);
  
      refetch(); // Refetch the users list
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Failed to add user:", error);
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
      {/* Header with "Add User" button */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Users" />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Add User
        </button>
      </div>

      {/* DataGrid for displaying users */}
      <DataGrid
        rows={transformedUsers}
        columns={columns}
        getRowId={(row) => row.userId}
        onRowClick={(params) => setSelectedUser(params.row)}
        checkboxSelection
        pagination
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        onPaginationModelChange={(params) => setPageSize(params.pageSize)}
        pageSizeOptions={[5, 10, 25]}
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

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser} // Pass the handleAddUser function
      />

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default Users;