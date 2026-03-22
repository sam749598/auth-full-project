import { useState, useEffect } from "react";
import { userApi } from "@/lib/api";
import { User, UpdateProfileInput } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUser } = useAuthStore();

  // ─── Get All Users ─────//
  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userApi.getAllUsers();
      setUsers(res.data as User[]);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // ─── Update Profile ────//
  const updateProfile = async (id: string, input: UpdateProfileInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await userApi.updateProfile(id, input);
      const updatedUser = res.data as User;

      // store update
      updateUser(updatedUser);

      // users list update
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );

      return updatedUser;
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // ─── Delete User ──────//
  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await userApi.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  // ─── Auto Fetch on Mount ─────//
  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    users,
    loading,
    error,
    getAllUsers,
    updateProfile,
    deleteUser,
  };
};
