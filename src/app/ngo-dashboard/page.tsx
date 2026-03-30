"use client";

import React from "react";
import { Users, GraduationCap, CalendarCheck, Target, Activity } from "lucide-react";
import { ngoStats } from "@/lib/ngoMockData";

export default function NgoDashboardOverview() {
  const cards = [
    { title: "Total Students", value: ngoStats.totalStudents, icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Verified Volunteers", value: ngoStats.totalVolunteers, icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Active Sessions", value: ngoStats.activeSessions, icon: CalendarCheck, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Lessons Completed", value: ngoStats.completedLessons, icon: Target, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">NGO Command Center</h1>
          <p className="text-slate-500 font-bold mt-1">Platform Impact Overview</p>
        </div>
        <div className="px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-full font-black text-sm flex items-center gap-2 border border-emerald-100">
           <Activity className="w-5 h-5 animate-pulse" />
           +{ngoStats.growthRate}% M/M Growth
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((kpi, idx) => (
          <div key={idx} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
             <div className={`w-14 h-14 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <kpi.icon className="w-7 h-7" />
             </div>
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{kpi.title}</p>
             <h2 className="text-4xl font-black text-slate-800 mt-2">{kpi.value.toLocaleString()}</h2>
          </div>
        ))}
      </div>

      {/* Basic Activity Graph Placeholder */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
         <h3 className="text-xl font-black text-slate-800 mb-6">Recent Platform Activity</h3>
         <div className="h-64 w-full rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center flex-col gap-4 text-slate-400 font-bold">
            <Activity className="w-8 h-8 opacity-50" />
            <p>Live matching charts and session history map will render here.</p>
         </div>
      </div>
    </div>
  );
}
