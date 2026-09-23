"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { StudentRecord } from "@/types/student";
import { 
  Users, 
  Search, 
  Download, 
  Filter, 
  Loader2, 
  Calendar, 
  IdCard, 
  Mail,
  UserCheck
} from "lucide-react";

// Realistic sample records for defense demonstration
const DEMO_STUDENTS: StudentRecord[] = [
  {
    uid: "demo_01",
    fullName: "JUAN DELA CRUZ",
    email: "jdelacruz@psau.edu.ph",
    studentId: "C2024-00124",
    characterType: "Boy",
    role: "student",
    createdAt: "2026-09-20T08:30:00Z"
  },
  {
    uid: "demo_02",
    fullName: "MARIA CLARA SANTOS",
    email: "msantos@psau.edu.ph",
    studentId: "C2024-00189",
    characterType: "Girl",
    role: "student",
    createdAt: "2026-09-21T09:15:00Z"
  },
  {
    uid: "demo_03",
    fullName: "MARK ANTHONY REYES",
    email: "mreyes@psau.edu.ph",
    studentId: "C2024-00210",
    characterType: "Boy",
    role: "student",
    createdAt: "2026-09-21T11:45:00Z"
  },
  {
    uid: "demo_04",
    fullName: "ANGELA ROSE MANALANG",
    email: "amanalang@psau.edu.ph",
    studentId: "C2024-00342",
    characterType: "Girl",
    role: "student",
    createdAt: "2026-09-22T08:00:00Z"
  },
  {
    uid: "demo_05",
    fullName: "CHRISTIAN DAVE CASTRO",
    email: "ccastro@psau.edu.ph",
    studentId: "C2024-00405",
    characterType: "Boy",
    role: "student",
    createdAt: "2026-09-22T10:20:00Z"
  }
];

export default function StudentRegistryPage() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [characterFilter, setCharacterFilter] = useState<"All" | "Boy" | "Girl">("All");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        if (!querySnapshot.empty) {
          const fetched: StudentRecord[] = [];
          querySnapshot.forEach((docSnap) => {
            fetched.push(docSnap.data() as StudentRecord);
          });
          setStudents(fetched);
        } else {
          // Use sample demo records if database is empty
          setStudents(DEMO_STUDENTS);
        }
      } catch (err) {
        console.warn("Could not fetch students from Firestore (using demo data):", err);
        setStudents(DEMO_STUDENTS);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.fullName.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q);

    const matchesChar = characterFilter === "All" || s.characterType === characterFilter;

    return matchesSearch && matchesChar;
  });

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ["Student ID", "Full Name", "Email", "Character Type", "Role", "Registration Date"];
    const rows = filteredStudents.map((s) => [
      s.studentId,
      `"${s.fullName}"`,
      s.email,
      s.characterType,
      s.role,
      new Date(s.createdAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `psau_libquest_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Student Account Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Viewing {filteredStudents.length} of {students.length} total registered students.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={filteredStudents.length === 0}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 w-full sm:w-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by Name, Student ID (e.g. C2024), or Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Character Filter */}
        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <select
            value={characterFilter}
            onChange={(e) => setCharacterFilter(e.target.value as "All" | "Boy" | "Girl")}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 appearance-none"
          >
            <option value="All">All Characters (Boy & Girl)</option>
            <option value="Boy">Boy Cadet</option>
            <option value="Girl">Girl Cadet</option>
          </select>
        </div>
      </div>

      {/* Mobile Card View (screens < md) */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
            <span>Loading student registry...</span>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
            No students found matching your search.
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.uid || student.studentId}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5 text-xs shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-400 text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {student.studentId}
                </span>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                    student.characterType === "Boy"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                  }`}
                >
                  {student.characterType} Cadet
                </span>
              </div>

              <div>
                <div className="font-bold text-white text-sm">
                  {student.fullName}
                </div>
                <div className="text-slate-400 text-xs flex items-center space-x-1.5 mt-1 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{student.email}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="inline-flex items-center space-x-1 text-emerald-400">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="capitalize">{student.role}</span>
                </span>
                <span className="font-mono text-slate-500 text-[10px]">
                  Reg: {new Date(student.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop / Tablet Table View (screens >= md) */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-3.5">Student ID</th>
                <th className="px-5 py-3.5">Full Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Character</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading student registry...</span>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                    No students found matching your search.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.uid || student.studentId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3 font-mono font-semibold text-emerald-400">
                      {student.studentId}
                    </td>
                    <td className="px-5 py-3 font-bold text-white">
                      {student.fullName}
                    </td>
                    <td className="px-5 py-3 text-slate-400">
                      {student.email}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          student.characterType === "Boy"
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                        }`}
                      >
                        {student.characterType} Cadet
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center space-x-1 text-[11px] text-emerald-400">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span className="capitalize">{student.role}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500 font-mono text-[11px]">
                      {new Date(student.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
