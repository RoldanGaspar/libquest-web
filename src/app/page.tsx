"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DownloadStation } from "@/components/DownloadStation";
import { DDCQuickReference } from "@/components/DDCQuickReference";
import { Footer } from "@/components/Footer";
import { 
  Compass, 
  BookOpen, 
  Award, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2,
  Users
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="py-20 bg-slate-900/60 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Learning Features</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Designed for PSAU Freshmen & Researchers
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-400">
                A complete gamified curriculum built in alignment with PSAU Library orientation procedures.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3D Floor Exploration</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Navigate the virtual Ground Floor, Second Floor Filipiniana & Theses, and Third Floor Reference sections with mobile-optimized third-person controls.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">OPAC & Dewey Decimal System</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Practice searching the Online Public Access Catalog, interpreting call numbers (C vs FIL), and locating books on holographic shelf guides.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Agricultural Museum Exhibits</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inspect authentic heritage artifacts in the PSAU Agricultural Museum with educational inspection hotspots and historical background notes.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">9 Badges & EXP Progression</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Earn official badges including <em>Silence is Golden</em>, <em>Clean Space</em>, and the prestigious <em>Explorer&apos;s Seal</em> upon mastering library procedures.
                </p>
              </div>

              {/* Card 5 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-violet-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Canonical PSAU Staff NPCs</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interact with virtual representations of PSAU librarians: Sir Tirso (Circulation), Ma&apos;am Precy (Filipiniana), Ma&apos;am Gizele (Reference), and Ma&apos;am France.
                </p>
              </div>

              {/* Card 6 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Self-Paced Free Exploration</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Revisit library sections without mission pressure. Explore dynamically updated DDC shelves maintained directly by the Head Librarian.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <DownloadStation />

        {/* DDC Quick Reference Section */}
        <DDCQuickReference />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
