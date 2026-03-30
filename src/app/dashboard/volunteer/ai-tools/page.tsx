"use client";

import React, { useState } from "react";
import { 
  Wrench, BookOpen, Clock, Target, 
  Sparkles, Download, Copy, RefreshCcw, 
  Loader2, ArrowRight, ChevronRight, ListChecks
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { generateLessonPlan } from "@/lib/claude";

export default function LessonPlanGeneratorPage() {
  const [grade, setGrade] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade || !topic) return;
    
    setLoading(true);
    setPlan(null);

    try {
      const generatedPlan = await generateLessonPlan(topic, grade);
      setPlan(generatedPlan);
      toast.success("Lesson plan generated successfully!");
    } catch (error: any) {
      console.error("Plan generation error:", error);
      toast.error(error.message || "Failed to generate plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <header className="mb-12 text-center md:text-left">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl font-extrabold tracking-tight">AI Lesson Plan Generator</h1>
               <p className="text-foreground/50 mt-1 font-medium">Create world-class teaching materials in seconds.</p>
            </div>
            <div className="flex gap-3">
               <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  Powered by Claude
               </div>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Input Form (Left) */}
         <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-xl shadow-primary/5 sticky top-28">
               <form onSubmit={handleGenerate} className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-foreground/70 mb-1 block uppercase tracking-widest">Target Grade *</label>
                     <select 
                        required
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full p-4 border rounded-2xl bg-background font-bold outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-sm"
                     >
                        <option value="">Select Grade</option>
                        {["Grade 1-5", "Grade 6-8", "Grade 9-10", "Intermediate"].map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-foreground/70 mb-1 block uppercase tracking-widest">Subject / Topic *</label>
                     <input 
                        type="text" 
                        required
                        placeholder="e.g. Gravity, Fractions, SQL Basics"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-4 border rounded-2xl bg-background font-bold outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                     />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading || !grade || !topic}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                  >
                     {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                       <>
                         <Sparkles className="w-5 h-5" />
                         Generate Plan
                       </>
                     )}
                  </button>
               </form>
               
               <div className="mt-8 pt-8 border-t border-border space-y-4">
                  <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Tips</p>
                  <ul className="text-xs text-foreground/50 space-y-2 font-medium leading-relaxed">
                     <li className="flex gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0" />
                        Be specific with sub-topics for better results.
                     </li>
                     <li className="flex gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0" />
                        AI includes Indian contextual examples.
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Output (Right) */}
         <div className="lg:col-span-2">
            {plan ? (
               <div className="bg-white rounded-[3rem] border border-border shadow-2xl shadow-primary/5 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="p-10 border-b border-border bg-gradient-to-br from-background to-white relative">
                     <div className="absolute top-10 right-10 flex gap-2">
                        <button className="p-3 bg-white border border-border rounded-xl hover:text-primary transition-all" title="Copy">
                           <Copy className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white border border-border rounded-xl hover:text-accent transition-all" title="Download">
                           <Download className="w-5 h-5" />
                        </button>
                     </div>
                     <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-extrabold rounded-full uppercase tracking-widest">
                        {plan.grade} • {plan.duration}
                     </span>
                     <h2 className="text-4xl font-extrabold tracking-tight mt-6 text-foreground">{plan.title}</h2>
                  </div>

                  <div className="p-10 space-y-12">
                     <section>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                           <Target className="w-6 h-6 text-primary" />
                           Learning Objectives
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {plan.objectives.map((o: string, i: number) => (
                             <li key={i} className="flex gap-3 text-sm font-medium text-foreground/70 leading-relaxed bg-background p-4 rounded-3xl border border-border">
                                <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-0.5">
                                   {i + 1}
                                </div>
                                {o}
                             </li>
                           ))}
                        </ul>
                     </section>

                     <section>
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                           <Clock className="w-6 h-6 text-accent" />
                           Session Timeline
                        </h3>
                        <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                           {plan.activities.map((a: any, i: number) => (
                             <div key={i} className="relative pl-10 group">
                                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-accent transition-all group-hover:bg-accent group-hover:scale-125 duration-300" />
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                   <div>
                                      <h4 className="font-extrabold text-foreground group-hover:text-accent transition-colors">
                                         {a.title}
                                      </h4>
                                      <p className="text-sm font-medium text-foreground/50 mt-1 max-w-lg italic">
                                         {a.desc}
                                      </p>
                                   </div>
                                   <div className="px-4 py-1.5 bg-accent/5 text-accent text-xs font-bold rounded-xl border border-accent/10 tabular-nums">
                                      {a.time}
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                     </section>

                     <section className="pt-8 border-t border-border">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-warning/10 rounded-2xl flex items-center justify-center text-warning">
                                 <BookOpen className="w-6 h-6" />
                              </div>
                              <div>
                                 <h4 className="font-bold">Required Materials</h4>
                                 <p className="text-xs font-medium text-foreground/40">{plan.materials.join(", ")}</p>
                              </div>
                           </div>
                           <button className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                              Confirm & Save to Dashboard
                              <ChevronRight className="w-4 h-4" />
                           </button>
                        </div>
                     </section>
                  </div>
               </div>
            ) : (
               <div className="h-full min-h-[500px] border-4 border-dashed border-border/50 rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center text-foreground/10 mb-8 border border-border">
                     {loading ? <Loader2 className="w-10 h-10 animate-spin" /> : <ListChecks className="w-12 h-12" />}
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground/40 mb-3 tracking-tight">
                     {loading ? "AI is thinking..." : "Ready to generate?"}
                  </h3>
                  <p className="text-foreground/30 font-bold max-w-xs leading-relaxed uppercase tracking-widest text-[10px]">
                     {loading 
                        ? "Searching curriculum databases and best practices..." 
                        : "Enter a grade and topic to see the magic happen."
                     }
                  </p>
                  {loading && (
                    <div className="w-full max-w-[200px] h-1.5 bg-border rounded-full mt-10 overflow-hidden">
                       <div className="h-full bg-primary animate-progress duration-2000" />
                    </div>
                  )}
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
