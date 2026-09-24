"use client";

import React, { useState } from "react";
import { DDCShelf } from "@/types/shelf";
import { 
  BookOpen, 
  MapPin, 
  Info, 
  Monitor, 
  Luggage, 
  UserCheck, 
  Search, 
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface CirculationRoomMapProps {
  shelves: DDCShelf[];
  selectedShelf: DDCShelf | null;
  onSelectShelf: (shelf: DDCShelf) => void;
}

export default function CirculationRoomMap({
  shelves,
  selectedShelf,
  onSelectShelf,
}: CirculationRoomMapProps) {
  const [hoveredShelfId, setHoveredShelfId] = useState<string | null>(null);

  // Find shelves in this room
  const gradShelf = shelves.find((s) => s.shelfID === "GRADUATE STUDIES") || {
    shelfID: "GRADUATE STUDIES",
    shelfCode: "GRADUATE STUDIES",
    categoryTitle: "Graduate Studies Collection",
    targetCollege: "Graduate School",
    generalCollectionSummary: "Theses, dissertations, and graduate research references.",
    studentGuidance: "Nasa unang estante sa kanan ng Circulation Room.",
    floor: "ground" as const,
    lastUpdated: "",
    iconType: "Journal"
  };

  const recency1Shelf = shelves.find((s) => s.shelfID === "TEN YEARS RECENCY (1)") || {
    shelfID: "TEN YEARS RECENCY (1)",
    shelfCode: "10-YR RECENCY (B)",
    categoryTitle: "Ten Years Recency (Stack B)",
    targetCollege: "All Colleges",
    generalCollectionSummary: "Books published within the last 10 years (Part 2).",
    studentGuidance: "Nasa gitnang estante sa kanan ng Circulation Room.",
    floor: "ground" as const,
    lastUpdated: "",
    iconType: "Journal"
  };

  const recency2Shelf = shelves.find((s) => s.shelfID === "TEN YEARS RECENCY") || {
    shelfID: "TEN YEARS RECENCY",
    shelfCode: "10-YR RECENCY (A)",
    categoryTitle: "Ten Years Recency (Stack A)",
    targetCollege: "All Colleges",
    generalCollectionSummary: "Recent publications (last 10 years) for academic coursework.",
    studentGuidance: "Nasa dulong itaas na estante sa kanan ng Circulation Room.",
    floor: "ground" as const,
    lastUpdated: "",
    iconType: "Journal"
  };

  const opacShelf = shelves.find((s) => s.shelfID.trim() === "OPAC TERMINAL") || {
    shelfID: "OPAC TERMINAL ",
    shelfCode: "OPAC TERMINAL",
    categoryTitle: "Online Public Access Catalog",
    targetCollege: "All Students",
    generalCollectionSummary: "Dedicated computer terminals to look up book call numbers.",
    studentGuidance: "Nakatayo malapit sa entrance partition at katabi ng circulation desk.",
    floor: "ground" as const,
    lastUpdated: "",
    iconType: "Monitor"
  };

  const baggageShelf = shelves.find((s) => s.shelfID === "BAGGAGE") || {
    shelfID: "BAGGAGE",
    shelfCode: "BAGGAGE COUNTER",
    categoryTitle: "Baggage Drop-off Area",
    targetCollege: "All Students",
    generalCollectionSummary: "Lalagyan ng personal na gamit bago pumasok sa reading areas.",
    studentGuidance: "Nasa bukana sa tapat ng entrance doors.",
    floor: "ground" as const,
    lastUpdated: "",
    iconType: "Storage"
  };

  const isSelected = (id: string) => selectedShelf?.shelfID.trim() === id.trim();
  const isHovered = (id: string) => hoveredShelfId === id.trim();

  return (
    <div className="flex flex-col space-y-3">
      {/* Map Control Bar & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20 text-[11px]">
            📍 Ground Floor — East Wing
          </span>
          <span className="font-bold text-white text-xs sm:text-sm">
            Circulation & Reservation Room
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-400" />
            <span className="text-slate-300">Orange Shelves</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 font-medium">Interactive Hotspots</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-slate-700 border border-slate-600" />
            <span className="text-slate-400">Study Tables</span>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint Canvas Container */}
      <div className="relative w-full rounded-2xl bg-[#070b13] border border-slate-800/90 shadow-2xl overflow-hidden p-2 sm:p-4">
        {/* Subtle Blueprint Grid Background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#38bdf8 1px, #070b13 1px)`,
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px"
          }}
        />

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden mb-2 text-center text-[10px] text-slate-400 flex items-center justify-center space-x-1">
          <span>👈 Swipe horizontally to pan floor plan 👉</span>
        </div>

        {/* Scrollable container on mobile */}
        <div className="w-full overflow-x-auto overflow-y-hidden pb-2 select-none">
          <svg
            viewBox="0 0 1000 620"
            className="w-full min-w-[760px] max-w-[1100px] mx-auto h-auto transition-all"
            style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))" }}
          >
            <defs>
              {/* Shelf Strip Pattern */}
              <pattern id="shelfStripes" width="12" height="12" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="12" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.3" />
              </pattern>
              
              <filter id="glowTeal" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#2dd4bf" floodOpacity="0.8" />
              </filter>

              <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Room Boundary Walls */}
            <rect
              x="20"
              y="20"
              width="960"
              height="580"
              rx="12"
              fill="#0b1120"
              stroke="#334155"
              strokeWidth="4"
            />
            {/* Inner Blueprint Boundary */}
            <rect
              x="30"
              y="30"
              width="940"
              height="560"
              rx="8"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />

            {/* TOP EXTERIOR WALL & WINDOWS */}
            <g id="topWindows">
              <rect x="100" y="16" width="780" height="8" fill="#38bdf8" fillOpacity="0.4" />
              <text x="490" y="16" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                EXTERIOR WINDOWS (GARDEN VIEW)
              </text>
            </g>

            {/* TOP WALL RESERVATION & ADMIN DESKS */}
            <g id="adminDesks">
              <rect x="70" y="45" width="220" height="40" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              <text x="180" y="68" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">
                STAFF WORKSTATIONS
              </text>

              {/* Reservations Wall Shelves */}
              <rect x="340" y="45" width="260" height="35" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              <text x="470" y="67" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">
                RESERVATIONS & HOLDINGS
              </text>
            </g>

            {/* CENTRAL STUDY TABLES */}
            <g id="studyArea">
              {/* Row 1 Tables */}
              <g transform="translate(100, 140)">
                <rect x="0" y="0" width="110" height="60" rx="6" fill="#1a1c26" stroke="#475569" strokeWidth="1.5" />
                <rect x="-10" y="12" width="6" height="36" rx="2" fill="#334155" />
                <rect x="114" y="12" width="6" height="36" rx="2" fill="#334155" />
                <text x="55" y="34" fill="#94a3b8" fontSize="10" textAnchor="middle">STUDY TABLE 1</text>
              </g>

              <g transform="translate(250, 140)">
                <rect x="0" y="0" width="110" height="60" rx="6" fill="#1a1c26" stroke="#475569" strokeWidth="1.5" />
                <rect x="-10" y="12" width="6" height="36" rx="2" fill="#334155" />
                <rect x="114" y="12" width="6" height="36" rx="2" fill="#334155" />
                <text x="55" y="34" fill="#94a3b8" fontSize="10" textAnchor="middle">STUDY TABLE 2</text>
              </g>

              {/* Row 2 Tables */}
              <g transform="translate(100, 240)">
                <rect x="0" y="0" width="110" height="60" rx="6" fill="#1a1c26" stroke="#475569" strokeWidth="1.5" />
                <rect x="-10" y="12" width="6" height="36" rx="2" fill="#334155" />
                <rect x="114" y="12" width="6" height="36" rx="2" fill="#334155" />
                <text x="55" y="34" fill="#94a3b8" fontSize="10" textAnchor="middle">STUDY TABLE 3</text>
              </g>

              <g transform="translate(250, 240)">
                <rect x="0" y="0" width="110" height="60" rx="6" fill="#1a1c26" stroke="#475569" strokeWidth="1.5" />
                <rect x="-10" y="12" width="6" height="36" rx="2" fill="#334155" />
                <rect x="114" y="12" width="6" height="36" rx="2" fill="#334155" />
                <text x="55" y="34" fill="#94a3b8" fontSize="10" textAnchor="middle">STUDY TABLE 4</text>
              </g>

              {/* Row 3 Tables */}
              <g transform="translate(390, 140)">
                <rect x="0" y="0" width="90" height="160" rx="6" fill="#1a1c26" stroke="#475569" strokeWidth="1.5" />
                <rect x="15" y="-8" width="60" height="6" rx="2" fill="#334155" />
                <rect x="15" y="162" width="60" height="6" rx="2" fill="#334155" />
                <text x="45" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">READING</text>
                <text x="45" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">CORRIDOR</text>
              </g>

              <g transform="translate(510, 140)">
                <rect x="0" y="0" width="90" height="160" rx="6" fill="#1a1c26" stroke="#475569" strokeWidth="1.5" />
                <rect x="15" y="-8" width="60" height="6" rx="2" fill="#334155" />
                <rect x="15" y="162" width="60" height="6" rx="2" fill="#334155" />
                <text x="45" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">QUIET</text>
                <text x="45" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">ZONE</text>
              </g>
            </g>

            {/* CIRCULATION & RESERVATION DESK (Sir Tirso) */}
            <g id="circulationDesk" className="cursor-pointer" onClick={() => onSelectShelf(opacShelf)}>
              {/* Outer Arc Counter */}
              <path
                d="M 80,480 A 70,70 0 1,1 210,480"
                fill="none"
                stroke="#d97706"
                strokeWidth="20"
                strokeLinecap="round"
                className="transition-all hover:stroke-amber-400"
              />
              <path
                d="M 80,480 A 70,70 0 1,1 210,480"
                fill="none"
                stroke="#78350f"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Sir Tirso Position */}
              <circle cx="145" cy="450" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="145" y="454" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                STAFF
              </text>

              <text x="145" y="525" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                CIRCULATION COUNTER
              </text>
              <text x="145" y="540" fill="#94a3b8" fontSize="9" textAnchor="middle">
                Sir Tirso (Desk In-Charge)
              </text>
            </g>

            {/* ENTRANCE & GLASS PARTITION */}
            <g id="roomEntrance">
              {/* Partition Line */}
              <line x1="320" y1="595" x2="320" y2="440" stroke="#38bdf8" strokeWidth="3" strokeOpacity="0.7" strokeDasharray="8 4" />
              
              {/* Entrance Gate Double Doors */}
              <line x1="520" y1="600" x2="640" y2="600" stroke="#047857" strokeWidth="6" strokeLinecap="round" />
              {/* Door Swing Arcs */}
              <path d="M 520,600 A 40,40 0 0,1 560,560" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 640,600 A 40,40 0 0,0 600,560" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />

              <text x="580" y="590" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                ROOM ENTRANCE
              </text>
            </g>

            {/* ======================================================== */}
            {/* INTERACTIVE HOTSPOT 1: BAGGAGE DROP-OFF                  */}
            {/* ======================================================== */}
            <g
              id="hotspotBaggage"
              className="cursor-pointer transition-all"
              onClick={() => onSelectShelf(baggageShelf)}
              onMouseEnter={() => setHoveredShelfId(baggageShelf.shelfID)}
              onMouseLeave={() => setHoveredShelfId(null)}
            >
              <rect
                x="340"
                y="500"
                width="60"
                height="65"
                rx="6"
                fill={isSelected("BAGGAGE") ? "#042f2e" : "#0f172a"}
                stroke={isSelected("BAGGAGE") ? "#2dd4bf" : "#3b82f6"}
                strokeWidth={isSelected("BAGGAGE") ? 2.5 : 1.5}
                filter={isSelected("BAGGAGE") ? "url(#glowTeal)" : undefined}
                className="hover:stroke-teal-400"
              />
              <text x="370" y="530" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                BAGGAGE
              </text>
              <text x="370" y="545" fill="#94a3b8" fontSize="8" textAnchor="middle">
                DROP-OFF
              </text>

              {/* Pin Beacon */}
              <circle cx="370" cy="495" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="370" cy="495" r="12" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
            </g>

            {/* ======================================================== */}
            {/* INTERACTIVE HOTSPOT 2: OPAC SEARCH TERMINAL              */}
            {/* ======================================================== */}
            <g
              id="hotspotOPAC"
              className="cursor-pointer transition-all"
              onClick={() => onSelectShelf(opacShelf)}
              onMouseEnter={() => setHoveredShelfId(opacShelf.shelfID)}
              onMouseLeave={() => setHoveredShelfId(null)}
            >
              <rect
                x="415"
                y="460"
                width="75"
                height="60"
                rx="6"
                fill={isSelected(opacShelf.shelfID) ? "#042f2e" : "#0f172a"}
                stroke={isSelected(opacShelf.shelfID) ? "#2dd4bf" : "#0ea5e9"}
                strokeWidth={isSelected(opacShelf.shelfID) ? 2.5 : 1.5}
                filter={isSelected(opacShelf.shelfID) ? "url(#glowTeal)" : undefined}
                className="hover:stroke-teal-400"
              />
              <text x="452" y="488" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                OPAC
              </text>
              <text x="452" y="502" fill="#cbd5e1" fontSize="8" textAnchor="middle">
                TERMINAL
              </text>

              {/* Pin Beacon */}
              <circle cx="452" cy="450" r="7" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="452" cy="450" r="13" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
            </g>

            {/* ======================================================== */}
            {/* THREE MAIN ORANGE SHELVING UNITS (EAST WING)             */}
            {/* ======================================================== */}

            {/* 1. TOP SHELF: TEN YEARS RECENCY (Stack A) */}
            <g
              id="shelfTenYearsRecency"
              className="cursor-pointer transition-all"
              onClick={() => onSelectShelf(recency2Shelf)}
              onMouseEnter={() => setHoveredShelfId(recency2Shelf.shelfID)}
              onMouseLeave={() => setHoveredShelfId(null)}
            >
              {/* Outer Bookshelf Box */}
              <rect
                x="670"
                y="130"
                width="270"
                height="65"
                rx="8"
                fill={isSelected(recency2Shelf.shelfID) ? "#451a03" : "#27170a"}
                stroke={isSelected(recency2Shelf.shelfID) ? "#2dd4bf" : isHovered(recency2Shelf.shelfID) ? "#fb923c" : "#ea580c"}
                strokeWidth={isSelected(recency2Shelf.shelfID) ? 3 : 2}
                filter={isSelected(recency2Shelf.shelfID) ? "url(#glowTeal)" : undefined}
                className="transition-all"
              />

              {/* Center Divider Spine */}
              <line x1="670" y1="162" x2="940" y2="162" stroke="#ea580c" strokeWidth="2" strokeDasharray="6 4" />

              {/* Book Compartment Dividers */}
              <line x1="760" y1="130" x2="760" y2="195" stroke="#7c2d12" strokeWidth="1.5" />
              <line x1="850" y1="130" x2="850" y2="195" stroke="#7c2d12" strokeWidth="1.5" />

              {/* Label */}
              <text x="805" y="152" fill="#fed7aa" fontSize="11" fontWeight="bold" textAnchor="middle">
                TEN YEARS RECENCY (STACK A)
              </text>
              <text x="805" y="180" fill="#fb923c" fontSize="9" fontFamily="monospace" textAnchor="middle">
                {recency2Shelf.shelfCode} • 2014–Present Stacks
              </text>

              {/* Hotspot Pin Beacon */}
              <g transform="translate(685, 130)">
                <circle cx="0" cy="0" r="10" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="#fb923c" strokeWidth="2" className="animate-ping" opacity="0.6" />
                <text x="0" y="3.5" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                  1
                </text>
              </g>
            </g>

            {/* 2. MIDDLE SHELF: TEN YEARS RECENCY (1) (Stack B) */}
            <g
              id="shelfTenYearsRecency1"
              className="cursor-pointer transition-all"
              onClick={() => onSelectShelf(recency1Shelf)}
              onMouseEnter={() => setHoveredShelfId(recency1Shelf.shelfID)}
              onMouseLeave={() => setHoveredShelfId(null)}
            >
              {/* Outer Bookshelf Box */}
              <rect
                x="670"
                y="250"
                width="270"
                height="65"
                rx="8"
                fill={isSelected(recency1Shelf.shelfID) ? "#451a03" : "#27170a"}
                stroke={isSelected(recency1Shelf.shelfID) ? "#2dd4bf" : isHovered(recency1Shelf.shelfID) ? "#fb923c" : "#ea580c"}
                strokeWidth={isSelected(recency1Shelf.shelfID) ? 3 : 2}
                filter={isSelected(recency1Shelf.shelfID) ? "url(#glowTeal)" : undefined}
                className="transition-all"
              />

              {/* Center Divider Spine */}
              <line x1="670" y1="282" x2="940" y2="282" stroke="#ea580c" strokeWidth="2" strokeDasharray="6 4" />

              {/* Book Compartment Dividers */}
              <line x1="760" y1="250" x2="760" y2="315" stroke="#7c2d12" strokeWidth="1.5" />
              <line x1="850" y1="250" x2="850" y2="315" stroke="#7c2d12" strokeWidth="1.5" />

              {/* Label */}
              <text x="805" y="272" fill="#fed7aa" fontSize="11" fontWeight="bold" textAnchor="middle">
                TEN YEARS RECENCY (STACK B)
              </text>
              <text x="805" y="300" fill="#fb923c" fontSize="9" fontFamily="monospace" textAnchor="middle">
                {recency1Shelf.shelfCode} • Latest Disciplines
              </text>

              {/* Hotspot Pin Beacon */}
              <g transform="translate(685, 250)">
                <circle cx="0" cy="0" r="10" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="#fb923c" strokeWidth="2" className="animate-ping" opacity="0.6" />
                <text x="0" y="3.5" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                  2
                </text>
              </g>
            </g>

            {/* 3. BOTTOM SHELF: GRADUATE STUDIES */}
            <g
              id="shelfGraduateStudies"
              className="cursor-pointer transition-all"
              onClick={() => onSelectShelf(gradShelf)}
              onMouseEnter={() => setHoveredShelfId(gradShelf.shelfID)}
              onMouseLeave={() => setHoveredShelfId(null)}
            >
              {/* Outer Bookshelf Box */}
              <rect
                x="670"
                y="370"
                width="270"
                height="65"
                rx="8"
                fill={isSelected(gradShelf.shelfID) ? "#064e3b" : "#1e140d"}
                stroke={isSelected(gradShelf.shelfID) ? "#2dd4bf" : isHovered(gradShelf.shelfID) ? "#34d399" : "#ea580c"}
                strokeWidth={isSelected(gradShelf.shelfID) ? 3 : 2}
                filter={isSelected(gradShelf.shelfID) ? "url(#glowTeal)" : undefined}
                className="transition-all"
              />

              {/* Center Divider Spine */}
              <line x1="670" y1="402" x2="940" y2="402" stroke="#ea580c" strokeWidth="2" strokeDasharray="6 4" />

              {/* Book Compartment Dividers */}
              <line x1="760" y1="370" x2="760" y2="435" stroke="#7c2d12" strokeWidth="1.5" />
              <line x1="850" y1="370" x2="850" y2="435" stroke="#7c2d12" strokeWidth="1.5" />

              {/* Label */}
              <text x="805" y="392" fill="#d1fae5" fontSize="11" fontWeight="bold" textAnchor="middle">
                GRADUATE STUDIES COLLECTION
              </text>
              <text x="805" y="420" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">
                {gradShelf.shelfCode} • Theses & Dissertations
              </text>

              {/* Hotspot Pin Beacon */}
              <g transform="translate(685, 370)">
                <circle cx="0" cy="0" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="#34d399" strokeWidth="2" className="animate-ping" opacity="0.6" />
                <text x="0" y="3.5" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                  3
                </text>
              </g>
            </g>

            {/* AISLE ARROWS / CORRIDOR GUIDES */}
            <g id="aisleGuides" opacity="0.4">
              <line x1="805" y1="205" x2="805" y2="235" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="805" y1="325" x2="805" y2="355" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="805" y="224" fill="#38bdf8" fontSize="8" textAnchor="middle">MAIN AISLE</text>
              <text x="805" y="344" fill="#38bdf8" fontSize="8" textAnchor="middle">MAIN AISLE</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating Selected Shelf Quick Status Banner */}
      {selectedShelf && (
        <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 border border-teal-500/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-start sm:items-center space-x-3">
            <span className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono text-[10px] font-bold border border-teal-500/30">
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
            <span className="text-[11px] text-teal-300 font-semibold flex items-center space-x-1">
              <span>Ready to Edit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
