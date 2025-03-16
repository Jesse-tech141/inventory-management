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