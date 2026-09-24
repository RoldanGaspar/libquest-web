"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DDCShelf, DDCShelfCatalog } from "@/types/shelf";
import { INITIAL_DDC_SHELVES } from "@/lib/ddcDefaults";
import CirculationRoomMap from "@/components/admin/CirculationRoomMap";
import GeneralStacksMap from "@/components/admin/GeneralStacksMap";
import FilipinianaMap from "@/components/admin/FilipinianaMap";
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
  Search
} from "lucide-react";

type ViewMode = "map" | "list";
type MapStyle = "official_blueprint" | "vector_schematic";
type SelectedZone = "circulation" | "ddc_stacks" | "filipiniana";

export default function DDCShelfManagerPage() {
  const [shelves, setShelves] = useState<DDCShelf[]>(INITIAL_DDC_SHELVES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [mapStyle, setMapStyle] = useState<MapStyle>("official_blueprint");
  const [activeFloor, setActiveFloor] = useState<FloorTab>("ground");
  const [selectedZone, setSelectedZone] = useState<SelectedZone>("circulation");
  const [selectedShelf, setSelectedShelf] = useState<DDCShelf | null>(null);

  // Search & Filter for List View
  const [searchQuery, setSearchQuery] = useState("");
  const [floorFilter, setFloorFilter] = useState<"all" | "ground" | "second">("all");

  // Editing & Preview state
  const [editingShelf, setEditingShelf] = useState<DDCShelf | null>(null);
  const [previewShelf, setPreviewShelf] = useState<DDCShelf | null>(null);

  useEffect(() => {
    async function loadShelvesCatalog() {
      try {
        const catalogRef = doc(db, "catalogs", "ddc_shelves");
        const snap = await getDoc(catalogRef);
        if (snap.exists()) {
          const data = snap.data() as DDCShelfCatalog;
          if (data.shelves && Array.isArray(data.shelves)) {
            // Reconcile with INITIAL_DDC_SHELVES so all PSAU shelves (including Circulation Room)
            // are available, while preserving any custom changes already published to Firestore.
            const shelfMap = new Map<string, DDCShelf>();
            INITIAL_DDC_SHELVES.forEach((def) => shelfMap.set(def.shelfID, def));
            data.shelves.forEach((custom) => {
              if (custom && custom.shelfID) {
                shelfMap.set(custom.shelfID, custom);
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
  };

  const handleEditClick = (shelf: DDCShelf) => {
    setEditingShelf({ ...shelf });
    setPreviewShelf({ ...shelf });
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
      version: `1.${Date.now()}`,
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
      {/* VIEW MODE 1: INTERACTIVE FLOOR MAP                                        */}
      {/* ========================================================================= */}
      {viewMode === "map" && (
        <div className="space-y-4">
          {/* Map Display Style Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-semibold px-2 text-[11px]">Map Display:</span>
              <button
                onClick={() => setMapStyle("official_blueprint")}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl font-bold transition-all ${
                  mapStyle === "official_blueprint"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>🏛️ Official PSAU Library Blueprint</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-950/20 text-slate-950 font-mono">
                  Real Floor Plan
                </span>
              </button>

              <button
                onClick={() => setMapStyle("vector_schematic")}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl font-bold transition-all ${
                  mapStyle === "vector_schematic"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>📐 Room Vector Schematics</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 pr-2 hidden sm:block">
              {mapStyle === "official_blueprint" 
                ? "Official high-resolution architectural layout with interactive hotspot beacons"
                : "Individual room vector diagrams"}
            </div>
          </div>

          {/* Style 1: Official PSAU Library Blueprint Map */}
          {mapStyle === "official_blueprint" && (
            <OfficialFloorPlanMap
              shelves={shelves}
              selectedShelf={selectedShelf}
              onSelectShelf={handleSelectShelfFromMap}
              activeFloor={activeFloor}
              onFloorChange={setActiveFloor}
              onUpdateHotspotPosition={handleUpdateHotspotPosition}
            />
          )}

          {/* Style 2: Room Vector Detail Schematics */}
          {mapStyle === "vector_schematic" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <button
                  onClick={() => setSelectedZone("circulation")}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg font-semibold transition-all ${
                    selectedZone === "circulation"
                      ? "bg-teal-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span>🏢 Circulation & Reservation Room</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    selectedZone === "circulation" ? "bg-slate-950/20 text-slate-950 font-mono" : "bg-slate-800 text-slate-400"
                  }`}>
                    East Wing
                  </span>
                </button>

                <button
                  onClick={() => setSelectedZone("ddc_stacks")}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg font-semibold transition-all ${
                    selectedZone === "ddc_stacks"
                      ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span>📚 General DDC Stacks (000–900)</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    selectedZone === "ddc_stacks" ? "bg-slate-950/20 text-slate-950 font-mono" : "bg-slate-800 text-slate-400"
                  }`}>
                    West Wing
                  </span>
                </button>

                <button
                  onClick={() => setSelectedZone("filipiniana")}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg font-semibold transition-all ${
                    selectedZone === "filipiniana"
                      ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span>🇵🇭 Filipiniana & Theses Hall</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                    selectedZone === "filipiniana" ? "bg-slate-950/20 text-slate-950 font-mono" : "bg-slate-800 text-slate-400"
                  }`}>
                    2nd Floor
                  </span>
                </button>
              </div>

              {selectedZone === "circulation" && (
                <CirculationRoomMap
                  shelves={shelves}
                  selectedShelf={selectedShelf}
                  onSelectShelf={handleSelectShelfFromMap}
                />
              )}

              {selectedZone === "ddc_stacks" && (
                <GeneralStacksMap
                  shelves={shelves}
                  selectedShelf={selectedShelf}
                  onSelectShelf={handleSelectShelfFromMap}
                />
              )}

              {selectedZone === "filipiniana" && (
                <FilipinianaMap
                  shelves={shelves}
                  selectedShelf={selectedShelf}
                  onSelectShelf={handleSelectShelfFromMap}
                />
              )}
            </div>
          )}
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
      {previewShelf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-md max-h-[92vh] bg-slate-900 border-2 border-teal-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-white relative my-auto overflow-y-auto">
            <button
              onClick={() => setPreviewShelf(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4 pr-6 sm:pr-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/30">
                Unity Mobile In-Game Preview
              </span>
            </div>

            {/* Simulated RuleDiscoveryModalUI */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                <BookMarked className="w-6 h-6" />
              </div>

              <div className="font-mono text-xs font-bold text-teal-400">
                {previewShelf.shelfCode}
              </div>

              <h4 className="text-base font-bold text-white">
                {previewShelf.categoryTitle}
              </h4>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-left text-xs text-slate-300 leading-relaxed">
                <p>{previewShelf.generalCollectionSummary}</p>
                <p className="mt-2 font-semibold text-teal-300">
                  Hanapin: <span className="font-normal text-slate-300">{previewShelf.studentGuidance}</span>
                </p>
              </div>

              <button
                onClick={() => setPreviewShelf(null)}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 transition-colors"
              >
                Close Discovery Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
