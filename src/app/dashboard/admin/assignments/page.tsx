"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, UserPlus, Sparkles, Search, 
  Filter, CheckCircle2, XCircle, ArrowRight,
  ChevronRight, Loader2, Zap, Languages, GraduationCap, Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { getUnassignedStudents, getAvailableVolunteers, assignMatch } from "@/lib/db";
import { suggestMatches } from "@/lib/claude";

export default function AdminAssignmentsPage() {
  const [isMatching, setIsMatching] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [unassigned, available] = await Promise.all([
        getUnassignedStudents(),
        getAvailableVolunteers()
      ]);
      setStudents(unassigned);
      setVolunteers(available);
    } catch (e) {
      console.error("Fetch pool error:", e);
      toast.error("Failed to load student/volunteer pools");
    } finally {
      setLoading(false);
    }
  }

  const handleSuggest = async () => {
    if (students.length === 0 || volunteers.length === 0) {
      toast.error("Need both unassigned students and available volunteers!");
      return;
    }
    setIsMatching(true);
    setSuggestions([]);
    try {
      const result = await suggestMatches(students, volunteers);
      setSuggestions(result);
      toast.success("AI Matching Suggestions ready!");
    } catch (e) {
      console.error("Matching error:", e);
      toast.error("Matching failed. Try again.");
    } finally {
      setIsMatching(false);
    }
  };

  const handleConfirmMatch = async (sId: string, vId: string, reason: string) => {
    try {
      await assignMatch(sId, vId, reason);
      toast.success("Match Confirmed! Live DB Updated.");
      setSuggestions(prev => prev.filter(p => p.studentId !== sId));
      fetchData(); // Refresh pools
    } catch (e) {
      toast.error("Failed to confirm match.");
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Matchmaking</h1>
          <p className="text-foreground/50 mt-1 font-medium italic">"Connecting the right hearts for the best results."</p>
        </div>
        <button 
           onClick={handleSuggest}
           disabled={isMatching || loading}
           className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
        >
          {isMatching ? <Loader2 className="w-6 h-6 animate-spin" /> : (
            <>
              <Sparkles className="w-5 h-5" />
              Suggest Matches
            </>
          )}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Data Pools */}
        <div className="space-y-10">
           <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                 <Users className="w-6 h-6 text-primary" />
                 Unassigned Students ({students.length})
              </h2>
              <div className="space-y-4">
                 {loading ? (
                   <div className="flex justify-center p-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
                 ) : students.length > 0 ? (
                   students.map((s: any) => (
                     <div key={s.id} className="p-6 bg-white rounded-3xl border border-border shadow-sm flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold">
                              {(s.fullName || s.name || "S")[0]}
                           </div>
                           <div>
                              <h4 className="font-bold">{s.fullName || s.name}</h4>
                              <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">{s.grade || s.personalInfo?.age || "Grade 10"} • {s.personalInfo?.state || s.state || "India"}</p>
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                           {(s.subjects || []).slice(0, 2).map((sub: string) => (
                             <div key={sub} className="px-2 py-1 bg-background border border-border rounded-lg text-[10px] font-bold opacity-60">
                                {sub}
                             </div>
                           ))}
                        </div>
                     </div>
                   ))
                 ) : (
                   <p className="text-center py-10 text-foreground/30 font-bold uppercase tracking-widest text-xs">No unassigned students</p>
                 )}
              </div>
           </section>

           <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                 <UserPlus className="w-6 h-6 text-accent" />
                 Available Volunteers ({volunteers.length})
              </h2>
              <div className="space-y-4">
                 {loading ? (
                   <div className="flex justify-center p-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
                 ) : volunteers.length > 0 ? (
                   volunteers.map((v: any) => (
                     <div key={v.id} className="p-6 bg-white rounded-3xl border border-border shadow-sm flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent font-bold">
                              {(v.fullName || v.name || "V")[0]}
                           </div>
                           <div>
                              <h4 className="font-bold">{v.fullName || v.name}</h4>
                              <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Load: {v.studentsAssigned?.length || 0}/3 Sessions</p>
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                           {(v.subjects || []).slice(0, 2).map((sub: string) => (
                             <div key={sub} className="px-2 py-1 bg-accent/5 border border-accent/20 rounded-lg text-[10px] font-bold text-accent">
                                {sub}
                             </div>
                           ))}
                        </div>
                     </div>
                   ))
                 ) : (
                    <p className="text-center py-10 text-foreground/30 font-bold uppercase tracking-widest text-xs">No available volunteers</p>
                 )}
              </div>
           </section>
        </div>

        {/* Right Column: Suggestions */}
        <div className="space-y-8">
           <h2 className="text-xl font-bold flex items-center gap-3">
              <Zap className="w-6 h-6 text-warning" />
              AI Recommendations
           </h2>

           {isMatching ? (
              <div className="p-12 border-4 border-dashed border-border/50 rounded-[3rem] flex flex-col items-center justify-center text-center">
                 <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
                 <h3 className="text-2xl font-extrabold text-foreground/40 mb-2">Analyzing Profiles...</h3>
                 <p className="text-foreground/30 font-bold max-w-xs leading-relaxed uppercase tracking-widest text-[10px]">
                    Matching language preferences, subject expertise, and availability slots using Claude v3.
                 </p>
              </div>
           ) : suggestions.length > 0 ? (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-700">
                 {suggestions.map((match: any, idx: number) => {
                    const student = students.find((s: any) => s.id === match.studentId);
                    const volunteer = volunteers.find((v: any) => v.id === match.volunteerId);
                    return (
                      <div key={idx} className="bg-white rounded-[2.5rem] border-2 border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden group">
                         <div className="p-8 space-y-8">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-10">
                                  <div className="flex flex-col items-center">
                                     <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-2xl font-bold text-primary mb-2">
                                        {(student?.fullName || student?.name || "S")[0]}
                                     </div>
                                     <p className="text-xs font-bold truncate max-w-[80px]">{student?.fullName || student?.name}</p>
                                  </div>
                                  <div className="flex flex-col items-center text-primary/20">
                                     <ArrowRight className="w-8 h-8 animate-pulse" />
                                     <div className="px-3 py-1 bg-primary/5 rounded-full text-[10px] font-bold text-primary mt-2">
                                        {match.confidenceScore ? Math.round(match.confidenceScore * 100) : match.confidence || 95}% Match
                                     </div>
                                  </div>
                                  <div className="flex flex-col items-center">
                                     <div className="w-16 h-16 bg-accent/10 rounded-[1.5rem] flex items-center justify-center text-2xl font-bold text-accent mb-2">
                                        {(volunteer?.fullName || volunteer?.name || "V")[0]}
                                     </div>
                                     <p className="text-xs font-bold truncate max-w-[80px]">{volunteer?.fullName || volunteer?.name}</p>
                                  </div>
                               </div>
                            </div>
                            
                            <div className="p-6 bg-background rounded-3xl border border-border relative">
                               <div className="absolute -top-3 left-6 px-3 py-1 bg-white border border-border rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                                  AI Reasoning
                               </div>
                               <p className="text-sm font-medium text-foreground/70 leading-relaxed italic">
                                  "{match.reason}"
                               </p>
                            </div>

                            <div className="flex gap-4">
                               <button 
                                 onClick={() => handleConfirmMatch(match.studentId, match.volunteerId, match.reason)}
                                 className="flex-1 py-4 bg-accent text-white rounded-2xl font-bold shadow-xl shadow-accent/20 hover:bg-accent/90 transition-all flex items-center justify-center gap-3"
                               >
                                  Confirm Match
                                  <CheckCircle2 className="w-5 h-5" />
                               </button>
                               <button 
                                 onClick={() => setSuggestions(prev => prev.filter(p => p.studentId !== match.studentId))}
                                 className="p-4 bg-white border border-border rounded-2xl text-foreground/30 hover:text-danger hover:border-danger hover:bg-danger/5 transition-all"
                               >
                                  <XCircle className="w-6 h-6" />
                               </button>
                            </div>
                         </div>
                      </div>
                    );
                 })}
              </div>
           ) : (
              <div className="h-full min-h-[400px] border-4 border-dashed border-border/50 rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center">
                 <Sparkles className="w-16 h-16 text-foreground/10 mb-6" />
                 <h3 className="text-2xl font-extrabold text-foreground/30 mb-2">No active matches</h3>
                 <p className="text-foreground/20 font-bold max-w-xs leading-relaxed uppercase tracking-widest text-[10px]">
                    Click "Suggest Matches" to let Claude analyze student needs and volunteer skills.
                 </p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
