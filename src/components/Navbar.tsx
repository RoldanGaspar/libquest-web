"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Download, User, LogOut, ShieldCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenAuthModal: (mode: "login" | "register") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal }) => {
  const { user, studentProfile, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-emerald-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                LibQuest
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-emerald-400/80 font-mono">
                PSAU Library Orientation
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">
              Features
            </Link>
            <Link href="#download" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">
              Download APK
            </Link>
            <Link href="#ddc-guide" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">
              DDC Guide
            </Link>
            {isAdmin && (
              <Link 
                href="/admin" 
                className="flex items-center space-x-1 text-sm font-semibold text-amber-400 hover:text-amber-300 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/30 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-xs font-semibold text-white">
                    {studentProfile?.fullName || user.email}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    {studentProfile?.studentId || "Student"}
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  title="Sign out"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuthModal("login")}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuthModal("register")}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-lg shadow-sm shadow-emerald-500/20 transition-all"
                >
                  Register Account
                </button>
              </div>
            )}

            <a
              href="#download"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get APK</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-emerald-400 py-1"
          >
            Features
          </Link>
          <Link
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-emerald-400 py-1"
          >
            Download APK
          </Link>
          <Link
            href="#ddc-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-emerald-400 py-1"
          >
            DDC Guide
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-amber-400 py-1"
            >
              Admin Dashboard
            </Link>
          )}

          <div className="pt-3 border-t border-slate-800">
            {user ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{studentProfile?.fullName || user.email}</div>
                  <div className="text-xs text-emerald-400">{studentProfile?.studentId}</div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs text-rose-400 bg-rose-500/10 rounded-lg border border-rose-500/20"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuthModal("login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-lg text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onOpenAuthModal("register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
