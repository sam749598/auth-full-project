"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUsers } from "@/hooks/useUsers";
import { getInitials, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Pencil,
  X,
  Loader2,
  Check,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { updateProfile, loading, error } = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const payload: any = {};
    if (formData.name !== user.name) payload.name = formData.name;
    if (formData.email !== user.email) payload.email = formData.email;
    if (formData.password) payload.password = formData.password;

    await updateProfile(user.id, payload);
    setSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-sm text-slate-400">
          Manage your personal information
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">

        {/* Avatar + Info */}
        <div className="flex items-center gap-5 pb-6 border-b border-slate-800">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-xl font-bold text-white">
            {user ? getInitials(user.name, user.email) : "?"}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-white">
              {user?.name || "User"}
            </h2>
            <p className="text-sm text-slate-400">{user?.email}</p>
            <Badge
              variant="outline"
              className={
                user?.role === "ADMIN"
                  ? "border-violet-500/50 bg-violet-500/10 text-violet-400"
                  : "border-slate-600 bg-slate-800 text-slate-400"
              }
            >
              {user?.role}
            </Badge>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-4 py-6 border-b border-slate-800 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-4">
            <User size={18} className="text-violet-400" />
            <div>
              <p className="text-xs text-slate-500">Full Name</p>
              <p className="text-sm font-medium text-white">
                {user?.name || "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-4">
            <Mail size={18} className="text-violet-400" />
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="text-sm font-medium text-white">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-4">
            <Shield size={18} className="text-violet-400" />
            <div>
              <p className="text-xs text-slate-500">Role</p>
              <p className="text-sm font-medium text-white">{user?.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-4">
            <Calendar size={18} className="text-violet-400" />
            <div>
              <p className="text-xs text-slate-500">Joined</p>
              <p className="text-sm font-medium text-white">
                {user?.createdAt ? formatDate(user.createdAt) : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="pt-6">
          {!isEditing ? (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Pencil size={15} className="mr-2" />
                Edit Profile
              </Button>
              {success && (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <Check size={15} />
                  Profile updated successfully!
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-slate-700 bg-slate-800/50 text-white focus:border-violet-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-slate-700 bg-slate-800/50 text-white focus:border-violet-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  New Password{" "}
                  <span className="text-slate-500">(leave blank to keep)</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-slate-700 bg-slate-800/50 text-white focus:border-violet-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {loading ? (
                    <Loader2 size={15} className="animate-spin mr-2" />
                  ) : (
                    <Check size={15} className="mr-2" />
                  )}
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={15} className="mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
