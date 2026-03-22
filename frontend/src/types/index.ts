export interface User {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
   iat?: number; 
  exp?: number; 
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface RegisterInput {
  name?: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  name?: string;
  email?: string;
  password?: string;
}