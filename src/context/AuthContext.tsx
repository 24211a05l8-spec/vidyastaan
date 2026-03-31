"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db, isConfigured } from "@/lib/firebase";

type Role = "student" | "volunteer" | "admin" | null;

interface User {
  uid: string;
  email: string | null;
  role: Role;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<FirebaseUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Try to get user document from database
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: userData.role || "student",
              name: userData.name || firebaseUser.displayName || "",
            });
          } else {
            // User just registered or document doesn't exist yet
            // Try to get from students collection
            const studentDoc = await getDoc(doc(db, "students", firebaseUser.uid));
            
            if (studentDoc.exists()) {
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                role: "student",
                name: studentDoc.data()?.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "Guest",
              });
            } else {
              // New user without document, default to student
              console.log("No user document found for:", firebaseUser.uid, "- defaulting to student");
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                role: "student",
                name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "Guest",
              });
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Still set user even if doc fetch failed
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: "student",
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "Guest",
          });
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!isConfigured) {
      throw new Error("Firebase is not configured. Please add Firebase environment variables to .env.local");
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    if (!isConfigured) {
      throw new Error("Firebase is not configured. Please add Firebase environment variables to .env.local");
    }
    return await createUserWithEmailAndPassword(auth, email, password).then(cred => cred.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

