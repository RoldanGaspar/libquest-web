"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  BookMarked, 
  LogOut, 
  ArrowLeft, 
  ShieldCheck,
  Library,
  X
} from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const navItems = [
    {
      label: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Student Registry",
      href: "/admin/students",
      icon: Users,
    },
    {
      label: "DDC Shelf Manager",
      href: "/admin/shelves",
      icon: BookMarked,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand & Mobile Close Button */}
          <div className="flex items-center justify-between px-2 py-4 mb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">LibQuest Admin</div>
                <div className="text-[10px] text-amber-400 font-mono">Head Librarian Portal</div>
              </div>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Info & Sign out */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="px-2">
            <div className="text-[11px] font-semibold text-slate-300 truncate">
              {user?.email || "Head Librarian"}
            </div>
            <div className="text-[10px] text-emerald-400 font-mono">
              Role: Administrator
            </div>
          </div>

          <Link
            href="/"
            onClick={onClose}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Landing Page</span>
          </Link>

          <button
            onClick={() => {
              onClose?.();
              logout();
            }}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
