"use client";

import { useUsers } from "@/hooks/useUsers";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Trash2,
  Loader2,
  Shield,
  User,
  RefreshCw,
} from "lucide-react";

export default function AdminPage() {
  const { user: currentUser } = useAuthStore();
  const { users, loading, error, getAllUsers, deleteUser } = useUsers();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(id);
  };

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const totalRegularUsers = users.filter((u) => u.role === "USER").length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-400">
            Manage all users and their roles
          </p>
        </div>
        <Button
          onClick={getAllUsers}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <RefreshCw size={15} className="mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20">
              <Users size={18} className="text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Total Users</p>
              <p className="text-2xl font-bold text-white">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/20">
              <User size={18} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Regular Users</p>
              <p className="text-2xl font-bold text-white">{totalRegularUsers}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-600/20">
              <Shield size={18} className="text-fuchsia-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Admins</p>
              <p className="text-2xl font-bold text-white">{totalAdmins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">

        {/* Table Header */}
        <div className="border-b border-slate-800 px-6 py-4">
          <h2 className="font-semibold text-white">All Users</h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 my-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-violet-400" />
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-slate-800/30"
                  >
                    {/* Avatar + Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                          {getInitials(user.name, user.email)}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {user.name || "—"}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          user.role === "ADMIN"
                            ? "border-violet-500/50 bg-violet-500/10 text-violet-400"
                            : "border-slate-600 bg-slate-800 text-slate-400"
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="ghost"
                        size="sm"
                        disabled={currentUser?.id === user.id}
                        className="text-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-30"
                      >
                        <Trash2 size={15} className="mr-1.5" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-16 text-center text-slate-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
