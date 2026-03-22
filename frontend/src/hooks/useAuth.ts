import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginInput, RegisterInput, AuthResponse } from "@/types";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, logout: storeLogout } = useAuthStore();
  const router = useRouter();

  // ─── Register ───────//
  const register = async (input: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.register(input);
      const { user, token } = res.data as AuthResponse;
      setAuth(user, token);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ─── Login ────//
  const login = async (input: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.login(input);
      const { user, token } = res.data as AuthResponse;
      setAuth(user, token);
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ─── Logout ────//
  const logout = () => {
    storeLogout();
    router.push("/login");
  };

  return {
    register,
    login,
    logout,
    loading,
    error,
  };
};
