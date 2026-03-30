"use client";

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function NgoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar with the specific 'ngo' role config injected */}
      <Sidebar role="ngo" />
      <main className="flex-1 overflow-y-auto outline-none p-4 md:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
