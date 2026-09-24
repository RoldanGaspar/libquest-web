"use client";

import React, { useState } from "react";
import { DDCShelf } from "@/types/shelf";
import { BookOpen, MapPin, ChevronRight, Layers } from "lucide-react";

interface GeneralStacksMapProps {
  shelves: DDCShelf[];
  selectedShelf: DDCShelf | null;
  onSelectShelf: (shelf: DDCShelf) => void;
}

export default function GeneralStacksMap({
  shelves,
  selectedShelf,
  onSelectShelf,
}: GeneralStacksMapProps) {
  const [hoveredShelfId, setHoveredShelfId] = useState<string | null>(null);

  // Filter ground floor general DDC shelves
  const ddcShelves = shelves.filter(
    (s) => s.floor === "ground" && s.shelfID !== "GRADUATE STUDIES" && !s.shelfID.startsWith("TEN YEARS") && !s.shelfID.startsWith("OPAC") && s.shelfID !== "BAGGAGE"
  );

  const isSelected = (id: string) => selectedShelf?.shelfID === id;
  const isHovered = (id: string) => hoveredShelfId === id;

  return (
    <div className="flex flex-col space-y-3">
      {/* Map Control Bar & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 text-[11px]">
            📍 Ground Floor — West Wing
          </span>
          <span className="font-bold text-white text-xs sm:text-sm">
            General Circulation & Dewey Decimal Stacks (000–900)
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-teal-500/30 border border-teal-400" />
            <span className="text-slate-300">DDC 000–900 Stacks</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-medium">Click to Inspect</span>
          </div>
        </div>
      </div>

      {/* Blueprint Grid Floor Plan */}
      <div className="relative w-full rounded-2xl bg-[#070b13] border border-slate-800/90 shadow-2xl overflow-hidden p-2 sm:p-4">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#06b6d4 1px, transparent 1px), radial-gradient(#06b6d4 1px, #070b13 1px)`,
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px"
          }}
        />

        <div className="sm:hidden mb-2 text-center text-[10px] text-slate-400">
          <span>👈 Swipe horizontally to pan floor plan 👉</span>
        </div>

        <div className="w-full overflow-x-auto overflow-y-hidden pb-2 select-none">
          <svg
            viewBox="0 0 1000 620"
            className="w-full min-w-[760px] max-w-[1100px] mx-auto h-auto transition-all"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))" }}
          >
            <defs>
              <filter id="glowTealDDC" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#14b8a6" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Boundary Walls */}
            <rect x="20" y="20" width="960" height="580" rx="12" fill="#0b1120" stroke="#334155" strokeWidth="4" />
            <rect x="30" y="30" width="940" height="560" rx="8" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6 4" />

            {/* Room Title */}
            <text x="500" y="55" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              MAIN LIBRARY STACKS & READING HALL (DEWEY DECIMAL CLASSIFICATION)
            </text>

            {/* Aisles & Shelves Rendering in 3 Columns */}
            {ddcShelves.map((shelf, idx) => {
              const col = idx % 3;
              const row = Math.floor(idx / 3);
              const x = 70 + col * 300;
              const y = 85 + row * 95;
              const selected = isSelected(shelf.shelfID);
              const hovered = isHovered(shelf.shelfID);

              return (
                <g
                  key={shelf.shelfID}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer transition-all"
                  onClick={() => onSelectShelf(shelf)}
                  onMouseEnter={() => setHoveredShelfId(shelf.shelfID)}
                  onMouseLeave={() => setHoveredShelfId(null)}
                >
                  {/* Shelf Unit Box */}
                  <rect
                    x="0"
                    y="0"
                    width="260"
                    height="70"
                    rx="8"
                    fill={selected ? "#042f2e" : hovered ? "#132338" : "#0f172a"}
                    stroke={selected ? "#2dd4bf" : hovered ? "#38bdf8" : "#334155"}
                    strokeWidth={selected ? 2.5 : 1.5}
                    filter={selected ? "url(#glowTealDDC)" : undefined}
                    className="transition-all"
                  />

                  {/* Top Color Accent */}
                  <rect x="0" y="0" width="260" height="6" rx="3" fill={selected ? "#2dd4bf" : "#0284c7"} fillOpacity={selected ? 1 : 0.8} />

                  {/* Shelf Code Badge */}
                  <rect x="12" y="14" width="95" height="18" rx="4" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
                  <text x="59" y="27" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    {shelf.shelfCode}
                  </text>

                  {/* Beacon Pin */}
                  <circle cx="242" cy="22" r="6" fill={selected ? "#2dd4bf" : "#38bdf8"} stroke="#ffffff" strokeWidth="1.5" />
                  {selected && (
                    <circle cx="242" cy="22" r="12" fill="none" stroke="#2dd4bf" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                  )}

                  {/* Category Title */}
                  <text x="12" y="46" fill="#f8fafc" fontSize="11" fontWeight="bold">
                    {shelf.categoryTitle.length > 28 ? shelf.categoryTitle.slice(0, 27) + "…" : shelf.categoryTitle}
                  </text>

                  {/* Summary / College */}
                  <text x="12" y="60" fill="#94a3b8" fontSize="9">
                    {shelf.targetCollege.length > 34 ? shelf.targetCollege.slice(0, 33) + "…" : shelf.targetCollege}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Floating Selected Shelf Quick Status Banner */}
      {selectedShelf && (
        <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-slate-900 border border-cyan-500/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-start sm:items-center space-x-3">
            <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                  {selectedShelf.shelfCode}
                </span>
                <span className="text-white font-bold text-xs sm:text-sm">
                  {selectedShelf.categoryTitle}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                {selectedShelf.studentGuidance}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto flex-shrink-0">
            <span className="text-[11px] text-cyan-300 font-semibold flex items-center space-x-1">
              <span>Selected for Editing</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
