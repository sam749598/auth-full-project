
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";
import Cookies from "js-cookie";



interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    // Actions
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
};


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // ─── Set Auth ─────//
            setAuth: (user, token) => {
                localStorage.setItem("token", token);
                Cookies.set("token", token, { expires: 7 });
                set({ user, token, isAuthenticated: true });
            },

            // ─── Logout ─────//
            logout: () => {
                localStorage.removeItem("token");
                Cookies.remove("token");
                set({ user: null, token: null, isAuthenticated: false });
            },

            // ─── Update User ─────//
            updateUser: (updatedUser) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedUser } : null,
                }));
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)