"use client";

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute requiredRole="admin">
      <div className="flex h-screen bg-background overflow-hidden text-foreground">
        <Sidebar role="admin" />
        <main className="flex-1 overflow-y-auto outline-none p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
}
