"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { INITIAL_DDC_SHELVES } from "@/lib/ddcDefaults";
import { 
  Users, 
  BookMarked, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Smartphone,
  ExternalLink
} from "lucide-react";

export default function AdminOverviewPage() {
  const [studentCount, setStudentCount] = useState<number>(0);
  const [shelfCount, setShelfCount] = useState<number>(INITIAL_DDC_SHELVES.length);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverviewStats() {
      try {
        // Count registered students
        const usersSnap = await getDocs(collection(db, "users"));
        setStudentCount(usersSnap.size);

        // Check shelves catalog
        const catalogRef = doc(db, "catalogs", "ddc_shelves");
        const catalogSnap = await getDoc(catalogRef);
        if (catalogSnap.exists()) {
          const data = catalogSnap.data();
          if (data.shelves && Array.isArray(data.shelves)) {
            setShelfCount(data.shelves.length);
          }
        }
      } catch (err) {
        console.warn("Could not fetch stats from Firestore (using fallback):", err);
      } finally {
        setLoading(false);
      }
    }

    loadOverviewStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Admin Dashboard Overview
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Welcome, Head Librarian. Manage student accounts, inspect Dewey Decimal shelves, and broadcast curriculum updates.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Total Registered Students</div>
            <div className="text-2xl font-black text-white mt-1">
              {loading ? "..." : studentCount}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Target capacity: 300+ students</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Active DDC Shelves</div>
            <div className="text-2xl font-black text-white mt-1">
              {shelfCount}
            </div>
            <div className="text-[10px] text-teal-400 mt-1">
              Ground & 2nd Floor Hotspots
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <BookMarked className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Orientation Quests</div>
            <div className="text-2xl font-black text-white mt-1">
              9 Quests
            </div>
            <div className="text-[10px] text-cyan-400 mt-1">
              37 Sequential Objectives (R01-R37)
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Total EXP & Badges</div>
            <div className="text-2xl font-black text-white mt-1">
              980 EXP / 7 Badges
            </div>
            <div className="text-[10px] text-amber-400 mt-1">
              Protected Chapter 1 Baseline
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel A: Student Registry */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Student Account Registry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Browse all registered students, filter by student ID or character type, and export data to CSV for official PSAU library records.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <Link
              href="/admin/students"
              className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Open Student Registry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Panel B: DDC Shelf Manager */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
              <BookMarked className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">DDC Shelf Manager</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically configure Dewey Decimal Classification shelf labels, subjects, and student guidance that sync directly to the mobile game&apos;s Exploration Mode.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <Link
              href="/admin/shelves"
              className="inline-flex items-center space-x-2 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>Open Shelf Manager</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
