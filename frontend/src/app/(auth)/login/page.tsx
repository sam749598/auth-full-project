import { LoginForm } from "@/components/forms/LoginForm";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-8">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white">AuthSystem</span>
        </Link>

        {/* Form Card */}
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
          <LoginForm />
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 flex-col items-center justify-center bg-slate-900 border-l border-slate-800 p-12">
        {/* Glow */}
        <div className="absolute h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative space-y-6 text-center">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-600/20 border border-violet-500/30">
            <Shield size={40} className="text-violet-400" />
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">
              Welcome back!
            </h2>
            <p className="max-w-sm text-slate-400">
              Sign in to access your dashboard and manage your account securely.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-violet-400">JWT</p>
              <p className="text-sm text-slate-400">Secured tokens</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <p className="text-2xl font-bold text-violet-400">RBAC</p>
              <p className="text-sm text-slate-400">Role based access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

