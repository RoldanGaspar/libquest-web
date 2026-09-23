"use client";

import React, { useState } from "react";
import { Search, BookMarked, MapPin, Sparkles } from "lucide-react";

interface DDCClass {
  classCode: string;
  title: string;
  psauFloor: string;
  prefix: string;
  description: string;
  popularTopics: string[];
}

const DDC_CLASSES: DDCClass[] = [
  {
    classCode: "000 - 099",
    title: "Computer Science, Information & General Works",
    psauFloor: "Ground Floor (Stack 000.01 - 320.99)",
    prefix: "C",
    description: "Computers, programming, software engineering, databases, and library sciences.",
    popularTopics: ["Python / C#", "Data Structures", "Artificial Intelligence", "Encyclopedias"]
  },
  {
    classCode: "100 - 199",
    title: "Philosophy & Psychology",
    psauFloor: "Ground Floor",
    prefix: "C",
    description: "Ethics, human behavior, logic, and philosophical treatises.",
    popularTopics: ["Ethics", "Cognitive Psychology", "Logic", "Critical Thinking"]
  },
  {
    classCode: "200 - 299",
    title: "Religion",
    psauFloor: "Ground Floor",
    prefix: "C",
    description: "Religious traditions, biblical studies, and comparative theology.",
    popularTopics: ["Comparative Religion", "Christianity", "World Religions"]
  },
  {
    classCode: "300 - 399",
    title: "Social Sciences",
    psauFloor: "Ground Floor (Stack 321.00 - 424.99)",
    prefix: "C",
    description: "Sociology, economics, law, education, and government institutions.",
    popularTopics: ["Economics", "Education (370)", "Philippine Law", "Sociology"]
  },
  {
    classCode: "400 - 499",
    title: "Language",
    psauFloor: "Ground Floor",
    prefix: "C",
    description: "Linguistics, English grammar, dictionaries, and foreign languages.",
    popularTopics: ["English Grammar", "Linguistics", "Dictionaries", "Communication"]
  },
  {
    classCode: "500 - 599",
    title: "Pure Sciences & Mathematics",
    psauFloor: "Ground Floor (Stack 425.00 - 612.00)",
    prefix: "C",
    description: "Natural sciences, mathematics, physics, chemistry, biology, and ecology.",
    popularTopics: ["Calculus", "General Chemistry", "Botany", "Ecology"]
  },
  {
    classCode: "600 - 699",
    title: "Technology & Applied Sciences (Agriculture)",
    psauFloor: "Ground Floor (Stack 612.01 - 658.09)",
    prefix: "C",
    description: "PSAU Core Collection: Agronomy, veterinary medicine, forestry, and animal science.",
    popularTopics: ["Crops & Soil", "Veterinary Medicine", "Animal Husbandry", "Forestry"]
  },
  {
    classCode: "700 - 799",
    title: "Arts & Recreation",
    psauFloor: "Ground Floor (West Wall)",
    prefix: "C",
    description: "Visual arts, music, architecture, sports, and recreational activities.",
    popularTopics: ["Architecture", "Music Theory", "Sports Science", "Drawing"]
  },
  {
    classCode: "800 - 899",
    title: "Literature",
    psauFloor: "Ground Floor (West Wall)",
    prefix: "C",
    description: "Poetry, drama, essays, speeches, and international literary criticism.",
    popularTopics: ["World Poetry", "Shakespeare", "Literary Analysis", "Rhetoric"]
  },
  {
    classCode: "900 - 999",
    title: "History & Geography",
    psauFloor: "Ground Floor & 2nd Floor",
    prefix: "C / FIL",
    description: "World history, geography, travel, and historical narratives.",
    popularTopics: ["Philippine History", "Asian Studies", "World Wars", "Geography"]
  },
  {
    classCode: "FIL",
    title: "Filipiniana Section",
    psauFloor: "Second Floor (Dedicated Section)",
    prefix: "FIL",
    description: "Special collection of books by Filipino authors or about the Philippines.",
    popularTopics: ["Rizal Studies", "Philippine Literature", "Kapampangan Culture"]
  }
];

export const DDCQuickReference: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClasses = DDC_CLASSES.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.classCode.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.popularTopics.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <section id="ddc-guide" className="py-16 sm:py-24 bg-slate-900/50 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            <BookMarked className="w-4 h-4" />
            <span>Curriculum Reference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Dewey Decimal Classification (DDC) Guide
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Learn how the PSAU Library organizes books from Class 000 to 900 and Filipiniana.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by topic (e.g. Agriculture, 630, Rizal)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 shadow-inner"
            />
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((item) => (
            <div
              key={item.classCode}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-400 font-mono text-xs font-bold border border-teal-500/20">
                    {item.classCode}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Prefix: <strong className="text-white">{item.prefix}</strong>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center space-x-1.5 text-[11px] text-emerald-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.psauFloor}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {item.popularTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
