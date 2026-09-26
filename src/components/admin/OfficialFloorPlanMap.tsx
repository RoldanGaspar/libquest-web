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

export type FloorTab = "ground" | "second" | "third";
export type HotspotFilter = "all" | "circulation_stacks" | "ddc_shelves" | "theses" | "services";

export interface HotspotDefinition {
  id: string;
  shelfIDMatch: string; // Exact match or primary key in DDCShelf.shelfID
  label: string;
  code: string;
  subtitle: string;
  category: "circulation" | "ddc" | "thesis" | "service" | "facility";
  x: number; // percentage 0 to 100
  y: number; // percentage 0 to 100
  floor: FloorTab;
  color: "teal" | "emerald" | "amber" | "cyan" | "purple" | "blue";
}

// Exactly calibrated positions derived from 3D library objects and floor plan blueprints
export const OFFICIAL_HOTSPOTS: HotspotDefinition[] = [
  // =========================================================================
  // GROUND FLOOR HOTSPOTS (18 Objects)
  // =========================================================================
  {
    id: "gf_box_ddc_000_cs",
    shelfIDMatch: "00.01 - 320.99 to 321.00 - 424.99",
    label: "General Works, Philosophy, Religion & Social Sciences",
    code: "00.01 - 320.99 to 321.00 - 424.99",
    subtitle: "DDC 000–424: Computer Science, Philosophy, Religion, Social Sciences",
    category: "ddc",
    x: 12.4,
    y: 16.2,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_500_pure_sci",
    shelfIDMatch: "425.00 - 550.00 to 550.01 - 612.00",
    label: "Languages, Pure Sciences & Early Applied Sciences",
    code: "425.00 - 550.00 to 550.01 - 612.00",
    subtitle: "DDC 425–612: Linguistics, Math, Physics, Chemistry, Biology, Physiology",
    category: "ddc",
    x: 16.4,
    y: 16.2,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_600_agri",
    shelfIDMatch: "612.01 - 631.29 to 631.30 - 634.69",
    label: "Medical Sciences, Engineering & Crop Agriculture",
    code: "612.01 - 631.29 to 631.30 - 634.69",
    subtitle: "DDC 612–634: Medicine, Engineering, Agronomy, Soil Science, Crops",
    category: "ddc",
    x: 20.5,
    y: 16.2,
    floor: "ground",
    color: "emerald"
  },
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
    shelfIDMatch: "TEN YEARS RECENCY B",
    label: "Ten Years Recency (Stack B)",
    code: "10-YR RECENCY (B)",
    subtitle: "Curriculum textbooks published within the last 10 years (Part 2)",
    category: "circulation",
    x: 25.8,
    y: 55.8,
    floor: "ground",
    color: "teal"
  },
  {
    id: "gf_box_recency_a",
    shelfIDMatch: "TEN YEARS RECENCY A",
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
    id: "gf_box_ddc_634_hort",
    shelfIDMatch: "634.70 - 636.29 to 636.30 - 658.09",
    label: "Horticulture, Animal Husbandry & Commercial Tech",
    code: "634.70 - 636.29 to 636.30 - 658.09",
    subtitle: "DDC 634–658: Forestry, Animal Breeding, Vet Care, Commerce",
    category: "ddc",
    x: 10.6,
    y: 53.9,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_658_mgmt",
    shelfIDMatch: "658.10 - 658.79",
    label: "Business Administration & Management",
    code: "658.10 - 658.79",
    subtitle: "DDC 658: Corporate organization, financial management, executive ops",
    category: "ddc",
    x: 10.6,
    y: 67.9,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_658_chem",
    shelfIDMatch: "658.10 - 699.99",
    label: "Applied Management, Chemical Tech & Manufacturing",
    code: "658.10 - 699.99",
    subtitle: "DDC 658–699: Chemical technology, manufacturing, building construction",
    category: "ddc",
    x: 10.6,
    y: 48.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_700_arts",
    shelfIDMatch: "700.00 - 807.99",
    label: "The Arts, Recreation & World Literature Stacks",
    code: "700.00 - 807.99",
    subtitle: "DDC 700–807: Visual arts, architecture, music, recreation, literary theory",
    category: "ddc",
    x: 15.2,
    y: 70.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_800_lit",
    shelfIDMatch: "808.00 - 808.819",
    label: "Rhetoric, Literary Composition & Poetry Anthologies",
    code: "808.00 - 808.819",
    subtitle: "DDC 808: Creative writing, rhetoric, speech, poetry anthologies",
    category: "ddc",
    x: 20.6,
    y: 70.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_ddc_900_hist",
    shelfIDMatch: "808.82 - 939.99",
    label: "Drama, World Literature & Ancient World History",
    code: "808.82 - 939.99",
    subtitle: "DDC 808–939: International drama, travel, biographies, ancient history",
    category: "ddc",
    x: 25.4,
    y: 70.4,
    floor: "ground",
    color: "emerald"
  },
  {
    id: "gf_box_fiction_1",
    shelfIDMatch: "Fiction 1",
    label: "Fiction & Novels (Authors A–H)",
    code: "FICTION 1",
    subtitle: "Novels, contemporary fiction, literary prose (Authors A–H)",
    category: "circulation",
    x: 6.0,
    y: 47.4,
    floor: "ground",
    color: "teal"
  },
  {
    id: "gf_box_fiction_2",
    shelfIDMatch: "Fiction 2",
    label: "Fiction & Literature (Authors I–P)",
    code: "FICTION 2",
    subtitle: "International bestsellers, novels (Authors I–P)",
    category: "circulation",
    x: 6.0,
    y: 56.4,
    floor: "ground",
    color: "teal"
  },
  {
    id: "gf_box_fiction_3",
    shelfIDMatch: "Fiction 3",
    label: "Classic Literature (Authors Q–Z)",
    code: "FICTION 3",
    subtitle: "Classic literature, anthologies, novels (Authors Q–Z)",
    category: "circulation",
    x: 6.0,
    y: 66.8,
    floor: "ground",
    color: "teal"
  },
  {
    id: "gf_box_opac",
    shelfIDMatch: "OPAC TERMINAL ",
    label: "OPAC Search Terminals",
    code: "OPAC TERMINAL",
    subtitle: "Digital public catalog terminals for book call numbers and locations",
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
    subtitle: "Designated student baggage deposit bin at room entrance",
    category: "service",
    x: 39.1,
    y: 69.0,
    floor: "ground",
    color: "cyan"
  },

  // =========================================================================
  // SECOND FLOOR HOTSPOTS (28 Objects)
  // =========================================================================
  {
    id: "2f_box_book_return",
    shelfIDMatch: "Facility_BookReturn",
    label: "Circulation Book Return Station",
    code: "RETURN BOX",
    subtitle: "Drop box for returning borrowed library books (₱5.00/day overdue penalty)",
    category: "service",
    x: 21.0,
    y: 52.3,
    floor: "second",
    color: "cyan"
  },

  // --- THESIS SECTION (Shelving Units 01–13) ---
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
    shelfIDMatch: "SHELVING UNIT 02 BS BIOLOGY UNDERGRADUATE THESIS (UT) & BS FISHERIES UNDERGRADUATE THESIS (UT)",
    label: "BS Biology & Fisheries (UT)",
    code: "THESIS UNIT 02",
    subtitle: "Aquatic biodiversity, marine ecology, and biological sciences theses",
    category: "thesis",
    x: 23.7,
    y: 35.8,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_03",
    shelfIDMatch: "SHELVING UNIT 03 BS AGRICULTURAL BUSINESS UNDERGRADUATE THESIS (UT)  SPECIAL PROBLEM (SP)",
    label: "BS Agricultural Business (UT / SP)",
    code: "THESIS UNIT 03",
    subtitle: "Agricultural business value chain & economic special problems",
    category: "thesis",
    x: 28.0,
    y: 35.8,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_04",
    shelfIDMatch: "SHELVING UNIT 04 BS INFORMATION TECHNOLOGY UNDERGRADUATE THESIS (UT)  CAPSTONE PROJECT (CP)",
    label: "BS Information Technology (UT / CP)",
    code: "THESIS UNIT 04",
    subtitle: "Software engineering, capstone projects, and IT systems documentation",
    category: "thesis",
    x: 16.5,
    y: 46.2,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_05",
    shelfIDMatch: "SHELVING UNIT 05 BSA ANIMAL SCIENCE UNDERGRADUATE THESIS (UT)  FARM PRACTICES (FP)",
    label: "BSA Animal Science (UT / FP - Vol 1)",
    code: "THESIS UNIT 05",
    subtitle: "Livestock management, swine breeding, and poultry farm practices",
    category: "thesis",
    x: 21.3,
    y: 46.2,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_06",
    shelfIDMatch: "SHELVING UNIT 06 BSA ANIMAL SCIENCE UNDERGRADUATE THESIS (UT) FARM PRACTICES (FP)",
    label: "BSA Animal Science (UT / FP - Vol 2)",
    code: "THESIS UNIT 06",
    subtitle: "Animal nutrition, breeding experiments, and livestock research",
    category: "thesis",
    x: 25.0,
    y: 46.2,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_07",
    shelfIDMatch: "SHELVING UNIT 07 BSA ANIMAL SCIENCE FARM PRACTICES (FP), BSA MATHEMATICS UNDERGRADUATE THESIS (UT), BSA AGROFORESTRY UNDERGRADUATE THESIS (UT) FIELD PRACTICUM (FP)",
    label: "Animal Sci / Math / Agroforestry (UT / FP)",
    code: "THESIS UNIT 07",
    subtitle: "Interdisciplinary agriculture, mathematics, and agroforestry field practicums",
    category: "thesis",
    x: 16.5,
    y: 53.0,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_08",
    shelfIDMatch: "SHELVING UNIT 08 BS DEVELOPEMTN COMMUNICATION UNDERGRADAUTE THESIS (UT), BS FORESTRY UNDERGRADUATE THESIS (UT)",
    label: "BS DevComm & BS Forestry (UT)",
    code: "THESIS UNIT 08",
    subtitle: "Community extension, development communication, and forestry theses",
    category: "thesis",
    x: 21.3,
    y: 53.0,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_09",
    shelfIDMatch: "SHELVING UNIT 09 BS HOSPITALITY MANAGEMENT PRACTICUM REPORT (PR)",
    label: "BS Hospitality Management (PR - Vol 1)",
    code: "THESIS UNIT 09",
    subtitle: "Practicum and terminal industry training in hotel & restaurant operations",
    category: "thesis",
    x: 25.0,
    y: 53.0,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_10",
    shelfIDMatch: "SHELVING UNIT 10 BS HOSPITALITY MANAGEMENT PRACTICUM REPORT (PR) UNDERGRADAUTE THESIS REASEARCH PAPER (PR)",
    label: "BS Hospitality Management (PR / UT - Vol 2)",
    code: "THESIS UNIT 10",
    subtitle: "Advanced undergraduate research papers on hospitality and food service",
    category: "thesis",
    x: 29.8,
    y: 53.0,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_11",
    shelfIDMatch: "SHELVING UNIT 11 BAELS UNDERGRADAUTE THESIS (UT), BS GEODETIC ENGINEERING UNDERGRADUATE THESIS (UT)",
    label: "BAELS & BS Geodetic Engineering (UT)",
    code: "THESIS UNIT 11",
    subtitle: "English language discourse analysis and geodetic surveying theses",
    category: "thesis",
    x: 16.5,
    y: 59.5,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_12",
    shelfIDMatch: "SHELVING UNIT 12 BSA ABE UNDERGRADAUTE THESIS (UT)",
    label: "BS Agricultural & Biosystems Engineering (UT)",
    code: "THESIS UNIT 12",
    subtitle: "Agricultural mechanization, post-harvest engineering, and renewable energy",
    category: "thesis",
    x: 21.3,
    y: 59.5,
    floor: "second",
    color: "teal"
  },
  {
    id: "2f_box_thesis_13",
    shelfIDMatch: "SHELVING UNIT 13 BS CROP SCIENCE UNDERGRADAUTE THESIS (UT) FARM PRACTICES (FP), BS AGRICULTURE UNDERGRADUATE THESIS (UT)",
    label: "BS Crop Science & Agriculture (UT / FP)",
    code: "THESIS UNIT 13",
    subtitle: "Agronomy, pest management, and crop breeding research papers",
    category: "thesis",
    x: 29.8,
    y: 46.2,
    floor: "second",
    color: "teal"
  },

  // --- FILIPINIANA & SPECIAL STACKS ---
  {
    id: "2f_box_fil_01",
    shelfIDMatch: "SHELVING UNIT 01: FIL 001.3 — FIL 304.6",
    label: "Filipiniana: Generalities to Social Groups",
    code: "FIL 001.3 — FIL 304.6",
    subtitle: "Philippine research, humanities, and sociological studies",
    category: "ddc",
    x: 21.0,
    y: 64.3,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_02",
    shelfIDMatch: "SHELVING UNIT 02: FIL 305.3 — FIL 338.16",
    label: "Filipiniana: Social Structure & Agrarian Economics",
    code: "FIL 305.3 — FIL 338.16",
    subtitle: "Philippine gender studies and agricultural economics",
    category: "ddc",
    x: 21.0,
    y: 71.5,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_03",
    shelfIDMatch: "SHELVING UNIT 03: FIL 338.4 — FIL 371.10",
    label: "Filipiniana: Philippine Industry & Education",
    code: "FIL 338.4 — FIL 371.10",
    subtitle: "Philippine economic industries, labor laws, and education",
    category: "ddc",
    x: 21.0,
    y: 78.0,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_04",
    shelfIDMatch: "SHELVING UNIT 04: FIL 371.27 — FIL 428",
    label: "Filipiniana: Educational Assessment & Tagalog Linguistics",
    code: "FIL 371.27 — FIL 428",
    subtitle: "School administration, educational testing, Filipino language",
    category: "ddc",
    x: 21.0,
    y: 84.0,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_05",
    shelfIDMatch: "SHELVING UNIT 05: FIL 428 — FIL 574.07",
    label: "Filipiniana: Philippine Languages & Local Flora/Fauna",
    code: "FIL 428 — FIL 574.07",
    subtitle: "Philippine linguistics, mathematics, and biodiversity",
    category: "ddc",
    x: 10.1,
    y: 82.9,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_06",
    shelfIDMatch: "SHELVING UNIT 06: FIL 574.88 — FIL 630",
    label: "Filipiniana: Philippine Biology & Tropical Agriculture",
    code: "FIL 574.88 — FIL 630",
    subtitle: "Tropical ecosystems, Philippine medicinal plants, agriculture",
    category: "ddc",
    x: 12.5,
    y: 82.8,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_07",
    shelfIDMatch: "SHELVING UNIT 07: FIL 630 — FIL 633.18",
    label: "Filipiniana: Philippine Rice Farming & Crop Production",
    code: "FIL 630 — FIL 633.18",
    subtitle: "Philippine rice farming (Palay), irrigation, field crops",
    category: "ddc",
    x: 15.1,
    y: 82.7,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_08",
    shelfIDMatch: "SHELVING UNIT 08: FIL 633.18 — FIL 693.3",
    label: "Filipiniana: Livestock, Fisheries & Applied Philippine Tech",
    code: "FIL 633.18 — FIL 693.3",
    subtitle: "Philippine animal husbandry, aquaculture, culinary arts",
    category: "ddc",
    x: 17.4,
    y: 82.8,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_09",
    shelfIDMatch: "SHELVING UNIT 09: FIL 641.33 — FIL 659.1",
    label: "Filipiniana: Philippine Commerce, Accounting & Marketing",
    code: "FIL 641.33 — FIL 659.1",
    subtitle: "Filipino entrepreneurship, accounting, business marketing",
    category: "ddc",
    x: 10.1,
    y: 90.0,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_10",
    shelfIDMatch: "SHELVING UNIT 10: FIL 660.6 — FIL 808.84",
    label: "Filipiniana: Philippine Arts & Literature Anthologies",
    code: "FIL 660.6 — FIL 808.84",
    subtitle: "Philippine art history, music, film, folk traditions",
    category: "ddc",
    x: 12.5,
    y: 90.0,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_11",
    shelfIDMatch: "SHELVING UNIT 11: FIL 808.85 — FIL 899.9",
    label: "Filipiniana: Tagalog & Kapampangan Literary Works",
    code: "FIL 808.85 — FIL 899.9",
    subtitle: "Kapampangan poetry, plays, contemporary Philippine novels",
    category: "ddc",
    x: 15.1,
    y: 90.0,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_fil_12",
    shelfIDMatch: "SHELVING UNIT 12: FIL 900 — FIL 920",
    label: "Filipiniana: Philippine History & Provincial Biographies",
    code: "FIL 900 — FIL 920",
    subtitle: "General Philippine history, chronicles, hero biographies",
    category: "ddc",
    x: 17.4,
    y: 90.0,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_rizaliana",
    shelfIDMatch: "RIZALIANA: FIL 920 — FIL 959",
    label: "Rizaliana Collection & Local Heritage",
    code: "RIZALIANA: FIL 920 — FIL 959",
    subtitle: "Life and works of Dr. Jose Rizal and Pampanga historical records",
    category: "ddc",
    x: 21.0,
    y: 90.0,
    floor: "second",
    color: "amber"
  },
  {
    id: "2f_box_recency",
    shelfIDMatch: "SPECIAL SECTION: TEN YEARS RECENCY",
    label: "Second Floor 10-Years Recency Special Stacks",
    code: "SPECIAL: 10-YR RECENCY",
    subtitle: "Recent acquisitions and reference textbooks in Filipiniana",
    category: "circulation",
    x: 11.5,
    y: 41.1,
    floor: "second",
    color: "teal"
  },

  // =========================================================================
  // THIRD FLOOR HOTSPOTS (8 Objects)
  // =========================================================================
  {
    id: "3f_box_admin_desk",
    shelfIDMatch: "Facility_AdminInfoDesk",
    label: "Admin & Information Desk (OLM)",
    code: "ADMIN & INFO DESK",
    subtitle: "Office of the Library Director Sharon G. Rulloda",
    category: "facility",
    x: 48.0,
    y: 35.0,
    floor: "third",
    color: "blue"
  },
  {
    id: "3f_box_ref_1",
    shelfIDMatch: "SHELVE REF 1",
    label: "General Reference: Dictionaries & Encyclopedias",
    code: "REF SHELF 1",
    subtitle: "General encyclopedias, multilingual dictionaries, biographical references",
    category: "ddc",
    x: 18.0,
    y: 40.0,
    floor: "third",
    color: "purple"
  },
  {
    id: "3f_box_ref_2",
    shelfIDMatch: "SHELVE REF 2",
    label: "Scientific & Technical Reference Handbooks",
    code: "REF SHELF 2",
    subtitle: "Engineering handbooks, science compendiums, environmental data",
    category: "ddc",
    x: 22.0,
    y: 40.0,
    floor: "third",
    color: "purple"
  },
  {
    id: "3f_box_ref_3",
    shelfIDMatch: "SHELVE REF 3",
    label: "Agricultural & Biological Reference Manuals",
    code: "REF SHELF 3",
    subtitle: "Veterinary medicine, botany, crop science, and agricultural encyclopedias",
    category: "ddc",
    x: 26.0,
    y: 40.0,
    floor: "third",
    color: "purple"
  },
  {
    id: "3f_box_ref_4",
    shelfIDMatch: "SHELVE REF 4",
    label: "Social Sciences, Law & Statistical Yearbooks",
    code: "REF SHELF 4",
    subtitle: "Philippine statistics, legal codes, education directories",
    category: "ddc",
    x: 18.0,
    y: 55.0,
    floor: "third",
    color: "purple"
  },
  {
    id: "3f_box_ref_5",
    shelfIDMatch: "SHELVE REF 5",
    label: "Atlases, Gazetteers & Geographic Indices",
    code: "REF SHELF 5",
    subtitle: "World atlases, Philippine maps, gazetteers, topographical surveys",
    category: "ddc",
    x: 22.0,
    y: 55.0,
    floor: "third",
    color: "purple"
  },
  {
    id: "3f_box_periodicals",
    shelfIDMatch: "Shelf_REF_ReferencePeriodicals",
    label: "Bound Periodicals & Academic Journals",
    code: "PERIODICALS & SERIALS",
    subtitle: "Peer-reviewed research journals, bulletins, and magazines",
    category: "ddc",
    x: 28.0,
    y: 55.0,
    floor: "third",
    color: "purple"
  },
  {
    id: "3f_box_reading_area",
    shelfIDMatch: "READING AREA",
    label: "Third Floor Quiet Study & Reading Zone",
    code: "QUIET STUDY AREA",
    subtitle: "Spacious individual study carrels and silent research zone",
    category: "facility",
    x: 45.0,
    y: 65.0,
    floor: "third",
    color: "purple"
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
    if (activeFloor === "ground") {
      return showMarkedOverlay ? "/maps/ground_floor_marked.jpg" : "/maps/ground_floor_plan.jpg";
    } else if (activeFloor === "second") {
      return showMarkedOverlay ? "/maps/second_floor_marked.jpg" : "/maps/second_floor_plan.jpg";
    } else {
      // Third Floor Prototype (Uses upper floor architectural blueprint)
      return "/maps/second_floor_plan.jpg";
    }
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
              Circulation & DDC
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
              Filipiniana & Theses
            </span>
          </button>

          <button
            onClick={() => onFloorChange("third")}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeFloor === "third"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-slate-950 shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <span>🏢 Third Floor</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
              activeFloor === "third" ? "bg-slate-950/20 text-slate-950 font-mono" : "bg-slate-800 text-slate-400"
            }`}>
              Reference & Periodicals
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

          {activeFloor === "third" && (
            <>
              <button
                onClick={() => setFilterCategory("ddc_shelves")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterCategory === "ddc_shelves" ? "bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30" : "text-slate-400 hover:text-white"
                }`}
              >
                Reference & Periodicals
              </button>
            </>
          )}

          <button
            onClick={() => setFilterCategory("services")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterCategory === "services" ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            {activeFloor === "third" ? "Admin & Reading Area" : "Services & Facilities"}
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
              May <strong className="text-white font-mono">{visibleHotspots.length}</strong> {visibleHotspots.length === 1 ? "hotspot" : "mga hotspot"} na tumugma sa <strong className="text-cyan-300">"{searchQuery}"</strong> sa {activeFloor === "ground" ? "Ground Floor" : activeFloor === "second" ? "Second Floor" : "Third Floor"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {otherFloorMatches.length > 0 && (
              <button
                onClick={() => onFloorChange(otherFloorMatches[0].floor)}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[11px] font-bold border border-cyan-500/40 transition-colors shadow-sm"
              >
                <span>Tingnan ang {otherFloorMatches.length} resulta sa {otherFloorMatches[0].floor === "ground" ? "Ground Floor" : otherFloorMatches[0].floor === "second" ? "Second Floor" : "Third Floor"}</span>
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
                        onClick={() => onFloorChange(otherFloorMatches[0].floor)}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-md"
                      >
                        Tingnan sa {otherFloorMatches[0].floor === "ground" ? "Ground Floor" : otherFloorMatches[0].floor === "second" ? "Second Floor" : "Third Floor"} ({otherFloorMatches.length})
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
