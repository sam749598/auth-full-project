import { RegisterForm } from "@/components/forms/RegisterForm";
import { Shield, Lock, Users, Zap } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    icon: Lock,
    title: "Secure by default",
    description: "Bcrypt hashing + JWT authentication",
  },
  {
    icon: Users,
    title: "Role based access",
    description: "USER and ADMIN roles out of the box",
  },
  {
    icon: Zap,
    title: "Fast & Modern",
    description: "Built with Next.js and Express",
  },
];

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 flex-col items-center justify-center bg-slate-900 border-r border-slate-800 p-12">
        {/* Glow */}
        <div className="absolute h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative space-y-8 text-center">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-600/20 border border-violet-500/30">
            <Shield size={40} className="text-violet-400" />
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">
              Join us today
            </h2>
            <p className="max-w-sm text-slate-400">
              Create your account and get access to a secure, modern
              authentication system.
            </p>
          </div>

          {/* Perks */}
          <div className="space-y-3 text-left">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600/20">
                    <Icon size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {perk.title}
                    </p>
                    <p className="text-xs text-slate-400">{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}


