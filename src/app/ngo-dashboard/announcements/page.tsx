"use client";

import React from "react";
import { Megaphone, Plus, BellRing, Users } from "lucide-react";
import { mockAnnouncements } from "@/lib/ngoMockData";

export default function NGOAnnouncements() {
  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
         <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
               <Megaphone className="w-8 h-8 text-rose-500" />
               Platform Announcements
            </h1>
            <p className="text-slate-500 font-bold mt-2">Broadcast updates across your network of volunteers and students.</p>
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white font-black rounded-2xl shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-5 h-5" />
            New Broadcast
         </button>
      </div>

      {/* Feed Column */}
      <div className="max-w-4xl space-y-6">
         {mockAnnouncements.map((announcement) => (
            <div key={announcement.id} className="flex gap-6 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
               <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                  <BellRing className="w-8 h-8 text-rose-500 group-hover:rotate-12 transition-transform" />
               </div>
               <div className="flex-1 space-y-4">
                  <div>
                     <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{announcement.date}</p>
                     <h2 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-rose-600 transition-colors">
                        {announcement.title}
                     </h2>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-500">
                     <Users className="w-4 h-4 opacity-50" />
                     Sent to: <span className="text-slate-800">{announcement.audience}</span>
                  </div>

                  <p className="text-slate-500 font-medium leading-relaxed">
                     This is a placeholder description for the announcement content block. Detailed descriptions, curriculum links, or Zoom meeting passwords would be securely rendered here for the target audience to digest.
                  </p>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
