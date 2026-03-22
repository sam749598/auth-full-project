import { ApiResponse } from "@/types";


const BASE_URL =  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";



// ─── Get Token from localStorage ────//

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};


// ─── Base Fetch ─────//

 const fetchApi = async<T>(
    endpoint:string,
    options:RequestInit = {}
) : Promise<ApiResponse<T>> => {

    const token = getToken();

    const headers:HeadersInit = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch (`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data:ApiResponse<T> = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    };

    return data;


};


// ─── Auth API ─────//

export const authApi = {
    register: (body: { name?: string; email: string; password: string }) =>
        fetchApi("/auth/register", { method: "POST", body: JSON.stringify(body) }),

    login: (body: { email: string; password: string }) =>
        fetchApi("/auth/login", { method: "POST", body: JSON.stringify(body) }),

    getMe: () => fetchApi("/auth/me"),
};


// ─── User API ────//

export const userApi = {
  getAllUsers: () => fetchApi("/auth/users"),

  updateProfile: (id: string, body: { name?: string; email?: string; password?: string }) =>
    fetchApi(`/auth/${id}`, { method: "PATCH", body: JSON.stringify(body) }),

  deleteUser: (id: string) =>
    fetchApi(`/auth/${id}`, { method: "DELETE" }),
};