"use client";

import React, { useState } from "react";
import { DDCShelf } from "@/types/shelf";
import { BookOpen, ChevronRight } from "lucide-react";

interface FilipinianaMapProps {
  shelves: DDCShelf[];
  selectedShelf: DDCShelf | null;
  onSelectShelf: (shelf: DDCShelf) => void;
}

export default function FilipinianaMap({
  shelves,
  selectedShelf,
  onSelectShelf,
}: FilipinianaMapProps) {
  const [hoveredShelfId, setHoveredShelfId] = useState<string | null>(null);

  const filShelf = shelves.find((s) => s.shelfID === "Shelf_DDC_FIL_Filipiniana") || {
    shelfID: "Shelf_DDC_FIL_Filipiniana",
    shelfCode: "FILIPINIANA (FIL)",
    categoryTitle: "Filipiniana Collection",
    targetCollege: "All Students & Researchers",
    iconType: "Journal",
    generalCollectionSummary: "Mga aklat tungkol sa Pilipinas o isinulat ng mga Pilipino, kasama ang Pampanga.",
    studentGuidance: "Filipiniana Section, Second Floor. Ang call number ay nagsisimula sa FIL.",
    floor: "second" as const,
    lastUpdated: ""
  };

  const isSelected = (id: string) => selectedShelf?.shelfID === id;

  return (
    <div className="flex flex-col space-y-3">
      {/* Map Control Bar & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20 text-[11px]">
            📍 Second Floor
          </span>
          <span className="font-bold text-white text-xs sm:text-sm">
            Filipiniana & Theses Research Hall
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-400" />
            <span className="text-slate-300">Filipiniana Stacks</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 font-medium">Click to Inspect</span>
          </div>
        </div>
      </div>

      {/* Blueprint Grid Floor Plan */}
      <div className="relative w-full rounded-2xl bg-[#070b13] border border-slate-800/90 shadow-2xl overflow-hidden p-2 sm:p-4">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px), radial-gradient(#f59e0b 1px, #070b13 1px)`,
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px"
          }}
        />

        <div className="w-full overflow-x-auto overflow-y-hidden pb-2 select-none">
          <svg
            viewBox="0 0 1000 520"
            className="w-full min-w-[760px] max-w-[1100px] mx-auto h-auto transition-all"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))" }}
          >
            <defs>
              <filter id="glowFil" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Boundary Walls */}
            <rect x="20" y="20" width="960" height="480" rx="12" fill="#0b1120" stroke="#334155" strokeWidth="4" />
            <rect x="30" y="30" width="940" height="460" rx="8" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6 4" />

            <text x="500" y="55" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              SECOND FLOOR: FILIPINIANA & THESIS RESEARCH SECTION
            </text>

            {/* Main Interactive Filipiniana Shelf Unit */}
            <g
              transform="translate(150, 110)"
              className="cursor-pointer transition-all"
              onClick={() => onSelectShelf(filShelf)}
              onMouseEnter={() => setHoveredShelfId(filShelf.shelfID)}
              onMouseLeave={() => setHoveredShelfId(null)}
            >
              <rect
                x="0"
                y="0"
                width="700"
                height="110"
                rx="10"
                fill={isSelected(filShelf.shelfID) ? "#451a03" : "#1c140a"}
                stroke={isSelected(filShelf.shelfID) ? "#f59e0b" : "#b45309"}
                strokeWidth={isSelected(filShelf.shelfID) ? 3 : 2}
                filter={isSelected(filShelf.shelfID) ? "url(#glowFil)" : undefined}
              />
              <rect x="0" y="0" width="700" height="8" rx="4" fill="#f59e0b" />

              <text x="350" y="45" fill="#fed7aa" fontSize="16" fontWeight="bold" textAnchor="middle">
                FILIPINIANA SECTION MAIN COLLECTION
              </text>
              <text x="350" y="70" fill="#fcd34d" fontSize="12" fontFamily="monospace" textAnchor="middle">
                Call Number Prefix: FIL • Pampanga & Philippine Academic Stacks
              </text>
              <text x="350" y="92" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Click to configure classification title, summary, and borrowing guidance
              </text>

              {/* Pin */}
              <circle cx="350" cy="18" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <circle cx="350" cy="18" r="16" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
            </g>

            {/* Theses & Practicum Archival Shelves (Units 01-13 Reference Area) */}
            <g transform="translate(150, 260)">
              <rect x="0" y="0" width="700" height="190" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <text x="350" y="35" fill="#cbd5e1" fontSize="13" fontWeight="bold" textAnchor="middle">
                UNDERGRADUATE THESIS & PRACTICUM ARCHIVES (UNITS 01–13)
              </text>
              <text x="350" y="55" fill="#64748b" fontSize="10" textAnchor="middle">
                Organized by Degree Program (BSIT, BSA, BS Crop Science, BS Biology, BAELS, BSGE, BSHM)
              </text>

              {/* Grid of theses units */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <rect
                  key={i}
                  x={30 + i * 92}
                  y={80}
                  width="80"
                  height="80"
                  rx="6"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="1"
                />
              ))}
              <text x="350" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Theses Shelving Units 01 to 13
              </text>
            </g>
          </svg>
        </div>
      </div>

      {selectedShelf && (
        <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-start sm:items-center space-x-3">
            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
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
            <span className="text-[11px] text-amber-300 font-semibold flex items-center space-x-1">
              <span>Selected for Editing</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
