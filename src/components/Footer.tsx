import React from "react";
import { BookOpen, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">LibQuest PSAU</span>
              <p className="text-[11px] text-slate-500">
                Pampanga State Agricultural University · Library Orientation Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-400 text-xs">
            <Link href="#features" className="hover:text-emerald-400 transition-colors">Features</Link>
            <Link href="#download" className="hover:text-emerald-400 transition-colors">Download</Link>
            <Link href="#ddc-guide" className="hover:text-emerald-400 transition-colors">DDC Guide</Link>
            <Link href="/admin" className="hover:text-amber-400 flex items-center space-x-1 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-slate-500 text-[11px] leading-relaxed">
          <p>
            Developed as an academic capstone thesis project for the College of Computing Studies (CCS), 
            Pampanga State Agricultural University (PSAU), Magalang, Pampanga.
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} LibQuest. All rights reserved. Built with Next.js, Firebase, and Unity URP.
          </p>
        </div>
      </div>
    </footer>
  );
};
