"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Calendar, Award, Zap, TrendingUp, Play, 
  ArrowRight, BookOpen, Star, Sparkles, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getStudentProfile, getSessionsForUser, getUpcomingWorkshops } from "@/lib/db";

export default function StudentDashboardHome() {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      if (!user) return;
      try {
        const [profile, sessions, upcomingWorkshops] = await Promise.all([
          getStudentProfile(user.uid),
          getSessionsForUser(user.uid, "student"),
          getUpcomingWorkshops()
        ]);

        setStudentData(profile);
        // Get the latest upcoming session
        const upcoming = sessions.find((s: any) => s.status === "scheduled");
        setSession(upcoming);
        setWorkshops(upcomingWorkshops.slice(0, 3));
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const STATS = [
    { label: "Sessions", value: studentData?.sessionCount || "0", icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
    { label: "Skills", value: studentData?.curiosities?.length || "0", icon: Award, iconColor: "text-accent", bg: "bg-accent/10" },
    { label: "Streak", value: studentData?.streak || "0", suffix: " days", icon: Zap, iconColor: "text-warning", bg: "bg-warning/10" },
    { label: "Badges", value: studentData?.badges?.length || "0", icon: Star, iconColor: "text-indigo-500", bg: "bg-indigo-500/10" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, <span className="text-primary">{user?.name}</span>! 👋
          </h1>
          <p className="text-foreground/50 mt-1 font-medium">
            {studentData?.status === "unassigned" 
              ? "We're matching you with a mentor. Hang tight!" 
              : "You're doing great! Keep up the learning streak."}
          </p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-warning/10 border border-warning/20 rounded-2xl">
           <Zap className="w-5 h-5 text-warning fill-warning" />
           <span className="font-bold text-warning-foreground">{studentData?.streak || 0} Day Streak</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <div key={idx} className="p-6 bg-white rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.iconColor || stat.color)} />
             </div>
             <p className="text-foreground/50 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
             <h3 className="text-2xl font-bold mt-1">
                {stat.value}
                <span className="text-base font-medium text-foreground/40">{stat.suffix}</span>
             </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Session or Empty State */}
          {session ? (
            <section className="p-8 bg-primary rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Calendar className="w-32 h-32" />
               </div>
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold border border-white/30">
                        {session.mentorName?.[0] || "M"}
                     </div>
                     <div>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">Upcoming Session</span>
                        <h3 className="text-2xl font-bold mt-2">{session.title || "Learning Session"}</h3>
                        <p className="text-white/80 font-medium">{session.mentorName} • {session.subject}</p>
                     </div>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                     <p className="font-bold flex items-center gap-2">
                       <Play className="w-4 h-4" />
                       {new Date(session.scheduledAt?.seconds * 1000).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                     </p>
                     <button className="w-full md:w-auto px-8 py-3 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg">
                        Join Session
                     </button>
                  </div>
               </div>
            </section>
          ) : (
            <section className="p-10 bg-white border border-dashed border-primary/30 rounded-[2.5rem] text-center flex flex-col items-center justify-center">
               <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="w-10 h-10 text-primary/40" />
               </div>
               <h3 className="text-xl font-bold mb-2">No sessions scheduled</h3>
               <p className="text-foreground/50 max-w-xs mx-auto mb-8">
                 {studentData?.assignedVolunteerId 
                  ? "Reach out to your mentor to schedule your next session."
                  : "Hang tight! We'll notify you as soon as you're matched with a mentor."}
               </p>
               <Link href="/dashboard/student/sessions" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Book a Session
               </Link>
            </section>
          )}

          {/* Recommended Workshops */}
          <section>
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-accent" />
                  Recommended Workshops
               </h2>
               <Link href="/dashboard/student/workshops" className="text-primary font-bold hover:underline">View All</Link>
            </div>
            {workshops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {workshops.map((w, idx) => (
                   <div key={idx} className="p-6 bg-white rounded-3xl border border-border hover:shadow-xl transition-all group">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                         <Zap className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-lg mb-1">{w.title}</h4>
                      <p className="text-sm text-foreground/50 font-medium mb-4">{w.mentorName} • {w.skillCategory}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                         <span className="text-xs font-bold text-accent">{w.maxStudents - (w.registeredStudents?.length || 0)} seats left</span>
                         <button className="text-primary">
                            <ArrowRight className="w-5 h-5" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="p-12 bg-background rounded-3xl text-center">
                 <p className="text-foreground/40 font-medium italic">No workshops available right now. Check back soon!</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar Status (Right) */}
        <div className="space-y-8">
           {/* Progress Snapshot */}
           <section className="p-8 bg-white rounded-[2.5rem] border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                 <TrendingUp className="w-5 h-5 text-primary" />
                 Subject Progress
              </h2>
              <div className="space-y-6">
                 {studentData?.subjects?.length > 0 ? (
                   studentData.subjects.slice(0, 3).map((sub: string, idx: number) => (
                      <div key={idx} className="space-y-2">
                         <div className="flex items-center justify-between text-sm font-bold">
                            <span>{sub}</span>
                            <span className="text-foreground/40">{Math.floor(Math.random() * 40) + 60}%</span>
                         </div>
                         <div className="h-2 bg-background rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all duration-1000", idx % 3 === 0 ? "bg-primary" : idx % 3 === 1 ? "bg-accent" : "bg-warning")} style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }} />
                         </div>
                      </div>
                   ))
                 ) : (
                    <p className="text-sm text-foreground/40 italic">Complete your profile to see progress.</p>
                 )}
              </div>
              <button className="w-full mt-8 py-3 bg-background border border-border rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/5 hover:text-primary transition-all">
                 View Detailed Report
                 <ArrowRight className="w-4 h-4" />
              </button>
           </section>

           {/* Quick Action AI */}
           <section className="p-8 bg-gradient-to-br from-indigo-500 to-primary rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                 <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Stuck on a topic?</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed font-medium">
                 Ask your AI Study Buddy for a simple explanation in any language.
              </p>
              <Link href="/dashboard/student/ai-buddy" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg">
                 Start Chatting
                 <ArrowRight className="w-4 h-4" />
              </Link>
           </section>
        </div>
      </div>
    </div>
  );
}

function Bot({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

