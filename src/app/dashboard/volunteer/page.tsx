"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Users, Calendar, Wrench, Heart, Play, 
  ArrowRight, Clock, CheckCircle2, AlertCircle, Sparkles, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getVolunteerProfile, getSessionsForUser, getStudentsForVolunteer } from "@/lib/db";

export default function VolunteerDashboardHome() {
  const { user } = useAuth();
  const [volunteerData, setVolunteerData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      if (!user) return;
      try {
        const [profile, assignedStudents, volunteerSessions] = await Promise.all([
          getVolunteerProfile(user.uid),
          getStudentsForVolunteer(user.uid),
          getSessionsForUser(user.uid, "volunteer")
        ]);

        setVolunteerData(profile);
        setStudents(assignedStudents);
        setSessions(volunteerSessions);
      } catch (error) {
        console.error("Volunteer dashboard fetch error:", error);
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

  const upcomingTasks = sessions
    .filter(s => s.status === "scheduled")
    .map(s => ({
      id: s.id,
      type: "session",
      title: `${s.subject}: ${s.topic || "Scheduled Session"}`,
      student: s.studentName,
      time: new Date(s.scheduledAt?.seconds * 1000).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
    }))
    .slice(0, 3);

  const STATS = [
    { label: "Students", value: students.length.toString(), icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { label: "Sessions", value: volunteerData?.sessionCount || "0", icon: Calendar, color: "text-accent", bg: "bg-accent/10" },
    { label: "Workshops", value: volunteerData?.workshopCount || "0", icon: Wrench, color: "text-warning", bg: "bg-warning/10" },
    { label: "Impact Score", value: volunteerData?.impactScore?.toFixed(1) || "0.0", icon: Heart, color: "text-danger", bg: "bg-danger/10" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <h1 className="text-3xl font-extrabold tracking-tight">
               Namaste, <span className="text-primary">{user?.name}</span>! 🙏
             </h1>
             <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                Verified Mentor
             </div>
          </div>
          <p className="text-foreground/50 font-medium italic">"To teach is to learn twice." — Your impact this week has been incredible.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
           <Link href="/dashboard/volunteer/sessions/new" className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-center">
              New Session
           </Link>
           <Link href="/dashboard/volunteer/students" className="px-6 py-3 bg-white border border-border rounded-xl font-bold text-sm hover:bg-background transition-all text-center">
              View Students
           </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <div key={idx} className="p-8 bg-white rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
                <stat.icon className={cn("w-7 h-7", stat.color)} />
             </div>
             <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
             <h3 className="text-3xl font-extrabold tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Upcoming Sessions / Actions */}
         <section className="space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  Upcoming & Pending
               </h2>
               <Link href="/dashboard/volunteer/sessions" className="text-primary font-bold text-sm hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
               {upcomingTasks.length > 0 ? (
                 upcomingTasks.map((task) => (
                   <div key={task.id} className="p-6 bg-white rounded-3xl border border-border hover:shadow-lg transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-5">
                         <div className={cn(
                           "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 bg-primary/10 text-primary"
                         )}>
                            <Play className="w-5 h-5 fill-primary" />
                         </div>
                         <div>
                            <h4 className="font-bold text-lg">{task.title}</h4>
                            <p className="text-sm font-medium text-foreground/40 italic">
                               {task.student} • {task.time}
                            </p>
                         </div>
                      </div>
                      <Link href={`/dashboard/volunteer/sessions/${task.id}`} className="p-3 rounded-xl transition-all text-primary bg-primary/5 hover:bg-primary/10">
                         <ArrowRight className="w-5 h-5" />
                      </Link>
                   </div>
                 ))
               ) : (
                  <div className="p-10 bg-background border border-dashed border-border rounded-[2.5rem] text-center">
                     <p className="text-foreground/40 font-medium italic">No upcoming sessions today.</p>
                     <Link href="/dashboard/volunteer/sessions/new" className="text-primary font-bold text-sm mt-2 inline-block">Schedule one now</Link>
                  </div>
               )}
            </div>
            <Link href="/dashboard/volunteer/calendar" className="block w-full py-4 bg-background border border-dashed border-border rounded-3xl text-center font-bold text-foreground/40 hover:text-primary hover:border-primary transition-all">
               View Full Calendar
            </Link>
         </section>

         {/* AI Tools Preview */}
         <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
               <Sparkles className="w-6 h-6 text-indigo-500" />
               Mentor AI Tools
            </h2>
            <div className="grid grid-cols-1 gap-6">
               <div className="p-8 bg-gradient-to-br from-indigo-600 to-primary rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-150 transition-transform duration-700">
                     <Wrench className="w-48 h-48" />
                  </div>
                  <div className="relative z-10">
                     <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                        <Calendar className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-extrabold mb-3">Lesson Plan Generator</h3>
                     <p className="text-white/80 font-medium mb-8 max-w-sm leading-relaxed">
                        Generate a structured, curriculum-aligned 45-min lesson plan for any grade or subject in seconds.
                     </p>
                     <Link href="/dashboard/volunteer/ai-tools?tool=lesson-plan" className="inline-flex px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold shadow-lg hover:bg-white/90 transition-all items-center gap-2">
                        Try It Now
                        <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
               </div>

               <Link href="/dashboard/volunteer/ai-tools?tool=workshop" className="p-8 bg-white rounded-[2.5rem] border border-border shadow-sm flex items-center justify-between hover:border-primary/30 transition-all group">
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-7 h-7" />
                     </div>
                     <div>
                        <h4 className="text-xl font-bold">Workshop Outline</h4>
                        <p className="text-foreground/50 font-medium">Create engaging session flows</p>
                     </div>
                  </div>
                  <div className="p-4 bg-background border border-border rounded-2xl group-hover:text-primary transition-all">
                     <ArrowRight className="w-5 h-5" />
                  </div>
               </Link>
            </div>
         </section>
      </div>
    </div>
  );
}

