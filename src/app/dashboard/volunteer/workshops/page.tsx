"use client";

import React, { useState } from "react";
import { 
  Plus, Calendar, Clock, Users, 
  Search, Filter, MapPin, Video, 
  MoreHorizontal, ChevronRight, CheckCircle2, AlertCircle, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const WORKSHOPS = [
  { id: "1", title: "Introduction to Python", skill: "Coding", date: "Friday, April 5", time: "5:00 PM", duration: "1 Hour", students: 12, maxStudents: 20, status: "approved", mode: "online" },
  { id: "2", title: "Public Speaking 101", skill: "Soft Skills", date: "Monday, April 8", time: "4:00 PM", duration: "45 min", students: 8, maxStudents: 10, status: "pending", mode: "online" },
  { id: "3", title: "Financial Literacy", skill: "Finance", date: "Last Saturday", time: "11:00 AM", duration: "1 Hour", students: 15, maxStudents: 15, status: "completed", mode: "in-person" },
];

export default function VolunteerWorkshopsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");

  const filtered = WORKSHOPS.filter(w => 
    activeTab === "upcoming" ? w.status !== "completed" : w.status === "completed"
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Workshops</h1>
          <p className="text-foreground/50 mt-1 font-medium italic">"Sharing knowledge is the best way to multiply it."</p>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="w-full md:w-auto px-8 py-3 bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Create New Workshop
        </button>
      </header>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-[2.5rem] border border-border shadow-sm">
         <div className="flex p-1.5 bg-background rounded-2xl w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab("upcoming")}
              className={cn(
                "flex-1 sm:flex-none px-8 py-2.5 rounded-xl font-bold text-sm transition-all",
                activeTab === "upcoming" ? "bg-white text-accent shadow-sm" : "text-foreground/40 hover:text-foreground/60"
              )}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setActiveTab("completed")}
              className={cn(
                "flex-1 sm:flex-none px-8 py-2.5 rounded-xl font-bold text-sm transition-all",
                activeTab === "completed" ? "bg-white text-accent shadow-sm" : "text-foreground/40 hover:text-foreground/60"
              )}
            >
              Completed
            </button>
         </div>
         <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
               <input 
                 type="text" 
                 placeholder="Search workshops..."
                 className="pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm font-medium outline-none"
               />
            </div>
            <button className="p-2.5 bg-background border border-border rounded-xl text-foreground/40 hover:text-accent">
               <Filter className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* Workshops List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((w) => (
          <div key={w.id} className="p-8 bg-white rounded-[2.5rem] border border-border shadow-sm hover:shadow-2xl transition-all duration-300 group">
             <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/5 flex items-center justify-center text-accent">
                      <Sparkles className="w-7 h-7" />
                   </div>
                   <div>
                      <h3 className="font-bold text-lg">{w.title}</h3>
                      <p className="text-sm text-foreground/50 font-medium">{w.skill}</p>
                   </div>
                </div>
                {w.status === "approved" ? (
                  <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1.5">
                     <CheckCircle2 className="w-3 h-3" />
                     Approved
                  </div>
                ) : w.status === "pending" ? (
                  <div className="px-3 py-1 bg-warning/10 border border-warning/20 rounded-full text-[10px] font-bold text-warning uppercase tracking-widest flex items-center gap-1.5">
                     <Clock className="w-3 h-3" />
                     Pending
                  </div>
                ) : (
                  <div className="px-3 py-1 bg-background border border-border rounded-full text-[10px] font-bold text-foreground/40 uppercase tracking-widest flex items-center gap-1.5">
                     <CheckCircle2 className="w-3 h-3" />
                     Completed
                  </div>
                )}
             </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-background rounded-2xl flex items-center gap-3">
                   <Calendar className="w-5 h-5 text-accent opacity-60" />
                   <span className="text-xs font-bold">{w.date}</span>
                </div>
                <div className="p-4 bg-background rounded-2xl flex items-center gap-3">
                   <Clock className="w-5 h-5 text-accent opacity-60" />
                   <span className="text-xs font-bold">{w.time}</span>
                </div>
                <div className="p-4 bg-background rounded-2xl flex items-center gap-3">
                   <Users className="w-5 h-5 text-accent opacity-60" />
                   <span className="text-xs font-bold">{w.students}/{w.maxStudents} Registered</span>
                </div>
                <div className="p-4 bg-background rounded-2xl flex items-center gap-3">
                   {w.mode === "online" ? <Video className="w-5 h-5 text-accent opacity-60" /> : <MapPin className="w-5 h-5 text-accent opacity-60" />}
                   <span className="text-xs font-bold capitalize">{w.mode}</span>
                </div>
             </div>

             <div className="flex items-center gap-3">
                <button className="flex-1 py-3 bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                   View Attendees
                </button>
                <button className="p-3 border border-border rounded-xl font-bold text-foreground/40 hover:text-primary transition-all">
                   <MoreHorizontal className="w-5 h-5" />
                </button>
             </div>
          </div>
        ))}

        {/* Create Card Placeholder */}
        {activeTab === "upcoming" && (
          <button 
            onClick={() => setShowCreate(true)}
            className="p-8 border-4 border-dashed border-border/50 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:bg-accent/5 hover:border-accent/40 transition-all min-h-[300px]"
          >
             <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
                <Plus className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-foreground/40">Host a New Workshop</h3>
             <p className="text-sm font-medium text-foreground/30 mt-2 max-w-[200px]">
                Create an engaging session for students on any skill.
             </p>
          </button>
        )}
      </div>

      {/* Modal Placeholder */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-md animate-in fade-in">
           <div className="bg-white rounded-[3rem] p-10 max-w-xl w-full shadow-2xl relative">
              <button 
                onClick={() => setShowCreate(false)}
                className="absolute top-8 right-8 p-2 hover:bg-background rounded-xl transition-all"
              >
                 <ChevronRight className="w-6 h-6 rotate-90" />
              </button>
              <h2 className="text-2xl font-extrabold mb-8 tracking-tight">Create Workshop</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success("Workshop submitted for approval!"); setShowCreate(false); }}>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Workshop Title *</label>
                    <input type="text" required placeholder="e.g. Creative Writing Basics" className="w-full p-4 border rounded-2xl font-bold outline-none" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Date *</label>
                       <input type="date" required className="w-full p-4 border rounded-2xl font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Time *</label>
                       <input type="time" required className="w-full p-4 border rounded-2xl font-bold outline-none" />
                    </div>
                 </div>
                 <button type="submit" className="w-full py-4 bg-accent text-white rounded-2xl font-bold shadow-xl shadow-accent/20">
                    Submit for Approval
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
