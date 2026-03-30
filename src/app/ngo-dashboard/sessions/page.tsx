"use client";

import React, { useState } from "react";
import { Calendar, Video, MapPin, CheckCircle2, Clock, Plus, BookOpen } from "lucide-react";
import { mockSessions } from "@/lib/ngoMockData";

export default function SessionsManagement() {
  const [filter, setFilter] = useState<"All" | "Upcoming" | "Completed">("All");

  const filteredSessions = filter === "All" 
    ? mockSessions 
    : mockSessions.filter(s => s.status === filter);

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
         <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
               <Calendar className="w-8 h-8 text-primary" />
               Class Schedule
            </h1>
            <p className="text-slate-500 font-bold mt-2">Monitor active teaching sessions and organize new ones.</p>
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-5 h-5" />
            Schedule Session
         </button>
      </div>

      {/* Filters */}
      <div className="flex bg-white border border-slate-100 p-2 rounded-2xl shadow-sm w-fit">
         {["All", "Upcoming", "Completed"].map(status => (
            <button
               key={status}
               onClick={() => setFilter(status as any)}
               className={`px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                  filter === status 
                    ? "bg-slate-800 text-white shadow-md shadow-slate-800/20" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
               }`}
            >
               {status}
            </button>
         ))}
      </div>

      {/* Sessions Grid */}
      <div className="grid md:grid-cols-2 gap-6">
         {filteredSessions.map((session) => {
            const isCompleted = session.status === "Completed";
            
            return (
               <div key={session.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        isCompleted ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                     }`}>
                        {session.status}
                     </span>
                     <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        {session.type === "Zoom" ? <Video className="w-4 h-4 text-primary" /> : <MapPin className="w-4 h-4 text-emerald-500" />}
                        {session.type}
                     </span>
                  </div>

                  <div className="space-y-6 flex-1">
                     <div>
                        <h2 className="text-2xl font-black text-slate-800 mb-1 leading-tight group-hover:text-primary transition-colors">{session.topic}</h2>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mt-2">
                           <Clock className="w-4 h-4" />
                           {session.date} • {session.time}
                        </div>
                     </div>

                     <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Student</p>
                           <p className="font-bold text-slate-800 truncate">{session.student}</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200 shrink-0" />
                        <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Volunteer</p>
                           <p className="font-bold text-slate-800 truncate">{session.volunteer}</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                     {isCompleted ? (
                        <div className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 text-emerald-600 font-black rounded-2xl border-2 border-dashed border-emerald-100">
                           <CheckCircle2 className="w-5 h-5" />
                           Session Completed
                        </div>
                     ) : (
                        <>
                           <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:bg-indigo-700 transition-colors">
                              <Video className="w-5 h-5" />
                              Join Class
                           </button>
                           <button className="px-6 py-3 bg-slate-50 text-slate-500 font-black rounded-2xl border border-slate-200 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                              Edit
                           </button>
                        </>
                     )}
                  </div>
               </div>
            );
         })}
      </div>
    </div>
  );
}
