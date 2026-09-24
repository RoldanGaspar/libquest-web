"use client";

import React, { useState, useEffect, useRef } from "react";
import { DDCShelf } from "@/types/shelf";
import { 
  BookOpen, 
  MapPin, 
  Info, 
  Monitor, 
  Luggage, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronRight,
  Layers,
  Sparkles,
  Filter,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Move,
  Copy,
  Check,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Search,
  X,
  Crosshair
} from "lucide-react";

export type FloorTab = "ground" | "second";
export type HotspotFilter = "all" | "circulation_stacks" | "ddc_shelves" | "theses" | "services";

export interface HotspotDefinition {
  id: string;
  shelfIDMatch: string; // Exact match or primary key in DDCShelf.shelfID
  label: string;
  code: string;
  subtitle: string;
  category: "circulation" | "ddc" | "thesis" | "service" | "facility";
  x: number; // percentage 0 to 100 exactly on user yellow boxes
  y: number; // percentage 0 to 100 exactly on user yellow boxes
  floor: FloorTab;
  color: "teal" | "emerald" | "amber" | "cyan" | "purple" | "blue";
}

// Exactly calibrated positions derived from the user-marked yellow boxes
export const OFFICIAL_HOTSPOTS: HotspotDefinition[] = [
  // =========================================================================
  // GROUND FLOOR HOTSPOTS (Exact Yellow Box Centroids)
  // =========================================================================

  // --- 1. TOP VERTICAL STACKS (3 Yellow Boxes) ---
  {
    id: "gf_box_ddc_000_cs",
    shelfIDMatch: "Shelf_DDC_000_ComputerScience",
    label: "Computer Science & Programming",
    code: "SHELF 004–006",
    subtitle: "Software, algorithms, IT & computer systems",
    category: "ddc",
    x: 12.4,
    y: 16.2,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_500_pure_sci",
    shelfIDMatch: "Shelf_DDC_500_PureSciences",
    label: "Pure Sciences & Mathematics",
    code: "SHELF 500–599",
    subtitle: "Mathematics, physics, chemistry, ecology",
    category: "ddc",
    x: 16.4,
    y: 16.2,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_600_agri",
    shelfIDMatch: "Shelf_DDC_600_Agriculture",
    label: "Agriculture & Animal Science",
    code: "SHELF 630–639",
    subtitle: "Crops, farming systems, forestry, agro-tech",
    category: "ddc",
    x: 20.5,
    y: 16.2,
    floor: "ground",
    color: "emerald"
  },

  // --- 2. FOUR MAIN HORIZONTAL STACKS (4 Yellow Boxes at Left Ends) ---
  {
    id: "gf_box_grad_studies",
    shelfIDMatch: "GRADUATE STUDIES",
    label: "Graduate Studies Collection",
    code: "GRADUATE STUDIES",
    subtitle: "Theses, dissertations, and advanced research references",
    category: "circulation",
    x: 25.8,
    y: 51.2,
    floor: "ground",
    color: "teal"
  },
  {
    id: "gf_box_recency_b",
    shelfIDMatch: "TEN YEARS RECENCY (1)",
    label: "Ten Years Recency (Stack B)",
    code: "10-YR RECENCY (B)",
    subtitle: "Books published within the last 10 years (Part 2)",
    category: "circulation",
    x: 25.8,
    y: 55.8,
    floor: "ground",
    color: "teal"
  },
  {
    id: "gf_box_recency_a",
    shelfIDMatch: "TEN YEARS RECENCY",
    label: "Ten Years Recency (Stack A)",
    code: "10-YR RECENCY (A)",
    subtitle: "Recent academic acquisitions (2014–Present)",
    category: "circulation",
    x: 25.8,
    y: 60.6,
    floor: "ground",
    color: "teal"
  },
  {
    id: "gf_box_ddc_400_lang",
    shelfIDMatch: "Shelf_DDC_400_Language",
    label: "Language & Linguistics",
    code: "SHELF 400–499",
    subtitle: "Grammar, dictionaries, foreign languages",
    category: "ddc",
    x: 25.8,
    y: 65.3,
    floor: "ground",
    color: "emerald"
  },

  // --- 3. MIDDLE COLUMN STUDY STACKS (4 Yellow Boxes) ---
  {
    id: "gf_box_ddc_600_tech",
    shelfIDMatch: "Shelf_DDC_600_Technology",
    label: "Technology & Applied Sciences",
    code: "SHELF 600–629",
    subtitle: "Engineering, mechanics, manufacturing",
    category: "ddc",
    x: 10.6,
    y: 48.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_636_husbandry",
    shelfIDMatch: "Shelf_DDC_636_AnimalHusbandry",
    label: "Animal Husbandry & Livestock",
    code: "SHELF 636",
    subtitle: "Livestock management, poultry, swine breeding",
    category: "ddc",
    x: 10.6,
    y: 53.9,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_637_vet",
    shelfIDMatch: "Shelf_DDC_637_Veterinary",
    label: "Veterinary & Dairy Science",
    code: "SHELF 637–658",
    subtitle: "Veterinary clinical medicine, dairy processing",
    category: "ddc",
    x: 10.6,
    y: 62.8,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_658_mgmt",
    shelfIDMatch: "Shelf_DDC_658_Management",
    label: "Management & Commerce",
    code: "SHELF 658",
    subtitle: "Business management, accounting, entrepreneurship",
    category: "ddc",
    x: 10.6,
    y: 67.9,
    floor: "ground",
    color: "emerald"
  },

  // --- 4. BOTTOM ROW STACKS (3 Yellow Boxes) ---
  {
    id: "gf_box_ddc_700_arts",
    shelfIDMatch: "Shelf_DDC_700_Arts",
    label: "Arts & Recreation",
    code: "SHELF 700–799",
    subtitle: "Music, visual arts, architecture, sports",
    category: "ddc",
    x: 15.2,
    y: 70.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_800_lit",
    shelfIDMatch: "Shelf_DDC_800_Literature",
    label: "Literature",
    code: "SHELF 800–899",
    subtitle: "Poetry, drama, rhetoric, literary criticism",
    category: "ddc",
    x: 20.6,
    y: 70.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_900_hist",
    shelfIDMatch: "Shelf_DDC_900_History",
    label: "History & Geography",
    code: "SHELF 900–999",
    subtitle: "World history, geography, biographies, maps",
    category: "ddc",
    x: 25.4,
    y: 70.4,
    floor: "ground",
    color: "emerald"
  },

  // --- 5. PERIMETER & WEST WALL STACKS (4 Yellow Boxes) ---
  {
    id: "gf_box_ddc_100_phil",
    shelfIDMatch: "Shelf_DDC_100_Philosophy",
    label: "Philosophy & Psychology",
    code: "SHELF 100–199",
    subtitle: "Ethics, logic, behavioral sciences",
    category: "ddc",
    x: 6.0,
    y: 47.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_200_rel",
    shelfIDMatch: "Shelf_DDC_200_Religion",
    label: "Religion & Mythology",
    code: "SHELF 200–299",
    subtitle: "Theology, world faiths, comparative religion",
    category: "ddc",
    x: 6.0,
    y: 56.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_300_soc_sci",
    shelfIDMatch: "Shelf_DDC_300_SocialSciences",
    label: "Social Sciences & Education",
    code: "SHELF 300–399",
    subtitle: "Sociology, education, economics, governance",
    category: "ddc",
    x: 6.0,
    y: 66.8,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_660_chem",
    shelfIDMatch: "Shelf_DDC_660_ChemicalEngg",
    label: "Chemical Engineering",
    code: "SHELF 660–699",
    subtitle: "Chemical technology, food science, processing",
    category: "ddc",
    x: 6.0,
    y: 78.1,
    floor: "ground",
    color: "emerald"
  },

  // --- 6. SERVICES & LOBBY ENTRANCE ---
  {
    id: "gf_box_circ_desk",
    shelfIDMatch: "OPAC TERMINAL ",
    label: "Circulation Desk (Sir Tirso)",
    code: "CIRCULATION DESK",
    subtitle: "Keyhole service counter for book borrowing & returns",
    category: "service",
    x: 28.3,
    y: 33.9,
    floor: "ground",
    color: "teal"
  },
  {
    id: "gf_box_opac",
    shelfIDMatch: "OPAC TERMINAL ",
    label: "OPAC Search Terminals",
    code: "OPAC TERMINAL",
    subtitle: "Digital public catalog terminals for book call numbers",
    category: "service",
    x: 28.8,
    y: 28.0,
    floor: "ground",
    color: "cyan"
  },
  {
    id: "gf_box_id_scanner",
    shelfIDMatch: "COMPUTER ID SCANNER",
    label: "Computer ID Scanner Turnstiles",
    code: "ID SCANNER",
    subtitle: "Main entrance biometric & barcode student scanner",
    category: "service",
    x: 43.5,
    y: 76.8,
    floor: "ground",
    color: "cyan"
  },
  {
    id: "gf_box_baggage",
    shelfIDMatch: "BAGGAGE",
    label: "Baggage Drop-off Counter",
    code: "BAGGAGE",
    subtitle: "Student baggage deposit bin at room entrance",
    category: "service",
    x: 39.1,
    y: 69.0,
    floor: "ground",
    color: "cyan"
  },
  {
    id: "gf_box_info_desk",
    shelfIDMatch: "COMPUTER ID SCANNER",
    label: "Library Info & Assistance Desk",
    code: "INFO DESK",
    subtitle: "Student verification, directory & inquiries",
    category: "service",
    x: 52.7,
    y: 52.1,
    floor: "ground",
    color: "blue"
  },

  // =========================================================================
  // SECOND FLOOR HOTSPOTS (Exact Yellow Box Centroids)
  // =========================================================================

  // --- 1. THESIS SECTION TOP ROW (3 Yellow Boxes) ---
  {
    id: "2f_box_thesis_01",
    shelfIDMatch: "SHELVING UNIT 01 BS ENTREPRENURSHIP UT AND TR",
    label: "BS Entrepreneurship (UT / TR)",
    code: "THESIS UNIT 01",
    subtitle: "Business feasibility studies & terminal practicum reports",
    category: "thesis",
    x: 19.3,
    y: 35.8,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_02",
    shelfIDMatch: "SHELVING UNIT 04 BS INFORMATION TECHNOLOGY UNDERGRADUATE THESIS (UT)  CAPSTONE PROJECT (CP)",
    label: "BS Biology & Fisheries (UT)",
    code: "THESIS UNIT 02",
    subtitle: "Biological research & marine sciences theses",
    category: "thesis",
    x: 23.7,
    y: 35.8,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_03",
    shelfIDMatch: "SHELVING UNIT 05 BSA ANIMAL SCIENCE UNDERGRADUATE THESIS (UT)  FARM PRACTICES (FP)",
    label: "BS Agribusiness (UT / SP)",
    code: "THESIS UNIT 03",
    subtitle: "Agricultural business & economic special problems",
    category: "thesis",
    x: 28.0,
    y: 35.8,
    floor: "second",
    color: "teal"
  },

  // --- 2. THESIS SECTION BOTTOM ROW (4 Yellow Boxes) ---
  {
    id: "2f_box_thesis_04",
    shelfIDMatch: "SHELVING UNIT 04 BS INFORMATION TECHNOLOGY UNDERGRADUATE THESIS (UT)  CAPSTONE PROJECT (CP)",
    label: "BS Information Technology (CP / UT)",
    code: "THESIS UNIT 04",
    subtitle: "Software engineering, capstone projects, and IT systems",
    category: "thesis",
    x: 16.5,
    y: 46.2,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_05",
    shelfIDMatch: "SHELVING UNIT 05 BSA ANIMAL SCIENCE UNDERGRADUATE THESIS (UT)  FARM PRACTICES (FP)",
    label: "BSA Animal Science (UT / FP)",
    code: "THESIS UNIT 05",
    subtitle: "Farm practices and livestock research papers",
    category: "thesis",
    x: 21.3,
    y: 46.2,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_06",
    shelfIDMatch: "SHELVING UNIT 05 BSA ANIMAL SCIENCE UNDERGRADUATE THESIS (UT)  FARM PRACTICES (FP)",
    label: "BSA Animal Science Research",
    code: "THESIS UNIT 06",
    subtitle: "Animal nutrition, breeding & livestock papers",
    category: "thesis",
    x: 25.0,
    y: 46.2,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_13",
    shelfIDMatch: "SHELVING UNIT 13 BS CROP SCIENCE UNDERGRADAUTE THESIS (UT) FARM PRACTICES (FP), BS AGRICULTURE UNDERGRADUATE THESIS (UT)",
    label: "BS Crop Science & Agriculture (UT)",
    code: "THESIS UNIT 13",
    subtitle: "Agronomy, pest management, and crop breeding research",
    category: "thesis",
    x: 29.8,
    y: 46.2,
    floor: "second",
    color: "teal"
  },

  // --- 3. THESIS SECTION SIDE WALLS (2 Yellow Boxes) ---
  {
    id: "2f_box_thesis_07",
    shelfIDMatch: "SHELVING UNIT 01 BS ENTREPRENURSHIP UT AND TR",
    label: "Animal Sci / Math / Agroforestry",
    code: "THESIS UNIT 07",
    subtitle: "Interdisciplinary agriculture & mathematics theses",
    category: "thesis",
    x: 11.5,
    y: 41.1,
    floor: "second",
    color: "teal"
  },

  // --- 4. FILIPINIANA SECTION RIGHT AISLE (2 Yellow Boxes) ---
  {
    id: "2f_box_filipiniana_main",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Filipiniana Collection Main Stacks",
    code: "FILIPINIANA (FIL)",
    subtitle: "Pampanga history, Philippine culture, and Filipiniana authors",
    category: "ddc",
    x: 21.0,
    y: 64.3,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_filipiniana_stack2",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Filipiniana Archival Collection",
    code: "FIL ARCHIVES",
    subtitle: "Philippine government documents, law, and history",
    category: "ddc",
    x: 21.0,
    y: 71.5,
    floor: "second",
    color: "amber"
  },

  // --- 5. FILIPINIANA BOTTOM ROW (4 Yellow Boxes) ---
  {
    id: "2f_box_fil_pampanga",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Pampanga & Kapampangan Heritage",
    code: "FIL PAMPANGA",
    subtitle: "Local studies, folklore, and Kapampangan heritage books",
    category: "ddc",
    x: 10.1,
    y: 82.9,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_authors",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Philippine National Authors",
    code: "FIL AUTHORS",
    subtitle: "Rizal, Balagtas, Nick Joaquin, and Filipino classics",
    category: "ddc",
    x: 12.5,
    y: 82.8,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_reference",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Philippine Reference & Bibliography",
    code: "FIL REFERENCE",
    subtitle: "Philippine encyclopedias, bibliographies, atlases",
    category: "ddc",
    x: 15.1,
    y: 82.7,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_rare",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Special Collections & Monographs",
    code: "FIL SPECIAL",
    subtitle: "Curated academic monographs and rare reprints",
    category: "ddc",
    x: 17.4,
    y: 82.8,
    floor: "second",
    color: "amber"
  },

  // --- 6. SECOND FLOOR FACILITIES & SERVICES ---
  {
    id: "2f_box_book_return",
    shelfIDMatch: "Facility_BookReturn",
    label: "Circulation Book Return Drop Box",
    code: "RETURN BOX",
    subtitle: "24/7 drop box for returning borrowed library books",
    category: "service",
    x: 21.0,
    y: 52.3,
    floor: "second",
    color: "cyan"
  },
  {
    id: "2f_box_collab_1",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Collaborative Research Room 1",
    code: "RESEARCH RM 1",
    subtitle: "Equipped group study room for thesis brainstorming",
    category: "facility",
    x: 15.0,
    y: 15.6,
    floor: "second",
    color: "blue"
  },
  {
    id: "2f_box_collab_2",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Collaborative Research Room 2",
    code: "RESEARCH RM 2",
    subtitle: "Group discussion and multimedia research room",
    category: "facility",
    x: 29.6,
    y: 14.6,
    floor: "second",
    color: "blue"
  },
  {
    id: "2f_box_reading_balcony",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Second Floor Reading Area & Balcony",
    code: "READING AREA",
    subtitle: "Spacious study tables overlooking campus scenery",
    category: "facility",
    x: 37.3,
    y: 60.3,
    floor: "second",
    color: "purple"
  },
  {
    id: "2f_box_avr",
    shelfIDMatch: "Shelf_DDC_FIL_Filipiniana",
    label: "Audio Visual Room (AVR)",
    code: "AVR HALL",
    subtitle: "Library orientation lectures and university presentations",
    category: "facility",
    x: 66.4,
    y: 38.5,
    floor: "second",
    color: "blue"
  }
];

