"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DDCShelf, DDCShelfCatalog } from "@/types/shelf";
import { INITIAL_DDC_SHELVES } from "@/lib/ddcDefaults";
import OfficialFloorPlanMap, { FloorTab } from "@/components/admin/OfficialFloorPlanMap";
import { 
  BookMarked, 
  Edit3, 
  Save, 
  Check, 
  Loader2, 
  Eye, 
  Layers, 
  Sparkles,
  MapPin,
  HelpCircle,
  RotateCcw,
  X,
  Compass,
  LayoutGrid,
  Map as MapIcon,
  Search,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  Upload,
  FileSpreadsheet,
  FileText,
  ListPlus
} from "lucide-react";

type ViewMode = "map" | "list";

export interface SectionData {
  title: string;
  items: string[];
}

export const DDC_CLASS_PRESETS = [
  {
    code: "000",
    label: "000 – GENERALITIES & INFORMATION",
    defaultItems: [
      "010 Bibliography",
      "020 Library & Information Sciences",
      "030 General Encyclopedic works",
      "050 General serials & their indexes",
      "060 General organizations & Museology",
      "070 News media, journalism, publishing"
    ]
  },
  {
    code: "100",
    label: "100 – PHILOSOPHY & PSYCHOLOGY",
    defaultItems: [
      "110 Metaphysics",
      "120 Epistemology, causation, humankind",
      "130 Paranormal phenomena",
      "140 Specific Philosophical Schools",
      "150 Psychology",
      "160 Logic",
      "170 Ethics (Moral Philosophy)"
    ]
  },
  {
    code: "200",
    label: "200 – RELIGION",
    defaultItems: [
      "210 Philosophy & theory of religion",
      "220 Bible",
      "230 Christianity & Christian theology",
      "240 Christian practice & observance",
      "290 Other religions & comparative religion"
    ]
  },
  {
    code: "300",
    label: "300 – SOCIAL SCIENCES",
    defaultItems: [
      "310 Collections of general statistics",
      "320 Political science (Politics & Gov)",
      "330 Economics",
      "340 Law",
      "350 Public administration & military",
      "360 Social problems & services",
      "370 Education",
      "380 Commerce, communications, transport",
      "390 Customs, etiquette, folklore"
    ]
  },
  {
    code: "400",
    label: "400 – LANGUAGE",
    defaultItems: [
      "410 Linguistics",
      "420 English & Old English",
      "430 Germanic languages; German",
      "440 Romance languages; French",
      "450 Italian, Romanian, Rhaeto-Romantic",
      "460 Spanish & Portuguese languages",
      "490 Other languages (Filipino / Tagalog)"
    ]
  },
  {
    code: "500",
    label: "500 – NATURAL SCIENCES & MATHEMATICS",
    defaultItems: [
      "510 Mathematics",
      "520 Astronomy & allied sciences",
      "530 Physics",
      "540 Chemistry & allied sciences",
      "550 Earth sciences",
      "560 Paleontology; Paleozoology",
      "570 Life sciences; Biology",
      "580 Plants (Botany)",
      "590 Animals (Zoology)"
    ]
  },
  {
    code: "600",
    label: "600 – TECHNOLOGY & APPLIED SCIENCES",
    defaultItems: [
      "610 Medical sciences; Medicine",
      "620 Engineering & allied operations",
      "630 Agriculture (Agronomy, Crops, Animal husbandry)",
      "640 Home economics & family living",
      "650 Management & auxiliary services",
      "660 Chemical engineering",
      "670 Manufacturing",
      "690 Buildings"
    ]
  },
  {
    code: "700",
    label: "700 – THE ARTS & RECREATION",
    defaultItems: [
      "710 Civic & Landscape art",
      "720 Architecture",
      "730 Plastic arts; Sculpture",
      "740 Drawing & Decorative arts",
      "750 Painting & paintings",
      "760 Graphic arts; Printmaking",
      "770 Photography & photographs",
      "780 Music",
      "790 Recreation & Performing arts"
    ]
  },
  {
    code: "800",
    label: "800 – LITERATURE & RHETORIC",
    defaultItems: [
      "810 American literature in English",
      "820 English & Old English literatures",
      "830 Literatures of Germanic languages",
      "840 Literatures of Romance languages",
      "860 Spanish & Portuguese literatures",
      "890 Literatures of other languages (Philippine Literature)"
    ]
  },
  {
    code: "900",
    label: "900 – GEOGRAPHY & HISTORY",
    defaultItems: [
      "910 Geography & travel",
      "920 Biography, genealogy, insignia",
      "930 History of Ancient World to c.499",
      "940 Gen. history of Europe",
      "950 Gen. history of Asia; Far East (Philippine History)",
      "960 Gen. history of Africa",
      "970 Gen. history of North America",
      "980 Gen. history of South America"
    ]
  }
];

