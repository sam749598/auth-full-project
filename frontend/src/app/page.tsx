import Link from "next/link";
import { Shield, Zap, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "JWT based authentication with bcrypt password hashing.",
  },
  {
    icon: Zap,
    title: "Fast & Lightweight",
    description: "Built with Express and Prisma for maximum performance.",
  },
  {
    icon: Users,
    title: "Role Based Access",
    description: "USER and ADMIN roles with protected routes.",
  },
  {
    icon: Shield,
    title: "Route Protection",
    description: "Middleware based route protection on both frontend and backend.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">AuthSystem</span>
          </div>
          <div className="flex items-center gap-3">
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
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400">
          <Shield size={14} />
          Secure • Fast • Modern
        </div>

        {/* Heading */}
        <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
          Authentication
          <span className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {" "}made simple
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-xl text-lg text-slate-400">
          A modern authentication system built with Next.js, Express, Prisma,
          and PostgreSQL. Role based access control out of the box.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-violet-600 hover:bg-violet-700 text-white px-8"
          >
            <Link href="/register">Get Started →</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        {/* Features */}
        <div className="mt-24 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-left transition-colors hover:border-violet-500/30 hover:bg-slate-900"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20">
                  <Icon size={20} className="text-violet-400" />
                </div>
                <h3 className="mb-1.5 font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        Built with Next.js + Express + Prisma + PostgreSQL
      </footer>
    </div>
  );
}
