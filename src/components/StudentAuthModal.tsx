"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, User, Mail, Lock, IdCard, AlertCircle, Loader2, Sparkles } from "lucide-react";

interface StudentAuthModalProps {
  isOpen: boolean;
  initialMode?: "login" | "register";
  onClose: () => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  initialMode = "login",
  onClose,
}) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("C");
  const [characterType, setCharacterType] = useState<"Boy" | "Girl">("Boy");

  // State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase();
    if (!val.startsWith("C")) {
      val = "C" + val.replace(/C/g, "");
    }
    setStudentId(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        if (!fullName.trim()) {
          throw new Error("Please enter your full name.");
        }
        if (studentId.length <= 1 || studentId === "C") {
          throw new Error("Please enter a valid PSAU Student ID (e.g. C2024-01234).");
        }
        await register(email, password, fullName, studentId, characterType);
      }
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-white my-auto overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="p-5 sm:p-8 overflow-y-auto overscroll-contain">
          {/* Modal Header */}
          <div className="text-center mb-5 sm:mb-6 pr-6 sm:pr-0">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">
              {mode === "login" ? "Sign In to LibQuest" : "Register Student Account"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {mode === "login"
                ? "Access your student orientation profile and achievements."
                : "Create your student account to sync progress and access the library orientation."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl mb-5 sm:mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMessage("");
              }}
              className={`py-2 rounded-lg transition-all ${
                mode === "login"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErrorMessage("");
              }}
              className={`py-2 rounded-lg transition-all ${
                mode === "register"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {mode === "register" && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. JUAN DELA CRUZ"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value.toUpperCase())}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Student ID */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    PSAU Student ID (Starts with C)
                  </label>
                  <div className="relative">
                    <IdCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      maxLength={15}
                      value={studentId}
                      onChange={handleStudentIdChange}
                      placeholder="C2024-00123"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Character Type Selection */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1">In-Game Character</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCharacterType("Boy")}
                      className={`py-2 px-3 rounded-lg border text-center transition-all ${
                        characterType === "Boy"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      Boy Cadet
                    </button>
                    <button
                      type="button"
                      onClick={() => setCharacterType("Girl")}
                      className={`py-2 px-3 rounded-lg border text-center transition-all ${
                        characterType === "Girl"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      Girl Cadet
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="student@psau.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 rounded-lg font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{mode === "login" ? "Sign In" : "Complete Registration"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
