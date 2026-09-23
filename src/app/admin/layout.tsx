"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AdminSidebar } from "@/components/AdminSidebar";
import { ShieldAlert, Lock, Mail, Loader2, Sparkles, Menu } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  // If not admin, show Admin Login Card
  if (!user || !isAdmin) {
    const handleAdminLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError("");
      setLoginLoading(true);

      try {
        await login(email, password);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to log in as admin.";
        setLoginError(msg);
      } finally {
        setLoginLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Head Librarian Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Restricted area. Please sign in with an authorized PSAU Library Administrator account.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              {loginError}
            </div>
          )}

          {user && !isAdmin && (
            <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              You are currently logged in as <strong>{user.email}</strong>, which does not have administrative privileges.
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="librarian@psau.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 rounded-lg font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {loginLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Sign In as Head Librarian</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
            >
              ← Return to LibQuest Public Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authorized Admin View
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      <AdminSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center space-x-3 min-w-0">
            {/* Hamburger Button for Mobile */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400 flex-shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-[11px] sm:text-xs text-slate-400 truncate">
              PSAU · <span className="text-amber-400 font-semibold">Library Management System</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium whitespace-nowrap">Sync Online</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
