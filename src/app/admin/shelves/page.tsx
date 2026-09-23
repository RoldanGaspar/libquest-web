"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DDCShelf, DDCShelfCatalog } from "@/types/shelf";
import { INITIAL_DDC_SHELVES } from "@/lib/ddcDefaults";
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
  X
} from "lucide-react";

export default function DDCShelfManagerPage() {
  const [shelves, setShelves] = useState<DDCShelf[]>(INITIAL_DDC_SHELVES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Editing state
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
            // Reconcile with INITIAL_DDC_SHELVES so all 16 PSAU shelves are available,
            // while preserving any custom changes already published to Firestore.
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

  const handleEditClick = (shelf: DDCShelf) => {
    setEditingShelf({ ...shelf });
    setPreviewShelf({ ...shelf });
  };

  const handleResetToDefaults = () => {
    if (confirm("Reset all 16 shelves to original PSAU library defaults? Any unsaved edits will be discarded.")) {
      setShelves([...INITIAL_DDC_SHELVES]);
      setSuccessMessage("Shelves reset to 16 default PSAU library categories. Click 'Publish' to deploy to mobile.");
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
    setEditingShelf(null);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Dewey Decimal (DDC) Shelf Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure shelf classification titles, Dewey call number ranges, and student guidance for Free Exploration Mode ({shelves.length} shelves active).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetToDefaults}
            disabled={saving}
            title="Reset to 16 standard PSAU library shelves"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handlePublishToGame}
            disabled={saving}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-lg shadow-teal-500/20 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Publish Updates to Mobile App</span>
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

      {/* Shelves Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {shelves.map((shelf) => (
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
              <span className="text-[10px] text-slate-500 font-mono">
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

      {/* Edit Shelf Modal */}
      {editingShelf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <BookMarked className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold">Edit Shelf: {editingShelf.shelfCode}</h3>
              </div>
              <button
                onClick={() => setEditingShelf(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
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
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingShelf(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live In-Game Hologram Preview Modal */}
      {previewShelf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border-2 border-teal-500/40 rounded-3xl p-6 shadow-2xl text-white relative">
            <button
              onClick={() => setPreviewShelf(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/30">
                Unity Mobile In-Game Preview
              </span>
            </div>

            {/* Simulated RuleDiscoveryModalUI */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
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
                className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400"
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