function escapeCSVField(str: string | undefined | null): string {
  if (str === null || str === undefined) return '""';
  const val = String(str);
  if (val.includes('"') || val.includes(',') || val.includes('\n') || val.includes('\r')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return `"${val}"`;
}

export function exportShelvesToCSV(shelves: DDCShelf[]): string {
  const headers = [
    "shelfID",
    "shelfCode",
    "categoryTitle",
    "floor",
    "targetCollege",
    "generalCollectionSummary",
    "studentGuidance",
    "subdivisions"
  ];
  
  const rows = shelves.map((s) => [
    escapeCSVField(s.shelfID),
    escapeCSVField(s.shelfCode),
    escapeCSVField(s.categoryTitle),
    escapeCSVField(s.floor),
    escapeCSVField(s.targetCollege),
    escapeCSVField(s.generalCollectionSummary),
    escapeCSVField(s.studentGuidance),
    escapeCSVField((s.subdivisions || []).join("\n"))
  ].join(","));

  return [headers.join(","), ...rows].join("\r\n");
}

export function parseCSV(csvText: string): Record<string, string>[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (insideQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i++; // skip escaped quote
        } else {
          insideQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField);
        currentField = "";
      } else if (char === '\r') {
        if (nextChar === '\n') i++;
        currentRow.push(currentField);
        currentField = "";
        if (currentRow.length > 0 && currentRow.some((f) => f.trim().length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
      } else if (char === '\n') {
        currentRow.push(currentField);
        currentField = "";
        if (currentRow.length > 0 && currentRow.some((f) => f.trim().length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
      } else {
        currentField += char;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some((f) => f.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim().replace(/^["']|["']$/g, ""));
  const data: Record<string, string>[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const obj: Record<string, string> = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c] !== undefined ? row[c] : "";
    }
    data.push(obj);
  }

  return data;
}

export function parseSubdivisionSections(subs: string[] = []): SectionData[] {
  const sections: SectionData[] = [];
  let currentTitle = "";
  let currentItems: string[] = [];

  for (const line of subs) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      if (currentTitle || currentItems.length > 0) {
        sections.push({ title: currentTitle, items: currentItems });
      }
      currentTitle = trimmed.slice(1, -1).trim();
      currentItems = [];
    } else {
      currentItems.push(trimmed);
    }
  }

  if (currentTitle || currentItems.length > 0) {
    sections.push({ title: currentTitle, items: currentItems });
  }

  return sections;
}

export function serializeSubdivisionSections(sections: SectionData[]): string[] {
  const result: string[] = [];
  for (const sec of sections) {
    if (sec.title) {
      result.push(`[${sec.title.trim()}]`);
    }
    for (const itm of sec.items) {
      if (itm.trim()) result.push(itm.trim());
    }
  }
  return result;
}

export default function DDCShelfManagerPage() {
  const [shelves, setShelves] = useState<DDCShelf[]>(INITIAL_DDC_SHELVES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [activeFloor, setActiveFloor] = useState<FloorTab>("ground");
  const [selectedShelf, setSelectedShelf] = useState<DDCShelf | null>(null);

  // Search & Filter for List View
  const [searchQuery, setSearchQuery] = useState("");
  const [floorFilter, setFloorFilter] = useState<"all" | "ground" | "second" | "third">("all");

  // Editing & Preview state
  const [editingShelf, setEditingShelf] = useState<DDCShelf | null>(null);
  const [previewShelf, setPreviewShelf] = useState<DDCShelf | null>(null);
  const [activeSectionTab, setActiveSectionTab] = useState(0);
  const [useRawEditor, setUseRawEditor] = useState(false);
  const [previewPageIndex, setPreviewPageIndex] = useState(0);

  // Item-by-item topic input & tab presets state
  const [newTopicInput, setNewTopicInput] = useState("");
  const [activeItemEditMode, setActiveItemEditMode] = useState<"list" | "bulk">("list");
  const [bulkTextDraft, setBulkTextDraft] = useState("");
  const [showAddTabMenu, setShowAddTabMenu] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadShelvesCatalog() {
      try {
        const catalogRef = doc(db, "catalogs", "ddc_shelves");
        const snap = await getDoc(catalogRef);
        if (snap.exists()) {
          const data = snap.data() as DDCShelfCatalog;
          if (data.shelves && Array.isArray(data.shelves)) {
            // Reconcile with INITIAL_DDC_SHELVES so all 54 PSAU 3D objects are available,
            // while preserving any custom changes already published to Firestore.
            const shelfMap = new Map<string, DDCShelf>();
            const hasBracketedHeaders = (subs?: string[]) =>
              Array.isArray(subs) && subs.some((s) => typeof s === "string" && s.trim().startsWith("[") && s.trim().endsWith("]"));

            data.shelves.forEach((custom) => {
              if (custom && custom.shelfID && shelfMap.has(custom.shelfID)) {
                const defaultShelf = shelfMap.get(custom.shelfID)!;
                // Preserve custom subdivisions only if they already follow the multi-tab bracketed structure
                const effectiveSubdivisions = hasBracketedHeaders(custom.subdivisions)
                  ? custom.subdivisions
                  : defaultShelf.subdivisions;

                shelfMap.set(custom.shelfID, {
                  ...defaultShelf,
                  ...custom,
                  subdivisions: effectiveSubdivisions
                });
              }
            });
            setShelves(Array.from(shelfMap.values()));
          }
        }
      } catch (err) {
        console.warn("Could not load from Firestore (using local defaults):", err);
      } finally {
        setLoading(false);
      }
    }

    loadShelvesCatalog();
  }, []);

  const handleSelectShelfFromMap = (shelf: DDCShelf) => {
    setSelectedShelf(shelf);
    setEditingShelf({ ...shelf });
    setActiveSectionTab(0);
    setUseRawEditor(false);
    setActiveItemEditMode("list");
    setNewTopicInput("");
    setShowAddTabMenu(false);
    const sections = parseSubdivisionSections(shelf.subdivisions || []);
    setBulkTextDraft(sections[0]?.items.join("\n") || (shelf.subdivisions || []).join("\n"));
  };

  const handleEditClick = (shelf: DDCShelf) => {
    setEditingShelf({ ...shelf });
    setPreviewShelf({ ...shelf });
    setActiveSectionTab(0);
    setUseRawEditor(false);
    setActiveItemEditMode("list");
    setNewTopicInput("");
    setShowAddTabMenu(false);
    setPreviewPageIndex(0);
    const sections = parseSubdivisionSections(shelf.subdivisions || []);
    setBulkTextDraft(sections[0]?.items.join("\n") || (shelf.subdivisions || []).join("\n"));
  };

  const handleResetToDefaults = () => {
    if (confirm("Reset all shelves and library locations to original PSAU defaults? Any unsaved edits will be discarded.")) {
      setShelves([...INITIAL_DDC_SHELVES]);
      setSelectedShelf(null);
      setSuccessMessage("Shelves reset to default PSAU library categories. Click 'Publish' to deploy to mobile.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const handleSaveEdit = () => {
    if (!editingShelf) return;

    const updatedShelves = shelves.map((s) =>
      s.shelfID === editingShelf.shelfID
        ? { ...editingShelf, lastUpdated: new Date().toISOString() }
        : s
    );

    setShelves(updatedShelves);
    if (selectedShelf && selectedShelf.shelfID === editingShelf.shelfID) {
      setSelectedShelf({ ...editingShelf, lastUpdated: new Date().toISOString() });
    }
    setEditingShelf(null);
  };

  const handleExportCSV = () => {
    try {
      const csvContent = exportShelvesToCSV(shelves);
      const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `psau_library_ddc_catalog_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setSuccessMessage(`Exported ${shelves.length} shelves to CSV successfully!`);
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export CSV.");
    }
  };

  const handleImportCSVFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        if (!text) return;

        const records = parseCSV(text);
        if (records.length === 0) {
          alert("Walang nahanap na valid shelf records sa CSV file.");
          return;
        }

        let updatedCount = 0;
        setShelves((prevShelves) => {
          const shelfMap = new Map<string, DDCShelf>();
          prevShelves.forEach((s) => shelfMap.set(s.shelfID.toLowerCase(), { ...s }));

          records.forEach((row) => {
            const id = (row.shelfID || row.shelfCode || "").trim().toLowerCase();
            if (!id) return;

            let targetShelf = shelfMap.get(id);
            if (!targetShelf) {
              for (const s of shelfMap.values()) {
                if (s.shelfCode.toLowerCase() === id) {
                  targetShelf = s;
                  break;
                }
              }
            }

            if (targetShelf) {
              updatedCount++;
              if (row.shelfCode) targetShelf.shelfCode = row.shelfCode.trim();
              if (row.categoryTitle) targetShelf.categoryTitle = row.categoryTitle.trim();
              if (row.floor && ["ground", "second", "third"].includes(row.floor.toLowerCase())) {
                targetShelf.floor = row.floor.toLowerCase() as "ground" | "second" | "third";
              }
              if (row.targetCollege) targetShelf.targetCollege = row.targetCollege.trim();
              if (row.generalCollectionSummary) targetShelf.generalCollectionSummary = row.generalCollectionSummary.trim();
              if (row.studentGuidance) targetShelf.studentGuidance = row.studentGuidance.trim();
              if (row.subdivisions) {
                const lines = row.subdivisions
                  .split(/\r?\n|\|/)
                  .map((l) => l.trim())
                  .filter((l) => l.length > 0);
                targetShelf.subdivisions = lines;
              }
              targetShelf.lastUpdated = new Date().toISOString();
            }
          });

          return Array.from(shelfMap.values());
        });

        setSuccessMessage(`Matagumpay na na-import ang ${updatedCount} shelf records mula sa CSV! Pindutin ang 'Publish to Mobile' upang ma-deploy.`);
        setTimeout(() => setSuccessMessage(""), 6000);
      } catch (err) {
        console.error("Import CSV Error:", err);
        alert("Nagka-error sa pag-parse ng CSV file.");
      } finally {
        if (e.target) e.target.value = "";
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  const handleAddTopicToCurrentSection = (sections: SectionData[], safeTabIndex: number) => {
    if (!newTopicInput.trim() || !editingShelf) return;
    const currentSection = sections[safeTabIndex] || { title: "", items: [] };

    const updatedSections = [...sections];
    updatedSections[safeTabIndex] = {
      ...currentSection,
      items: [...currentSection.items, newTopicInput.trim()],
    };

    setEditingShelf({
      ...editingShelf,
      subdivisions: serializeSubdivisionSections(updatedSections),
    });
    setNewTopicInput("");
  };

  const handleDeleteTopic = (sections: SectionData[], safeTabIndex: number, itemIdx: number) => {
    if (!editingShelf) return;
    const currentSection = sections[safeTabIndex];
    if (!currentSection) return;

    const updatedSections = [...sections];
    updatedSections[safeTabIndex] = {
      ...currentSection,
      items: currentSection.items.filter((_, idx) => idx !== itemIdx),
    };

    setEditingShelf({
      ...editingShelf,
      subdivisions: serializeSubdivisionSections(updatedSections),
    });
  };

  const handleMoveTopic = (sections: SectionData[], safeTabIndex: number, itemIdx: number, dir: -1 | 1) => {
    if (!editingShelf) return;
    const currentSection = sections[safeTabIndex];
    if (!currentSection) return;

    const targetIdx = itemIdx + dir;
    if (targetIdx < 0 || targetIdx >= currentSection.items.length) return;

    const newItems = [...currentSection.items];
    const temp = newItems[itemIdx];
    newItems[itemIdx] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    const updatedSections = [...sections];
    updatedSections[safeTabIndex] = {
      ...currentSection,
      items: newItems,
    };

    setEditingShelf({
      ...editingShelf,
      subdivisions: serializeSubdivisionSections(updatedSections),
    });
  };

  const handleUpdateTopicText = (sections: SectionData[], safeTabIndex: number, itemIdx: number, val: string) => {
    if (!editingShelf) return;
    const currentSection = sections[safeTabIndex];
    if (!currentSection) return;

    const newItems = [...currentSection.items];
    newItems[itemIdx] = val;

    const updatedSections = [...sections];
    updatedSections[safeTabIndex] = {
      ...currentSection,
      items: newItems,
    };

    setEditingShelf({
      ...editingShelf,
      subdivisions: serializeSubdivisionSections(updatedSections),
    });
  };

  const handleAddClassSection = (preset?: typeof DDC_CLASS_PRESETS[0]) => {
    if (!editingShelf) return;
    const sections = parseSubdivisionSections(editingShelf.subdivisions || []);
    const newTitle = preset ? preset.label : `Panibagong Seksyon (Page ${sections.length + 1})`;
    const newItems = preset ? [...preset.defaultItems] : [];

    const updatedSections = [...sections, { title: newTitle, items: newItems }];
    setEditingShelf({
      ...editingShelf,
      subdivisions: serializeSubdivisionSections(updatedSections),
    });
    setActiveSectionTab(sections.length);
    setShowAddTabMenu(false);
  };

  // Update hotspot position from floor plan drag-and-drop
  const handleUpdateHotspotPosition = (shelfIDMatch: string, pos: { x: number; y: number }) => {
    setShelves((prevShelves) => {
      const exists = prevShelves.some(
        (s) => s.shelfID === shelfIDMatch || s.shelfID.toLowerCase() === shelfIDMatch.toLowerCase().trim()
      );

      if (exists) {
        return prevShelves.map((s) => {
          if (s.shelfID === shelfIDMatch || s.shelfID.toLowerCase() === shelfIDMatch.toLowerCase().trim()) {
            return {
              ...s,
              position: pos,
              lastUpdated: new Date().toISOString()
            };
          }
          return s;
        });
      } else {
        const newRecord: DDCShelf = {
          shelfID: shelfIDMatch,
          shelfCode: shelfIDMatch.replace(/^Facility_|^Shelf_/, ""),
          categoryTitle: shelfIDMatch.replace(/_/g, " "),
          targetCollege: "All Colleges",
          iconType: "MapPin",
          generalCollectionSummary: `PSAU Library facility / hotspot location: ${shelfIDMatch}`,
          studentGuidance: "Explore this designated library section.",
          floor: activeFloor,
          position: pos,
          lastUpdated: new Date().toISOString()
        };
        return [...prevShelves, newRecord];
      }
    });

    setSuccessMessage(`Updated pin position: (${pos.x}%, ${pos.y}%). Click 'Publish Updates to Mobile App' to deploy.`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // Publish to Cloud Firestore
  const handlePublishToGame = async () => {
    setSaving(true);
    setSuccessMessage("");

    const newCatalog: DDCShelfCatalog = {
      version: `2.${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      shelves: shelves,
    };

    try {
      const catalogRef = doc(db, "catalogs", "ddc_shelves");
      await setDoc(catalogRef, newCatalog);
      setSuccessMessage("Shelves published successfully! Mobile players will receive updates on next sync.");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Failed to publish shelves:", err);
      alert("Failed to publish to Firestore. Please check permissions or network connection.");
    } finally {
      setSaving(false);
    }
  };

  // Filtered list for List View
  const filteredShelves = shelves.filter((shelf) => {
    const matchesSearch = 
      shelf.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelf.shelfCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelf.generalCollectionSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelf.targetCollege.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFloor = floorFilter === "all" || shelf.floor === floorFilter;

    return matchesSearch && matchesFloor;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Library Shelf & Location Manager
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 font-mono text-[10px] font-bold border border-teal-500/20">
              Interactive 2D Map
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual architectural floor plan and shelf configuration for Free Exploration Mode ({shelves.length} active locations).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
            <button
              onClick={() => setViewMode("map")}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "map"
                  ? "bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Floor Map</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "list"
                  ? "bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Card List</span>
            </button>
          </div>

          <button
            onClick={handleResetToDefaults}
            disabled={saving}
            title="Reset to standard PSAU library shelves"
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={saving}
            title="Export all shelves to CSV file for Excel / Google Sheets"
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
            title="Import shelves from CSV file"
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Import CSV</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleImportCSVFile}
            className="hidden"
          />

          <button
            onClick={handlePublishToGame}
            disabled={saving}
            className="inline-flex items-center justify-center space-x-2 px-4 sm:px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-lg shadow-teal-500/20 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Publish to Mobile</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2 animate-fade-in">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 1: INTERACTIVE FLOOR MAP (OFFICIAL PSAU BLUEPRINT)           */}
      {/* ========================================================================= */}
      {viewMode === "map" && (
        <div className="space-y-4">
          <OfficialFloorPlanMap
            shelves={shelves}
            selectedShelf={selectedShelf}
            onSelectShelf={handleSelectShelfFromMap}
            activeFloor={activeFloor}
            onFloorChange={setActiveFloor}
            onUpdateHotspotPosition={handleUpdateHotspotPosition}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: CARD LIST VIEW                                               */}
      {/* ========================================================================= */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {/* Search & Floor Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shelf code, subject, or college..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-medium">Floor:</span>
              <select
                value={floorFilter}
                onChange={(e) => setFloorFilter(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
              >
                <option value="all">All Floors</option>
                <option value="ground">Ground Floor</option>
                <option value="second">Second Floor</option>
                <option value="third">Third Floor (Reference & Facilities)</option>
              </select>
            </div>
          </div>

          {/* Shelves Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredShelves.map((shelf) => (
              <div
                key={shelf.shelfID}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-400 font-mono text-xs font-bold border border-teal-500/20">
                      {shelf.shelfCode}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      Floor: <strong className="text-white capitalize">{shelf.floor}</strong>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">
                    {shelf.categoryTitle}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {shelf.generalCollectionSummary}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 mb-3">
                    <span className="font-semibold text-teal-400">Search Guidance: </span>
                    <span>{shelf.studentGuidance}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono truncate max-w-[140px]" title={shelf.shelfID}>
                    ID: {shelf.shelfID}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewShelf(shelf)}
                      title="Preview in-game modal"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditClick(shelf)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Shelf</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT SHELF MODAL / INSPECTOR                                              */}
      {/* ========================================================================= */}
      {editingShelf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-white my-auto overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <BookMarked className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm sm:text-base font-bold">Edit Shelf: {editingShelf.shelfCode}</h3>
              </div>
              <button
                onClick={() => setEditingShelf(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close edit modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Shelf Code (Display Badge)
                </label>
                <input
                  type="text"
                  value={editingShelf.shelfCode}
                  onChange={(e) =>
                    setEditingShelf({ ...editingShelf, shelfCode: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  value={editingShelf.categoryTitle}
                  onChange={(e) =>
                    setEditingShelf({ ...editingShelf, categoryTitle: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Target College / Audience
                </label>
                <input
                  type="text"
                  value={editingShelf.targetCollege}
                  onChange={(e) =>
                    setEditingShelf({ ...editingShelf, targetCollege: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  General Collection Summary (Subjects on this shelf)
                </label>
                <textarea
                  rows={2}
                  value={editingShelf.generalCollectionSummary}
                  onChange={(e) =>
                    setEditingShelf({
                      ...editingShelf,
                      generalCollectionSummary: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Student Guidance (How to find call numbers)
                </label>
                <textarea
                  rows={2}
                  value={editingShelf.studentGuidance}
                  onChange={(e) =>
                    setEditingShelf({ ...editingShelf, studentGuidance: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              {/* Subdivisions & Subject Areas (Smart Tabbed / Sectioned Form) */}
              <div>
                {(() => {
                  const sections = parseSubdivisionSections(editingShelf.subdivisions || []);
                  const hasSections = sections.length > 1 || (sections.length === 1 && !!sections[0]?.title);
                  const safeTabIndex = Math.min(activeSectionTab, Math.max(0, sections.length - 1));
                  const currentSection = sections[safeTabIndex] || { title: "", items: [] };

                  return (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-slate-300 font-medium">
                          Subdivisions & Subject Areas
                        </label>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-teal-400 font-mono">
                            {(editingShelf.subdivisions || []).length} lines total
                          </span>
                          {hasSections && (
                            <button
                              type="button"
                              onClick={() => {
                                const nextRaw = !useRawEditor;
                                setUseRawEditor(nextRaw);
                                if (nextRaw) {
                                  setBulkTextDraft((editingShelf.subdivisions || []).join("\n"));
                                }
                              }}
                              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium underline"
                            >
                              {useRawEditor ? "← Switch to Class Tabs" : "Raw Bulk Catalog →"}
                            </button>
                          )}
                        </div>
                      </div>

                      {!useRawEditor && hasSections ? (
                        <div className="space-y-2.5">
                          {/* Class Section Tabs & Presets Popover */}
                          <div className="relative">
                            <div className="flex flex-wrap gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
                              {sections.map((sec, idx) => {
                                const label = sec.title ? sec.title.split("–")[0].trim() : `Page ${idx + 1}`;
                                const isActive = safeTabIndex === idx;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      setActiveSectionTab(idx);
                                      setBulkTextDraft(sections[idx]?.items.join("\n") || "");
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                      isActive
                                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                                    }`}
                                  >
                                    {label}
                                  </button>
                                );
                              })}
                              <button
                                type="button"
                                onClick={() => setShowAddTabMenu(!showAddTabMenu)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 border border-dashed border-teal-500/40 flex items-center space-x-1 transition-all"
                                title="Add Class Section / Tab"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Tab</span>
                              </button>
                            </div>

                            {/* DDC Preset Tab Selector Menu */}
                            {showAddTabMenu && (
                              <div className="absolute top-full left-0 mt-2 z-30 w-full max-w-md p-3 rounded-2xl bg-slate-900 border-2 border-teal-500/50 shadow-2xl backdrop-blur-md animate-fade-in space-y-2">
                                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                                  <span className="text-[11px] font-bold text-white flex items-center space-x-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                                    <span>Pumili ng DDC Class Preset o Custom Tab</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setShowAddTabMenu(false)}
                                    className="p-1 text-slate-400 hover:text-white"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 text-[11px]">
                                  {DDC_CLASS_PRESETS.map((preset) => (
                                    <button
                                      key={preset.code}
                                      type="button"
                                      onClick={() => handleAddClassSection(preset)}
                                      className="p-2 text-left rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500 hover:bg-slate-800/80 transition-all text-slate-300 hover:text-white group"
                                    >
                                      <div className="font-bold text-teal-400 font-mono text-[10px]">
                                        Class {preset.code}
                                      </div>
                                      <div className="text-[10px] truncate text-slate-400 group-hover:text-slate-200">
                                        {preset.label.replace(/^[0-9]{3} – /, "")}
                                      </div>
                                    </button>
                                  ))}
                                </div>

                                <div className="pt-1.5 border-t border-slate-800">
                                  <button
                                    type="button"
                                    onClick={() => handleAddClassSection()}
                                    className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Custom Blank Tab (Manu-manong Ilalagay)</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Active Section Editor */}
                          <div className="p-3 bg-slate-950/90 border border-slate-800/80 rounded-xl space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-[11px] font-bold text-cyan-400">
                                  Class Header Title (Card Title sa Mobile App)
                                </label>
                                {sections.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`Delete section '${currentSection.title}'?`)) {
                                        const updated = sections.filter((_, idx) => idx !== safeTabIndex);
                                        setEditingShelf({
                                          ...editingShelf,
                                          subdivisions: serializeSubdivisionSections(updated),
                                        });
                                        const newIndex = Math.max(0, safeTabIndex - 1);
                                        setActiveSectionTab(newIndex);
                                        setBulkTextDraft(updated[newIndex]?.items.join("\n") || "");
                                      }
                                    }}
                                    className="text-[10px] text-rose-400 hover:text-rose-300"
                                  >
                                    Delete Tab
                                  </button>
                                )}
                              </div>
                              <input
                                type="text"
                                value={currentSection.title}
                                onChange={(e) => {
                                  const updated = [...sections];
                                  updated[safeTabIndex] = {
                                    ...currentSection,
                                    title: e.target.value,
                                  };
                                  setEditingShelf({
                                    ...editingShelf,
                                    subdivisions: serializeSubdivisionSections(updated),
                                  });
                                }}
                                placeholder="e.g. 000 – GENERALITIES & INFORMATION"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-cyan-400"
                              />
                            </div>

                            {/* Mode Switcher: Item-by-Item List vs Raw Bulk Editor */}
                            <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                              <span className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                                <span>Mga Sakop na Paksa sa Tab na ito:</span>
                                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-[10px]">
                                  {currentSection.items.length} paksa
                                </span>
                              </span>
                              <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-[10px]">
                                <button
                                  type="button"
                                  onClick={() => setActiveItemEditMode("list")}
                                  className={`px-2 py-1 rounded font-medium transition-all ${
                                    activeItemEditMode === "list"
                                      ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                                      : "text-slate-400 hover:text-white"
                                  }`}
                                >
                                  📋 Item-by-Item (+ Add)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveItemEditMode("bulk");
                                    setBulkTextDraft(currentSection.items.join("\n"));
                                  }}
                                  className={`px-2 py-1 rounded font-medium transition-all ${
                                    activeItemEditMode === "bulk"
                                      ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                                      : "text-slate-400 hover:text-white"
                                  }`}
                                >
                                  📝 Raw Text
                                </button>
                              </div>
                            </div>

                            {activeItemEditMode === "list" ? (
                              <div className="space-y-2">
                                {/* Item-by-Item List with Re-order & Delete */}
                                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                                  {currentSection.items.length === 0 ? (
                                    <div className="p-3 rounded-xl bg-slate-900/60 border border-dashed border-slate-800 text-center text-slate-500 text-xs">
                                      Walang nakalistang paksa sa tab na ito. Maglagay sa ibaba gamit ang input field o pindutin ang Enter.
                                    </div>
                                  ) : (
                                    currentSection.items.map((item, itemIdx) => (
                                      <div
                                        key={itemIdx}
                                        className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all group"
                                      >
                                        <span className="w-5 h-5 rounded-md bg-cyan-500/15 text-cyan-300 font-mono text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                                          {itemIdx + 1}
                                        </span>
                                        <input
                                          type="text"
                                          value={item}
                                          onChange={(e) =>
                                            handleUpdateTopicText(sections, safeTabIndex, itemIdx, e.target.value)
                                          }
                                          className="flex-1 bg-transparent text-white text-xs font-medium focus:outline-none focus:bg-slate-950 px-2 py-0.5 rounded border border-transparent focus:border-cyan-500/50"
                                        />
                                        <div className="flex items-center space-x-1">
                                          <button
                                            type="button"
                                            disabled={itemIdx === 0}
                                            onClick={() => handleMoveTopic(sections, safeTabIndex, itemIdx, -1)}
                                            title="Move Up"
                                            className="p-1 text-slate-500 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                                          >
                                            <ArrowUp className="w-3.5 h-3.5" />
                                          </button>
                                          <button
                                            type="button"
                                            disabled={itemIdx === currentSection.items.length - 1}
                                            onClick={() => handleMoveTopic(sections, safeTabIndex, itemIdx, 1)}
                                            title="Move Down"
                                            className="p-1 text-slate-500 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                                          >
                                            <ArrowDown className="w-3.5 h-3.5" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteTopic(sections, safeTabIndex, itemIdx)}
                                            title="Delete Topic"
                                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>

                                {/* Single-line input with + Magdagdag button and Enter key listener */}
                                <div className="flex items-center gap-2 pt-1.5">
                                  <input
                                    type="text"
                                    value={newTopicInput}
                                    onChange={(e) => setNewTopicInput(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddTopicToCurrentSection(sections, safeTabIndex);
                                      }
                                    }}
                                    placeholder="Ilagay ang bagong paksa (e.g. 010 Bibliography) sabay pindutin ang Enter..."
                                    className="flex-1 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleAddTopicToCurrentSection(sections, safeTabIndex)}
                                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 flex items-center space-x-1 shadow-md shadow-teal-500/20 transition-all cursor-pointer flex-shrink-0"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Magdagdag</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1.5">
                                <textarea
                                  rows={5}
                                  value={bulkTextDraft}
                                  onChange={(e) => {
                                    setBulkTextDraft(e.target.value);
                                    const lines = e.target.value
                                      .split("\n")
                                      .map((s) => s.trim())
                                      .filter((s) => s.length > 0);
                                    const updatedSections = [...sections];
                                    updatedSections[safeTabIndex] = {
                                      ...currentSection,
                                      items: lines,
                                    };
                                    setEditingShelf({
                                      ...editingShelf,
                                      subdivisions: serializeSubdivisionSections(updatedSections),
                                    });
                                  }}
                                  placeholder="Isang paksa bawat linya (e.g.&#10;010 Bibliography&#10;020 Library Sciences)"
                                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 leading-relaxed"
                                />
                                <p className="text-[10px] text-slate-500">
                                  Maaaring mag-paste ng maramihang linya. Awtomatikong magkakaroon ng bullet point ang bawat linya sa mobile app.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <textarea
                            rows={5}
                            value={bulkTextDraft}
                            onChange={(e) => {
                              setBulkTextDraft(e.target.value);
                              const lines = e.target.value
                                .split("\n")
                                .map((s) => s.trim())
                                .filter((s) => s.length > 0);
                              setEditingShelf({
                                ...editingShelf,
                                subdivisions: lines,
                              });
                            }}
                            placeholder="e.g.&#10;630 - Agriculture & Related Technologies&#10;631 - Techniques, Equipment & Materials&#10;632 - Plant Injuries, Diseases & Pests"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-teal-400 leading-relaxed"
                          />
                          <p className="text-[10px] text-slate-500">
                            Tip: Gumamit ng <code className="text-cyan-400 font-mono">[000 - Title]</code> para awtomatikong lumikha ng panibagong class section o pahina sa mobile app.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Floor</label>
                  <select
                    value={editingShelf.floor}
                    onChange={(e) =>
                      setEditingShelf({
                        ...editingShelf,
                        floor: e.target.value as "ground" | "second" | "third",
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                  >
                    <option value="ground">Ground Floor</option>
                    <option value="second">Second Floor</option>
                    <option value="third">Third Floor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Preview In-Game</label>
                  <button
                    type="button"
                    onClick={() => setPreviewShelf(editingShelf)}
                    className="w-full py-2 rounded-lg text-xs font-semibold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Modal Preview</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-800 flex justify-end space-x-3 flex-shrink-0 bg-slate-900/90">
              <button
                type="button"
                onClick={() => setEditingShelf(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LIVE IN-GAME HOLOGRAM PREVIEW MODAL                                       */}
      {/* ========================================================================= */}
      {previewShelf && (() => {
        const previewSections = parseSubdivisionSections(previewShelf.subdivisions || []);
        const hasMultiPages = previewSections.length > 1;
        const totalPages = hasMultiPages ? previewSections.length : 1;
        const safePageIndex = Math.min(previewPageIndex, Math.max(0, totalPages - 1));
        const currentSec = hasMultiPages ? previewSections[safePageIndex] : null;
        const displayTitle = currentSec?.title || previewShelf.categoryTitle;
        const displayItems = currentSec ? currentSec.items : previewShelf.subdivisions || [];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="w-full max-w-xl max-h-[92vh] bg-slate-900/95 border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-white relative my-auto overflow-y-auto">
              {/* Top Bar with Badge Pill and Close Button */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                  {previewShelf.shelfCode}
                </span>
                <button
                  onClick={() => {
                    setPreviewShelf(null);
                    setPreviewPageIndex(0);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-sm font-bold cursor-pointer"
                  aria-label="Close preview"
                >
                  ✕
                </button>
              </div>

              {/* Header Content: Icon + Title */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 flex-shrink-0">
                  <BookMarked className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    {displayTitle}
                  </h3>
                  <p className="text-[11px] text-slate-400 capitalize">
                    {previewShelf.floor} Floor • {previewShelf.targetCollege}
                  </p>
                </div>
              </div>

              {/* Top Divider */}
              <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-transparent mb-3" />

              {/* Body Inset Frosted Panel */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 mb-4">
                {/* Subdivisions List */}
                {displayItems && displayItems.length > 0 ? (
                  <div>
                    <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-2">
                      MGA SAKOP NA PAKSA AT SUBDIVISIONS:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {displayItems.map((sub, i) => (
                        <li key={i} className="flex items-start space-x-1.5 pl-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                      KOLEKSIYON AT MGA MATERYALES:
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {previewShelf.generalCollectionSummary}
                    </p>
                  </div>
                )}

                {/* Shelf Span & Guidance Callouts */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-bold text-amber-400 text-[11px]">LOKASYON / SHELF SPAN:</span>
                    <span className="text-slate-200 font-mono text-[11px]">
                      {previewShelf.shelfCode || previewShelf.shelfID}
                    </span>
                  </div>
                  {previewShelf.studentGuidance && (
                    <div className="flex items-baseline space-x-1.5">
                      <span className="font-bold text-emerald-400 text-[11px]">GABAY SA PAGHAHANAP:</span>
                      <span className="text-slate-300 text-[11px]">{previewShelf.studentGuidance}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Divider */}
              <div className="h-[2px] w-full bg-gradient-to-r from-slate-700/50 via-slate-700/20 to-transparent mb-4" />

              {/* Interactive Navigation Footer */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={safePageIndex === 0}
                  onClick={() => setPreviewPageIndex(Math.max(0, safePageIndex - 1))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    safePageIndex > 0
                      ? "text-cyan-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 cursor-pointer"
                      : "text-slate-600 bg-slate-900 border border-slate-800 cursor-not-allowed"
                  }`}
                >
                  ◀ BUMALIK
                </button>

                <div className="px-4 py-1.5 rounded-full bg-slate-950 border border-cyan-500/30 text-xs text-slate-300 font-bold">
                  <span className="text-cyan-400 text-[10px] font-normal mr-1">PAHINA</span>
                  <span>{safePageIndex + 1} / {totalPages}</span>
                </div>

                {hasMultiPages && safePageIndex < totalPages - 1 ? (
                  <button
                    type="button"
                    onClick={() => setPreviewPageIndex(safePageIndex + 1)}
                    className="px-5 py-2 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    SUSUNOD &gt;
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewShelf(null);
                      setPreviewPageIndex(0);
                    }}
                    className="px-5 py-2 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    NAIINTINDIHAN KO
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
