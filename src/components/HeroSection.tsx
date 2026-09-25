"use client";

import React from "react";
import { Download, Sparkles, BookOpen, Compass, Award, Smartphone } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      {/* Background Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge indicator */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-sm shadow-emerald-500/10 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official PSAU Library Orientation RPG Platform</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Master the Library. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Level Up Your Knowledge.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Experience the Pampanga State Agricultural University (PSAU) Library like never before. 
            Explore 3D floors, decode Dewey Decimal Classification (DDC) shelves, interact with real library staff, 
            and complete interactive quests right on your Android phone.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#download"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Android APK</span>
            </a>

            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 hover:border-slate-600 shadow-md transition-all"
            >
              <span>Explore Features</span>
            </a>
          </div>

          {/* Quick Specs / Highlight Pill */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-1">
                <Smartphone className="w-4 h-4" />
                <span>Offline First</span>
              </div>
              <div className="text-xs text-slate-300">Playable 100% without internet</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-teal-400 text-xs font-semibold mb-1">
                <Compass className="w-4 h-4" />
                <span>3D PSAU Campus</span>
              </div>
              <div className="text-xs text-slate-300">Ground to 3rd floor & Museum</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold mb-1">
                <BookOpen className="w-4 h-4" />
                <span>DDC Curriculum</span>
              </div>
              <div className="text-xs text-slate-300">Real Dewey call number puzzles</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold mb-1">
                <Award className="w-4 h-4" />
                <span>Badges & EXP</span>
              </div>
              <div className="text-xs text-slate-300">Orientation mastery certification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
