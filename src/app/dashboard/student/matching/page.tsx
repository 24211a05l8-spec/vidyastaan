"use client";

import React, { useMemo } from "react";
import { Users, GraduationCap, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SAMPLE_STUDENT, SAMPLE_VOLUNTEERS, rankVolunteers } from "@/lib/matchingUtils";

export default function StudentMatchingPage() {
  const student = SAMPLE_STUDENT;
  
  // Rank volunteers efficiently on render using our utility function
  const rankedMatches = useMemo(() => {
    return rankVolunteers(student, SAMPLE_VOLUNTEERS);
  }, [student]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
        <div className="space-y-2">
           <h1 className="text-4xl font-black tracking-tight text-slate-800">Find your <span className="text-primary italic">Mentor</span></h1>
           <p className="text-slate-500 font-bold flex items-center gap-2">
             <Users className="w-5 h-5 text-primary" />
             Connecting you with the perfect volunteer
           </p>
        </div>

        {/* Current Student Profile Mock View */}
        <div className="px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4">
           <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xl">
             {student.name[0]}
           </div>
           <div>
             <p className="text-xs font-black uppercase tracking-widest text-slate-400">Your Interests</p>
             <p className="font-bold text-slate-700">{student.interests.join(", ")}</p>
           </div>
        </div>
      </header>

      {/* Match Results */}
      <section className="space-y-6">
        <h2 className="text-xl font-black px-4 text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Recommended For You
        </h2>

        {rankedMatches.length === 0 ? (
          <div className="p-16 text-center bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem]">
             <p className="text-slate-400 font-black italic text-xl">No suitable volunteers found...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {rankedMatches.map((match, idx) => {
              const isTopMatch = idx === 0 && match.score > 0;
              
              return (
                <div 
                  key={match.name} 
                  className={cn(
                    "relative p-8 rounded-[2.5rem] border shadow-sm transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6",
                    isTopMatch 
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-emerald-500/10" 
                      : "bg-white border-slate-100 hover:border-primary/20 hover:shadow-xl"
                  )}
                >
                  <div className="flex items-center gap-6">
                     <div className={cn(
                       "w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm",
                       isTopMatch ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-500 border border-slate-200"
                     )}>
                       {match.name[0]}
                     </div>
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                         <h3 className={cn("text-2xl font-black", isTopMatch ? "text-emerald-900" : "text-slate-800")}>
                           {match.name}
                         </h3>
                         {isTopMatch && (
                           <div className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-sm">
                             <CheckCircle2 className="w-3.5 h-3.5" /> Best Match
                           </div>
                         )}
                       </div>
                       
                       <div className="flex items-center gap-2 text-sm font-bold opacity-70">
                         <GraduationCap className="w-4 h-4" />
                         {match.skills.join(", ")}
                       </div>
                     </div>
                  </div>

                  {/* Score Indicator */}
                  <div className="flex items-center gap-3 ml-auto md:ml-0">
                     <div className="text-right">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Match Score</p>
                       <p className={cn("text-3xl font-black", isTopMatch ? "text-emerald-600" : "text-slate-800")}>
                         {match.score}
                       </p>
                     </div>
                     <div className={cn(
                       "w-12 h-12 rounded-xl flex items-center justify-center",
                       isTopMatch ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-400"
                     )}>
                       <Award className="w-6 h-6" />
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
