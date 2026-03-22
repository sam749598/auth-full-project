"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

export const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="text-slate-400">Sign in to your account to continue</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="rahim@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-300">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-slate-700 bg-slate-800/50 pr-10 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin mr-2" />
          ) : (
            <LogIn size={18} className="mr-2" />
          )}
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-violet-400 hover:text-violet-300 transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};
