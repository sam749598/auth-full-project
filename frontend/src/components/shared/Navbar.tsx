"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Shield, LayoutDashboard } from "lucide-react";

export const Navbar = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <Shield size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">AuthSystem</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user && (
            <>
              {/* Role Badge */}
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

              {/* Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white hover:bg-violet-700 transition-colors">
                    {getInitials(user.name, user.email)}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 border-slate-700 bg-slate-800 text-slate-200"
                >
                  {/* User Info */}
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold text-white">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-slate-700" />

                  {/* Profile */}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex cursor-pointer items-center gap-2 text-slate-300 hover:text-white"
                    >
                      <User size={15} />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  {/* Admin Dashboard */}
                  {user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin"
                        className="flex cursor-pointer items-center gap-2 text-slate-300 hover:text-white"
                      >
                        <LayoutDashboard size={15} />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator className="bg-slate-700" />

                  {/* Logout */}
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex cursor-pointer items-center gap-2 text-red-400 hover:text-red-300 focus:text-red-300"
                  >
                    <LogOut size={15} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Not logged in */}
          {!user && (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                className="text-slate-300 hover:text-white"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};