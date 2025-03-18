import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Product Interface
export interface Product {
  productId: number;       // Matches `productId` in the model
  name: string;            // Matches `name` in the model
  brand: string;           // Matches `brand` in the model
  size: string;            // Matches `size` in the model
  color: string;           // Matches `color` in the model
  price: number;    // Matches `price` in the model
  stockQuantity: number;           // Matches `stockQuantity` in the model
  description?: string;    // Matches `description` in the model
  img?: string;            // Matches `img` in the model
  status: string;          // Matches `status` in the model
  createdAt: string;       // Matches `createdAt` in the model
  updatedAt: string;       // Matches `updatedAt` in the model
  ratings?: number;         // Matches `ratings` in the model
}

export interface NewProduct {
  name: string;            // Required field
  brand: string;           // Required field
  size: string;            // Required field
  color: string;           // Required field
  price: number;    // Required field
  stockQuantity: number;           // Required field
  description?: string;    // Optional field
  img?: string;            // Optional field
  status: string;          // Required field
  rating?: number;         // Optional field
}

// Sales Interface
export interface Sale {
  saleId: number;
  saleDate: string;
  totalAmount: number;
  status: string;
}

// Expense Interface
export interface Expense {
  expenseId: number;
  category: string;
  amount: number;
  timestamp: string;
  description: string;
  userId: number;
}

// Order Interface
export interface Order {
  orderId: number; // Primary Key
  orderDate: string; // Date when the order was placed
  totalAmount: number; // Total amount of the order
  status: string; // Status of the order (e.g., "Pending", "Shipped", "Delivered")
  createdAt: string; // Timestamp when the order was created
}

// OrderItem Interface
export interface OrderItem {
  orderItemId: number; // Primary Key
  orderId: number; // Foreign Key referencing the Order
  productId: number; // Foreign Key referencing the Product
  quantityOrdered: number; // Quantity of the product ordered
  pricePerUnit: number; // Price per unit of the product
  subtotal: number; // Subtotal for the order item (quantityOrdered * pricePerUnit)
}


//Expense Categories Interface
export interface ExpenseCategories {
  expenseCategoryId: number;
  categoryName: string;
  description: string;
}

// Notifications Interface
export interface Notifications {
  notificationId: number; // Primary key, auto-incremented
  userId: number;         // Foreign   key to User
  message: string;        // Notification message
  createdAt: Date;        // Timestamp when the notification was created
  readStatus: boolean;    // Whether the notification has been read (boolean, not string)
}

// Dashboard Metrics Interface
export interface DashboardMetrics {
  salesSummary: Sale[];
  expenses: Expense[];
  orders: Order[];
  trendingProducts: Product[];
  expenseCategories: ExpenseCategories[];
  totalSpending: number;
}

// User Interface
export interface User {
  userId: number;          // Primary key
  username: string;        // Unique username
  firstname: string;       // First name
  lastname: string;        // Last name
  email: string;           // Unique email
  password: string;        // Hashed password
  phoneNumber?: string;    // Optional phone number
  bio?: string;            // Optional bio
  jobDescription?: string; // Optional job description
  address?: string;        // Optional address
  sex?: string;            // Optional sex/gender
  img?: string;            // Optional profile image URL
  createdAt: Date;         // Timestamp when user is created
  updatedAt: Date;         // Timestamp when user is updated
}

// Create User Interface
export interface NewUser {
  username: string;        // Unique username
  firstname: string;       // First name
  lastname: string;        // Last name
  email: string;           // Unique email
  password: string;        // Password (to be hashed before storing)
  phoneNumber?: string;    // Optional phone number
  bio?: string;            // Optional bio
  jobDescription?: string; // Optional job description
  address?: string;        // Optional address
  sex?: string;            // Optional sex/gender
  img?: string;            // Optional profile image URL
}

// Define the shape of the grouped expenses data
interface GroupedExpenses {
  categories: { [key: string]: number }; // Key: category, Value: total amount
  months: { [key: string]: number }; // Key: month (YYYY-MM), Value: total amount
}


// Create API
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses", "Sales", "Orders", "ExpenseCategories", "OrderItems", "GroupedExpenses", "Notifications"],
  endpoints: (build) => ({
    // Get Dashboard Metrics
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),

    //Get Products
    getProducts: build.query<Product[], void>({
      query: () => ({
        url: "/products",
      }),
      providesTags: ["Products"],
    }),

// Create Product
createProduct: build.mutation<Product, NewProduct>({
  query: (newProduct) => ({
    url: "/products", // Ensure the URL matches your backend route
    method: "POST",
    body: newProduct,
  }),
  invalidatesTags: ["Products"],
}),

    // Get Users
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // Create User
    createUser: build.mutation<User, NewUser>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"], // Invalidate the "Users" tag to refetch the list
    }),

    // Get Expense
    getExpenses: build.query<Expense[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),

    // Get Grouped Expenses (by category and month)
    getGroupedExpenses: build.query<GroupedExpenses, void>({
      query: () => "/expenses/grouped",
      providesTags: ["GroupedExpenses"], // Use the new tag
    }),

    // Get order items for a specific order
    getOrderItems: build.query<OrderItem[], number>({
      query: (orderId) => `/orders/order-items?orderId=${orderId}`, // Ensure the endpoint is correct
      providesTags: (result, error, orderId) => [
        { type: "OrderItems", id: orderId }, // Tag with orderId for caching
      ],
    }),

    // Get Expense Categories Summary
    getExpenseCategories: build.query<Expense[], void>({
      query: () => "/expensesCategories",
      providesTags: ["ExpenseCategories"],
    }),

    // Get notifications
    getNotifications: build.query<Notifications[], void>({
      query: () => "/settings/",
      providesTags: ["Notifications"], // Use the new tag
    }),


    // Get Sales Summary
    getSales: build.query<Sale[], void>({
      query: () => "/sales",
      providesTags: ["Sales"],
    }),

    // Get Orders
    getOrders: build.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
  }),
});

// Export Hooks
export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetSalesQuery,
  useGetOrdersQuery,
  useGetExpensesQuery,
  useGetExpenseCategoriesQuery,
  useGetOrderItemsQuery,
  useGetGroupedExpensesQuery,
  useGetNotificationsQuery,
} = api;