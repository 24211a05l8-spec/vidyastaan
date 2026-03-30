"use client";

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute requiredRole="student">
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar role="student" />
        <main className="flex-1 overflow-y-auto outline-none p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
}