interface OfficialFloorPlanMapProps {
  shelves: DDCShelf[];
  selectedShelf: DDCShelf | null;
  onSelectShelf: (shelf: DDCShelf) => void;
  activeFloor: FloorTab;
  onFloorChange: (floor: FloorTab) => void;
  onUpdateHotspotPosition?: (shelfIDMatch: string, pos: { x: number; y: number }) => void;
}

export default function OfficialFloorPlanMap({
  shelves,
  selectedShelf,
  onSelectShelf,
  activeFloor,
  onFloorChange,
  onUpdateHotspotPosition,
}: OfficialFloorPlanMapProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showMarkedOverlay, setShowMarkedOverlay] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<HotspotFilter>("all");
  const [hoveredHotspot, setHoveredHotspot] = useState<HotspotDefinition | null>(null);

  // Lock / Unlock Calibration Mode State
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [localPositions, setLocalPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [draggingHotspotId, setDraggingHotspotId] = useState<string | null>(null);
  const [dragCoords, setDragCoords] = useState<{ x: number; y: number } | null>(null);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // Live Search State
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Precision Directional Nudge Controller (Up, Down, Left, Right)
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [nudgeStep, setNudgeStep] = useState<number>(0.2); // 0.1%, 0.2%, 0.5%, 1.0%

  // Drag calculation refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const hasMovedRef = useRef<boolean>(false);
  const activeHotspotIdRef = useRef<string | null>(null);

  // Load any previously saved custom positions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("libquest_hotspot_positions");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setLocalPositions((prev) => ({ ...parsed, ...prev }));
        }
      }
    } catch {}
  }, []);

  // Find matching DDCShelf from catalog props
  const getMatchingShelf = (hotspot: HotspotDefinition): DDCShelf | undefined => {
    return (
      shelves.find((s) => s.shelfID === hotspot.shelfIDMatch) ||
      shelves.find((s) => s.shelfID.toLowerCase().trim() === hotspot.shelfIDMatch.toLowerCase().trim()) ||
      shelves.find((s) => s.shelfID.includes(hotspot.shelfIDMatch.trim()) || hotspot.shelfIDMatch.includes(s.shelfID.trim()))
    );
  };

  // Resolve current position of a hotspot (Dragging -> Local State -> DDCShelf -> Default Calibrated)
  const getHotspotPos = (hotspot: HotspotDefinition): { x: number; y: number } => {
    if (draggingHotspotId === hotspot.id && dragCoords) {
      return dragCoords;
    }
    if (localPositions[hotspot.id]) {
      return localPositions[hotspot.id];
    }
    const matchedShelf = getMatchingShelf(hotspot);
    if (matchedShelf?.position && typeof matchedShelf.position.x === "number" && typeof matchedShelf.position.y === "number") {
      return matchedShelf.position;
    }
    return { x: hotspot.x, y: hotspot.y };
  };

  // Search Matcher function
  const matchesSearch = (h: HotspotDefinition, query: string): boolean => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const matched = getMatchingShelf(h);
    const code = (matched?.shelfCode || h.code).toLowerCase();
    const title = (matched?.categoryTitle || h.label).toLowerCase();
    const summary = (matched?.generalCollectionSummary || h.subtitle).toLowerCase();
    const id = h.shelfIDMatch.toLowerCase();
    const target = (matched?.targetCollege || "").toLowerCase();
    return code.includes(q) || title.includes(q) || summary.includes(q) || id.includes(q) || target.includes(q);
  };

  // Cross-floor search matches to inform admin if items exist on the other floor
  const otherFloorHotspots = OFFICIAL_HOTSPOTS.filter((h) => h.floor !== activeFloor);
  const otherFloorMatches = searchQuery.trim() 
    ? otherFloorHotspots.filter((h) => matchesSearch(h, searchQuery)) 
    : [];

  // Filter hotspots for active floor, selected category, and search query
  const floorHotspots = OFFICIAL_HOTSPOTS.filter((h) => h.floor === activeFloor);
  const visibleHotspots = floorHotspots.filter((h) => {
    if (filterCategory === "circulation_stacks" && h.category !== "circulation") return false;
    if (filterCategory === "ddc_shelves" && h.category !== "ddc") return false;
    if (filterCategory === "theses" && h.category !== "thesis") return false;
    if (filterCategory === "services" && h.category !== "service" && h.category !== "facility") return false;
    return matchesSearch(h, searchQuery);
  });

  // Sync selectedHotspotId when selectedShelf changes from parent
  useEffect(() => {
    if (selectedShelf) {
      const match = floorHotspots.find(
        (h) => h.shelfIDMatch === selectedShelf.shelfID ||
               h.shelfIDMatch.toLowerCase().trim() === selectedShelf.shelfID.toLowerCase().trim()
      );
      if (match) {
        setSelectedHotspotId(match.id);
      }
    }
  }, [selectedShelf, activeFloor]);

  const handleHotspotClick = (hotspot: HotspotDefinition) => {
    setSelectedHotspotId(hotspot.id);
    const matched = getMatchingShelf(hotspot);
    if (matched) {
      onSelectShelf(matched);
    }
  };

  const isHotspotActive = (hotspot: HotspotDefinition) => {
    if (selectedHotspotId === hotspot.id) return true;
    if (!selectedShelf) return false;
    const matched = getMatchingShelf(hotspot);
    if (matched && matched.shelfID === selectedShelf.shelfID) return true;
    return selectedShelf.shelfID === hotspot.shelfIDMatch ||
           selectedShelf.shelfID.toLowerCase().trim() === hotspot.shelfIDMatch.toLowerCase().trim();
  };

  // Active hotspot for Nudge Controller
  const activeNudgeHotspot = floorHotspots.find((h) => h.id === selectedHotspotId) ||
                             (visibleHotspots.length > 0 ? visibleHotspots[0] : null);
  const activeNudgePos = activeNudgeHotspot ? getHotspotPos(activeNudgeHotspot) : null;
  const activeNudgeMatched = activeNudgeHotspot ? getMatchingShelf(activeNudgeHotspot) : null;
  const activeNudgeCode = activeNudgeMatched?.shelfCode || activeNudgeHotspot?.code || "";
  const activeNudgeTitle = activeNudgeMatched?.categoryTitle || activeNudgeHotspot?.label || "";

  // Directional Nudge handler (Up, Down, Left, Right micro-adjustments)
  const handleNudge = (dx: number, dy: number) => {
    if (!activeNudgeHotspot) return;

    const currentPos = getHotspotPos(activeNudgeHotspot);
    const clampedX = Math.round(Math.min(99.0, Math.max(1.0, currentPos.x + dx)) * 10) / 10;
    const clampedY = Math.round(Math.min(99.0, Math.max(1.0, currentPos.y + dy)) * 10) / 10;
    const newPos = { x: clampedX, y: clampedY };

    setLocalPositions((prev) => ({
      ...prev,
      [activeNudgeHotspot.id]: newPos
    }));

    if (onUpdateHotspotPosition) {
      onUpdateHotspotPosition(activeNudgeHotspot.shelfIDMatch, newPos);
    }

    try {
      const saved = JSON.parse(localStorage.getItem("libquest_hotspot_positions") || "{}");
      saved[activeNudgeHotspot.id] = newPos;
      localStorage.setItem("libquest_hotspot_positions", JSON.stringify(saved));
    } catch {}
  };

  // Keyboard Arrow Keys listener for precision nudging
  useEffect(() => {
    if (isLocked || !activeNudgeHotspot) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName;
      if (targetTag === "INPUT" || targetTag === "TEXTAREA") return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleNudge(0, -nudgeStep);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNudge(0, nudgeStep);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleNudge(-nudgeStep, 0);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNudge(nudgeStep, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocked, activeNudgeHotspot, nudgeStep, localPositions, shelves]);

  // --- Pointer Drag & Drop Handlers ---
  const handlePinPointerDown = (e: React.PointerEvent, hotspot: HotspotDefinition) => {
    if (isLocked) return; // Locked: standard click only

    e.preventDefault();
    e.stopPropagation();

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    activeHotspotIdRef.current = hotspot.id;
    setDraggingHotspotId(hotspot.id);

    const initialPos = getHotspotPos(hotspot);
    setDragCoords(initialPos);
  };

  const handlePinPointerMove = (e: React.PointerEvent, hotspot: HotspotDefinition) => {
    if (isLocked || !isDraggingRef.current || activeHotspotIdRef.current !== hotspot.id) return;
    if (!mapContainerRef.current) return;

    e.preventDefault();
    hasMovedRef.current = true;

    const rect = mapContainerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const rawY = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.round(Math.min(99.0, Math.max(1.0, rawX)) * 10) / 10;
    const clampedY = Math.round(Math.min(99.0, Math.max(1.0, rawY)) * 10) / 10;

    const updatedPos = { x: clampedX, y: clampedY };
    setDragCoords(updatedPos);
    setLocalPositions((prev) => ({
      ...prev,
      [hotspot.id]: updatedPos,
    }));
  };

  const handlePinPointerUp = (e: React.PointerEvent, hotspot: HotspotDefinition) => {
    if (isLocked || activeHotspotIdRef.current !== hotspot.id) return;
    e.preventDefault();

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const finalPos = dragCoords || getHotspotPos(hotspot);
    const didMove = hasMovedRef.current;

    isDraggingRef.current = false;
    hasMovedRef.current = false;
    activeHotspotIdRef.current = null;
    setDraggingHotspotId(null);
    setDragCoords(null);

    if (didMove) {
      if (onUpdateHotspotPosition) {
        onUpdateHotspotPosition(hotspot.shelfIDMatch, finalPos);
      }
      try {
        const saved = JSON.parse(localStorage.getItem("libquest_hotspot_positions") || "{}");
        saved[hotspot.id] = finalPos;
        localStorage.setItem("libquest_hotspot_positions", JSON.stringify(saved));
      } catch {}
    } else {
      handleHotspotClick(hotspot);
    }
  };

  // --- Reset & Export Utilities ---
  const handleResetPositions = () => {
    if (confirm("Ibalik ang lahat ng hotspot pins sa default calibrated yellow box coordinates ng PSAU?")) {
      setLocalPositions({});
      localStorage.removeItem("libquest_hotspot_positions");
      floorHotspots.forEach((h) => {
        if (onUpdateHotspotPosition) {
          onUpdateHotspotPosition(h.shelfIDMatch, { x: h.x, y: h.y });
        }
      });
    }
  };

  const handleCopyCoordinates = () => {
    const currentPositions = visibleHotspots.map((h) => {
      const pos = getHotspotPos(h);
      const matched = getMatchingShelf(h);
      return {
        id: h.id,
        code: matched?.shelfCode || h.code,
        label: matched?.categoryTitle || h.label,
        shelfIDMatch: h.shelfIDMatch,
        x: pos.x,
        y: pos.y,
        floor: h.floor
      };
    });
    navigator.clipboard.writeText(JSON.stringify(currentPositions, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  // Determine which background image to show (marked with user yellow boxes vs clean)
  const getMapImageSrc = () => {
    if (showMarkedOverlay) {
      return activeFloor === "ground" 
        ? "/maps/ground_floor_marked.jpg" 
        : "/maps/second_floor_marked.jpg";
    }
    return activeFloor === "ground" 
      ? "/maps/ground_floor_plan.jpg" 
      : "/maps/second_floor_plan.jpg";
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Control Bar: Floor Tabs, Filters, Overlay Toggle & Zoom */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
        {/* Floor Selection Tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onFloorChange("ground")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeFloor === "ground"
                ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <span>🏢 Ground Floor</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
              activeFloor === "ground" ? "bg-slate-950/20 text-slate-950 font-mono" : "bg-slate-800 text-slate-400"
            }`}>
              Circulation & DDC Stacks
            </span>
          </button>

          <button
            onClick={() => onFloorChange("second")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeFloor === "second"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <span>🏢 Second Floor</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
              activeFloor === "second" ? "bg-slate-950/20 text-slate-950 font-mono" : "bg-slate-800 text-slate-400"
            }`}>
              Filipiniana & Thesis
            </span>
          </button>
        </div>

        {/* Live Hotspot Search Bar */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shelf code, DDC, title (e.g. 500, IT)..."
            className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs text-white placeholder-slate-400 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded"
              title="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Hotspot Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterCategory === "all" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            All Hotspots ({floorHotspots.length})
          </button>

          {activeFloor === "ground" && (
            <>
              <button
                onClick={() => setFilterCategory("circulation_stacks")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === "circulation_stacks" ? "bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30" : "text-slate-400 hover:text-white"
                }`}
              >
                Circulation Stacks
              </button>
              <button
                onClick={() => setFilterCategory("ddc_shelves")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === "ddc_shelves" ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30" : "text-slate-400 hover:text-white"
                }`}
              >
                DDC 000–900
              </button>
            </>
          )}

          {activeFloor === "second" && (
            <>
              <button
                onClick={() => setFilterCategory("ddc_shelves")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === "ddc_shelves" ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30" : "text-slate-400 hover:text-white"
                }`}
              >
                Filipiniana
              </button>
              <button
                onClick={() => setFilterCategory("theses")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === "theses" ? "bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30" : "text-slate-400 hover:text-white"
                }`}
              >
                Thesis Units
              </button>
            </>
          )}

          <button
            onClick={() => setFilterCategory("services")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterCategory === "services" ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Services & OPAC
          </button>
        </div>

        {/* Toggle Yellow Box Markers, Lock/Unlock & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Lock / Unlock Calibration Mode Toggle */}
          <button
            onClick={() => {
              setIsLocked(!isLocked);
              setDraggingHotspotId(null);
              setDragCoords(null);
            }}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
              isLocked
                ? "bg-slate-950 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
                : "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/40 animate-pulse"
            }`}
            title={isLocked ? "I-click para i-unlock at mag-drag ng mga hotspot pin" : "I-click para i-lock ang mga hotspot pin"}
          >
            {isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Locked</span>
                <span className="hidden sm:inline text-[9px] font-normal text-slate-400 bg-slate-800 px-1 py-0.5 rounded">
                  Safe
                </span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                <span>Unlocked</span>
                <span className="hidden sm:inline text-[9px] font-bold bg-slate-950/20 px-1 py-0.5 rounded">
                  Drag & Drop
                </span>
              </>
            )}
          </button>

          {/* Toggle Button for Yellow Boxes Overlay */}
          <button
            onClick={() => setShowMarkedOverlay(!showMarkedOverlay)}
            title="Toggle marked yellow boxes"
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              showMarkedOverlay
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm"
                : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            {showMarkedOverlay ? <Eye className="w-3.5 h-3.5 text-amber-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Yellow Box Guides</span>
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
              disabled={zoomLevel <= 1}
              title="Zoom Out"
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-800"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-semibold px-1 text-slate-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.25))}
              disabled={zoomLevel >= 2.0}
              title="Zoom In"
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-800"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              title="Reset Zoom"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Results Feedback Banner (Visible when searching) */}
      {searchQuery.trim() && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs animate-fade-in shadow-md shadow-cyan-950/20">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Search className="w-3.5 h-3.5" />
            </span>
            <span>
              May <strong className="text-white font-mono">{visibleHotspots.length}</strong> {visibleHotspots.length === 1 ? "hotspot" : "mga hotspot"} na tumugma sa <strong className="text-cyan-300">"{searchQuery}"</strong> sa {activeFloor === "ground" ? "Ground Floor" : "Second Floor"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {otherFloorMatches.length > 0 && (
              <button
                onClick={() => onFloorChange(activeFloor === "ground" ? "second" : "ground")}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[11px] font-bold border border-cyan-500/40 transition-colors shadow-sm"
              >
                <span>Tingnan ang {otherFloorMatches.length} resulta sa {activeFloor === "ground" ? "Second Floor" : "Ground Floor"}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}

            <button
              onClick={() => setSearchQuery("")}
              className="text-slate-400 hover:text-white text-xs underline font-medium"
            >
              I-clear ang Search
            </button>
          </div>
        </div>
      )}

      {/* Calibration Active Sub-Banner (Visible only when UNLOCKED) */}
      {!isLocked && (
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs shadow-lg shadow-amber-950/20 animate-fade-in">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Move className="w-4 h-4 animate-bounce" />
            </span>
            <div>
              <div className="font-extrabold text-amber-300 flex items-center space-x-2">
                <span>🛠️ Calibration Mode Active</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-100 font-mono">
                  Drag & Drop + Nudge D-Pad
                </span>
              </div>
              <p className="text-[11px] text-amber-100/80 mt-0.5">
                I-drag ang pin, o piliin ang pin at gamitin ang <strong>D-Pad / Arrow Keys</strong> para madaling magpantay nang micro-step.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={handleCopyCoordinates}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-200 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors shadow-sm"
              title="Kopyahin ang lahat ng kasalukuyang coordinates bilang JSON"
            >
              {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? "Copied JSON!" : "Copy JSON"}</span>
            </button>

            <button
              onClick={handleResetPositions}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-red-500/30 text-red-300 hover:bg-red-950/40 hover:text-white text-xs font-semibold transition-colors shadow-sm"
              title="Ibalik sa default yellow box coordinates"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => setIsLocked(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-extrabold transition-all shadow-md shadow-emerald-500/20"
            >
              <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Lock Positions</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floor Plan Blueprint Canvas */}
      <div className="relative w-full rounded-3xl bg-[#030712] border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden p-2 sm:p-4">
        {/* Mobile Swipe Notice */}
        <div className="sm:hidden mb-2 text-center text-[10px] text-cyan-400 flex items-center justify-center space-x-1 font-mono">
          <span>👈 Swipe horizontally to pan high-res blueprint 👉</span>
        </div>

        {/* Scrollable Container with Zoom scaling */}
        <div className="w-full overflow-x-auto overflow-y-hidden select-none pb-2">
          <div 
            className="relative mx-auto transition-transform duration-200 origin-top"
            style={{
              width: `${100 * zoomLevel}%`,
              minWidth: "820px",
              maxWidth: zoomLevel === 1 ? "1100px" : "none"
            }}
          >
            {/* The Blueprint Image */}
            <div 
              ref={mapContainerRef}
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-cyan-500/40"
            >
              <img
                src={getMapImageSrc()}
                alt={activeFloor === "ground" ? "Official PSAU Ground Floor Plan" : "Official PSAU Second Floor Plan"}
                className="w-full h-full object-cover block pointer-events-none"
              />

              {/* Holographic Scanline Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
                style={{
                  backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px)`,
                  backgroundSize: "100% 4px"
                }}
              />

              {/* Hotspots Pin Overlay Layer */}
              {visibleHotspots.map((hotspot) => {
                const active = isHotspotActive(hotspot);
                const hovered = hoveredHotspot?.id === hotspot.id;
                const pos = getHotspotPos(hotspot);
                const isDragging = draggingHotspotId === hotspot.id;

                // Dynamically resolve shelf code, title, and summary from live catalog props
                const matchedShelf = getMatchingShelf(hotspot);
                const displayCode = matchedShelf?.shelfCode || hotspot.code;
                const displayTitle = matchedShelf?.categoryTitle || hotspot.label;
                const displaySubtitle = matchedShelf?.generalCollectionSummary || hotspot.subtitle;

                const colorStyles = {
                  teal: "bg-teal-500 text-teal-300 border-teal-300 shadow-teal-500/60 ring-teal-400",
                  amber: "bg-amber-500 text-amber-300 border-amber-300 shadow-amber-500/60 ring-amber-400",
                  cyan: "bg-cyan-500 text-cyan-300 border-cyan-300 shadow-cyan-500/60 ring-cyan-400",
                  emerald: "bg-emerald-500 text-emerald-300 border-emerald-300 shadow-emerald-500/60 ring-emerald-400",
                  blue: "bg-blue-500 text-blue-300 border-blue-300 shadow-blue-500/60 ring-blue-400",
                  purple: "bg-purple-500 text-purple-300 border-purple-300 shadow-purple-500/60 ring-purple-400",
                }[hotspot.color];

                return (
                  <div
                    key={hotspot.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 select-none ${
                      isDragging
                        ? "z-50 cursor-grabbing scale-125"
                        : isLocked
                        ? "z-20 cursor-pointer"
                        : "z-20 cursor-grab hover:scale-110"
                    } ${isDragging ? "transition-none" : "transition-transform"} group`}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      touchAction: isLocked ? "auto" : "none"
                    }}
                    onPointerDown={(e) => handlePinPointerDown(e, hotspot)}
                    onPointerMove={(e) => handlePinPointerMove(e, hotspot)}
                    onPointerUp={(e) => handlePinPointerUp(e, hotspot)}
                    onPointerCancel={(e) => handlePinPointerUp(e, hotspot)}
                    onClick={() => {
                      if (isLocked) {
                        handleHotspotClick(hotspot);
                      }
                    }}
                    onMouseEnter={() => !isDragging && setHoveredHotspot(hotspot)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                  >
                    {/* Live Coordinate HUD Badge (while dragging) */}
                    {isDragging && (
                      <div className="absolute -top-12 px-2.5 py-1 rounded-lg bg-slate-950/95 border-2 border-amber-400 text-white font-mono text-[10px] font-bold shadow-2xl whitespace-nowrap animate-pulse flex items-center space-x-1.5 pointer-events-none z-50">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span>X: {pos.x.toFixed(1)}%</span>
                        <span className="text-slate-500">|</span>
                        <span>Y: {pos.y.toFixed(1)}%</span>
                      </div>
                    )}

                    {/* Glowing Beacon Pin */}
                    <div className="relative flex items-center justify-center">
                      {/* Active Ring Beacon */}
                      {active && (
                        <div className="absolute w-10 h-10 rounded-full border-2 border-cyan-300 animate-ping opacity-75 pointer-events-none" />
                      )}

                      {/* Ripple Beacon */}
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 shadow-lg flex items-center justify-center backdrop-blur-md transition-transform ${
                        isDragging
                          ? "bg-amber-400 text-slate-950 border-white shadow-amber-400 ring-4 ring-amber-400/50"
                          : active 
                          ? "bg-cyan-400 text-slate-950 border-white shadow-cyan-400 ring-4 ring-cyan-400/40 scale-110" 
                          : colorStyles
                      }`}>
                        {isDragging ? (
                          <Move className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                        )}
                      </div>

                      {/* Unlocked Move Indicator Badge on Pin */}
                      {!isLocked && !isDragging && (
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md ring-1 ring-slate-950">
                          <Move className="w-2 h-2 stroke-[3]" />
                        </div>
                      )}

                      {/* Mini Tag Label underneath (dynamically displays DDCShelf.shelfCode) */}
                      <div className={`absolute top-7 sm:top-8 px-2 py-0.5 rounded-md bg-slate-950/90 border text-[8px] sm:text-[9px] font-bold whitespace-nowrap shadow-xl pointer-events-none transition-colors ${
                        isDragging
                          ? "border-amber-400 text-amber-300 font-mono"
                          : "border-slate-700/80 text-white group-hover:border-cyan-400"
                      }`}>
                        {isDragging ? `${pos.x.toFixed(1)}%, ${pos.y.toFixed(1)}%` : displayCode}
                      </div>

                      {/* Tooltip on Hover (when not dragging) */}
                      {hovered && !isDragging && (
                        <div className="absolute bottom-10 px-3 py-2 rounded-xl bg-slate-950/95 border-2 border-cyan-400 text-left text-xs text-white whitespace-nowrap shadow-2xl z-30 pointer-events-none animate-fade-in">
                          <div className="font-extrabold text-cyan-300 text-xs flex items-center space-x-1.5">
                            <span>{displayTitle}</span>
                            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-[9px] uppercase font-mono">
                              {displayCode}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-300 mt-0.5 max-w-[220px] truncate">
                            {displaySubtitle}
                          </div>
                          <div className={`text-[10px] font-semibold mt-1 flex items-center space-x-1 ${
                            isLocked ? "text-teal-400" : "text-amber-300"
                          }`}>
                            <span>{isLocked ? "Click to configure shelf" : `Drag to reposition (${pos.x.toFixed(1)}%, ${pos.y.toFixed(1)}%)`}</span>
                            {isLocked ? <ChevronRight className="w-3 h-3" /> : <Move className="w-3 h-3" />}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Dynamic Alignment Crosshairs for Selected Hotspot (when unlocked) */}
              {!isLocked && activeNudgeHotspot && activeNudgePos && (
                <>
                  <div
                    className="absolute left-0 right-0 border-t border-dashed border-amber-400/40 pointer-events-none z-10 transition-all duration-75"
                    style={{ top: `${activeNudgePos.y}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 border-l border-dashed border-amber-400/40 pointer-events-none z-10 transition-all duration-75"
                    style={{ left: `${activeNudgePos.x}%` }}
                  />
                </>
              )}

              {/* Floating Precision Nudge Controller (D-Pad: Up, Down, Left, Right) */}
              {!isLocked && activeNudgeHotspot && activeNudgePos && (
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 p-3 rounded-2xl bg-slate-950/95 border-2 border-amber-400/90 shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-md text-xs text-white max-w-[270px] animate-fade-in select-none">
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
                    <div className="flex items-center space-x-1.5 min-w-0">
                      <span className="p-1 rounded-lg bg-amber-500/20 text-amber-300">
                        <Crosshair className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-extrabold text-amber-300 text-[11px] truncate">
                          {activeNudgeCode}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          X: <strong className="text-amber-200">{activeNudgePos.x.toFixed(1)}%</strong> | Y: <strong className="text-amber-200">{activeNudgePos.y.toFixed(1)}%</strong>
                        </div>
                      </div>
                    </div>

                    {/* Step Selector */}
                    <div className="flex items-center space-x-0.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[9px] font-mono">
                      {[0.1, 0.2, 0.5, 1.0].map((step) => (
                        <button
                          key={step}
                          onClick={() => setNudgeStep(step)}
                          className={`px-1.5 py-0.5 rounded transition-colors ${
                            nudgeStep === step
                              ? "bg-amber-400 text-slate-950 font-bold"
                              : "text-slate-400 hover:text-white"
                          }`}
                          title={`Step size: ${step}%`}
                        >
                          {step}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* D-Pad Buttons (Up, Down, Left, Right) */}
                  <div className="flex flex-col items-center gap-1 my-1">
                    {/* Up Button */}
                    <button
                      onClick={() => handleNudge(0, -nudgeStep)}
                      className="w-10 h-8 sm:w-11 sm:h-9 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 flex items-center justify-center transition-all active:scale-90 shadow-md"
                      title="Nudge Up (ArrowUp)"
                    >
                      <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {/* Middle Row: Left, Center/Step, Right */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleNudge(-nudgeStep, 0)}
                        className="w-10 h-8 sm:w-11 sm:h-9 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 flex items-center justify-center transition-all active:scale-90 shadow-md"
                        title="Nudge Left (ArrowLeft)"
                      >
                        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      <div className="w-10 h-8 sm:w-11 sm:h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-[10px]">
                        ±{nudgeStep}%
                      </div>

                      <button
                        onClick={() => handleNudge(nudgeStep, 0)}
                        className="w-10 h-8 sm:w-11 sm:h-9 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 flex items-center justify-center transition-all active:scale-90 shadow-md"
                        title="Nudge Right (ArrowRight)"
                      >
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>

                    {/* Down Button */}
                    <button
                      onClick={() => handleNudge(0, nudgeStep)}
                      className="w-10 h-8 sm:w-11 sm:h-9 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 flex items-center justify-center transition-all active:scale-90 shadow-md"
                      title="Nudge Down (ArrowDown)"
                    >
                      <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Keyboard Shortcut Hint */}
                  <div className="mt-2 text-center text-[9px] text-slate-400 flex items-center justify-center space-x-1">
                    <span>⌨️ Pwede ring pindutin ang Arrow Keys!</span>
                  </div>
                </div>
              )}

              {/* Empty Search Results Overlay */}
              {visibleHotspots.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-sm z-30 p-6 text-center animate-fade-in">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
                    <Search className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-bold text-white">
                    Walang nahanap na hotspot para sa "{searchQuery}"
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Subukan mag-search ng ibang keyword gaya ng "000", "500", "IT", o "Thesis".
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    {otherFloorMatches.length > 0 && (
                      <button
                        onClick={() => onFloorChange(activeFloor === "ground" ? "second" : "ground")}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-md"
                      >
                        Tingnan sa {activeFloor === "ground" ? "Second Floor" : "Ground Floor"} ({otherFloorMatches.length})
                      </button>
                    )}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-700 transition-colors"
                    >
                      I-reset ang Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Shelf Quick Status Banner */}
      {selectedShelf && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-900 border border-cyan-500/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in shadow-lg shadow-cyan-950/30">
          <div className="flex items-start sm:items-center space-x-3">
            <span className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                  {selectedShelf.shelfCode}
                </span>
                <span className="text-white font-extrabold text-sm">
                  {selectedShelf.categoryTitle}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  (Floor: <strong className="text-cyan-400">{selectedShelf.floor}</strong>)
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                {selectedShelf.generalCollectionSummary}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto flex-shrink-0">
            <button
              onClick={() => onSelectShelf(selectedShelf)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm"
            >
              <span>Edit Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
