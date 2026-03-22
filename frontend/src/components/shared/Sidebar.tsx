"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  User,
  LayoutDashboard,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react";

const userLinks = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

const adminLinks = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Admin Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
];

export const Sidebar = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const pathname = usePathname();

  const links = user?.role === "ADMIN" ? adminLinks : userLinks;

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">
      
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
          <Shield size={16} className="text-white" />
        </div>
        <span className="text-lg font-bold text-white">AuthSystem</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-violet-600/20 text-violet-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                {link.label}
              </div>
              {isActive && <ChevronRight size={15} className="text-violet-400" />}
            </Link>
          );
        })}
      </nav>

      {/* User Info + Logout */}
      <div className="border-t border-slate-800 p-4 space-y-3">
        {/* User Card */}
        <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 px-3 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
            {user ? getInitials(user.name, user.email) : "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user?.name || "User"}
            </p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};