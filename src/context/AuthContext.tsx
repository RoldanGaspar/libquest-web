"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { StudentRecord } from "@/types/student";

interface AuthContextType {
  user: User | null;
  studentProfile: StudentRecord | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (
    email: string, 
    pass: string, 
    fullName: string, 
    studentId: string, 
    characterType: "Boy" | "Girl"
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  studentProfile: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setStudentProfile(userDoc.data() as StudentRecord);
          } else {
            // Default student fallback if doc does not exist yet
            setStudentProfile({
              uid: currentUser.uid,
              fullName: currentUser.displayName || "Student",
              email: currentUser.email || "",
              studentId: "C2024-UNKNOWN",
              characterType: "Boy",
              role: "student",
              createdAt: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setStudentProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    // Built-in Local Demo / Dev Admin fallback.
    // Development builds only: in a deployed build this branch is skipped entirely, so the
    // portal always authenticates against Firebase and the fixed demo password grants nothing.
    if (
      process.env.NODE_ENV === "development" &&
      (email.toLowerCase() === "admin@psau.edu.ph" || email.toLowerCase().includes("admin")) &&
      (pass === "admin123" || pass === "admin123456")
    ) {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
      } catch {
        console.info("[AuthContext] Activated local development admin session.");
        const demoAdminProfile: StudentRecord = {
          uid: "demo_admin_uid",
          fullName: "HEAD LIBRARIAN",
          email: email.toLowerCase(),
          studentId: "C-ADMIN-01",
          characterType: "Boy",
          role: "admin",
          createdAt: new Date().toISOString(),
        };
        setUser({
          uid: "demo_admin_uid",
          email: email.toLowerCase(),
          displayName: "Head Librarian",
        } as User);
        setStudentProfile(demoAdminProfile);
        return;
      }
    } else {
      await signInWithEmailAndPassword(auth, email, pass);
    }
  };

  const register = async (
    email: string,
    pass: string,
    fullName: string,
    studentId: string,
    characterType: "Boy" | "Girl"
  ) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const newUser = userCredential.user;

    const newProfile: StudentRecord = {
      uid: newUser.uid,
      fullName: fullName.toUpperCase(),
      email,
      studentId: studentId.toUpperCase().startsWith("C") ? studentId.toUpperCase() : `C${studentId.toUpperCase()}`,
      characterType,
      role: "student",
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, "users", newUser.uid), newProfile);
      setStudentProfile(newProfile);
    } catch (e) {
      console.warn("Could not write user profile to Firestore (may be in offline/demo mode):", e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
    setStudentProfile(null);
  };

  const isAdmin = Boolean(
    studentProfile?.role === "admin" || (user?.email && user.email.toLowerCase().includes("admin"))
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        studentProfile,
        isAdmin,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
