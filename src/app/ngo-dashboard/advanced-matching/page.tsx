"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Check,
  AlertCircle,
  TrendingUp,
  Loader2,
  Download,
  Eye,
} from "lucide-react";

// Import our expected response types to keep TS happy
import { MatchingResponse } from "@/lib/advanced-matching";

export default function AdvancedMatchingPage() {
  const [loading, setLoading] = useState(false);
  const [matchData, setMatchData] = useState<MatchingResponse | null>(null);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const generateMatches = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/matching/advanced", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: "ngo_admin_demo" }),
      });

      const data = await response.json();
      if (data.success) {
        setMatchData(data.data);
      } else {
         setErrorMsg(data.error || "Failed to generate matches from AI.");
      }
    } catch (error) {
      setErrorMsg("Network request failed while generating matches.");
    } finally {
      setLoading(false);
    }
  };

  if (!matchData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
        <div>
          <h1 className="text-4xl font-black mb-4 flex items-center justify-center gap-3 text-slate-800">
             <Sparkles className="w-10 h-10 text-primary" />
             Advanced AI Matching
          </h1>
          <p className="text-slate-500 font-bold mb-8 max-w-xl mx-auto">
            Harness the power of Gemini 3.1 Flash Preview to optimally pair students with their perfect volunteer mentor based on 15+ academic, logical, and psychological factors.
          </p>
          
          {errorMsg && (
             <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl font-bold flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {errorMsg}
             </div>
          )}
        </div>
        
        <button
          onClick={generateMatches}
          disabled={loading}
          className="px-10 py-5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-2xl font-black text-xl flex items-center gap-3 shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Running Neural Networks...
            </>
          ) : (
            <>
              Generate Advanced Matches
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Metadata Summary */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/10 p-4 rounded-3xl border border-white/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Matches Generated</p>
            <p className="text-4xl font-black mt-1">
              {matchData.matches.length}
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl border border-white/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Avg Confidence</p>
            <p className="text-4xl font-black mt-1 text-emerald-300">
              {matchData.matches.length > 0 ? (
                matchData.matches.reduce((sum, m) => sum + m.confidenceScore, 0) /
                matchData.matches.length * 100
              ).toFixed(0) : 0}%
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl border border-white/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Processing Time</p>
            <p className="text-4xl font-black mt-1 text-amber-300">
              {matchData.matchingMetadata.processing_time_ms}ms
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl border border-white/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Algorithm Version</p>
            <p className="text-4xl font-black mt-1 text-blue-200">
              {matchData.matchingMetadata.algorithm_version}
            </p>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-3 text-slate-800 px-4">
          <TrendingUp className="w-7 h-7 text-primary" />
          Neural Recommendations
        </h2>

        {matchData.matches.map((match, idx) => {
           const isExcellent = match.matchQuality.tier === "EXCELLENT";
           
           return (
          <div
            key={`${match.studentId}-${match.volunteerId}`}
            className={`p-8 rounded-[2.5rem] border shadow-sm transition-all ${
              isExcellent
                ? "bg-emerald-50 border-emerald-200 shadow-emerald-500/10"
                : "bg-white border-slate-100"
            }`}
          >
            {/* Match Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl ${
                     isExcellent ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                    #{match.rank}
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-800">{match.studentName}</p>
                    <p className="text-sm font-bold text-slate-400">
                      {match.studentGrade} • Waiting {match.studentWaitingDays} days
                    </p>
                  </div>
              </div>
              
              <div className="flex items-center gap-6">
                 <div className="text-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm shrink-0">
                   <p className={`text-3xl font-black ${isExcellent ? "text-emerald-600" : "text-primary"}`}>
                     {(match.confidenceScore * 100).toFixed(0)}%
                   </p>
                   <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Match Score</p>
                 </div>
                 
                 <div className="text-right">
                   <p className="text-xl font-black text-slate-800">
                     {match.volunteerName}
                   </p>
                   <p className="text-sm font-bold text-slate-400">
                     Capacity: {match.volunteerCapacity.current}/{match.volunteerCapacity.max} students
                   </p>
                 </div>
              </div>
            </div>

            {/* Confidence Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(match.matchScores).map(([key, value]) => (
                <div key={key} className="bg-white/60 p-4 rounded-2xl border border-slate-100 backdrop-blur-sm">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                    {key.replace(/Fit/, "")}
                  </p>
                  <p className="text-xl font-black text-slate-700">
                    {(value * 100).toFixed(0)}%
                  </p>
                </div>
              ))}
            </div>

            {/* Main Reason */}
            <p className="mb-6 text-slate-600 font-medium leading-relaxed bg-white p-6 rounded-2xl border border-slate-100 text-lg">
               {match.reasoning.primaryReason}
            </p>

            {/* Expandable Details */}
            <button
              onClick={() =>
                setExpandedMatch(
                  expandedMatch === `${match.studentId}-${match.volunteerId}`
                    ? null
                    : `${match.studentId}-${match.volunteerId}`
                )
              }
              className={`mb-6 px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${
                 isExcellent ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              <Eye className="w-4 h-4" />
              {expandedMatch === `${match.studentId}-${match.volunteerId}`
                ? "Hide Deep Analysis"
                : "View Neural Logic"}
            </button>

            {expandedMatch === `${match.studentId}-${match.volunteerId}` && (
              <div className="space-y-6 p-6 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-sm mb-6">
                <div>
                  <p className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-1">Academic Alignment</p>
                  <p className="text-slate-700 font-medium">{match.reasoning.academicAlignment}</p>
                </div>
                <div>
                  <p className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-1">Schedule Alignment</p>
                  <p className="text-slate-700 font-medium">{match.reasoning.scheduleAlignment}</p>
                </div>
                <div>
                  <p className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-1">Personality Match</p>
                  <p className="text-slate-700 font-medium">{match.reasoning.personalityMatch}</p>
                </div>
                {match.reasoning.potentialChallenges.length > 0 && (
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-2">
                       <AlertCircle className="w-4 h-4" /> Potential Friction
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      {match.reasoning.potentialChallenges.map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <p className="font-black text-indigo-900 mb-4 flex items-center gap-2">
                     <TrendingUp className="w-5 h-5 text-indigo-500" />
                     Predicted Outcomes
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-indigo-400">Duration</p>
                        <p className="font-bold text-indigo-800">~{match.expectedOutcome.probable_duration_months} months</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-indigo-400">Expected Growth</p>
                        <p className="font-bold text-indigo-800">{match.expectedOutcome.learning_gain_estimate}</p>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-4 bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-800/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Commit Mentor
              </button>
              <button className="px-6 py-4 bg-white text-slate-400 border border-slate-200 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                Dismiss Match
              </button>
            </div>
          </div>
        )})}
      </div>

      {/* Download Report */}
      <button className="w-full mt-10 px-8 py-5 bg-white border-2 border-dashed border-slate-200 text-slate-500 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 transition-all">
        <Download className="w-6 h-6" />
        Download Raw AI Diagnostic JSON
      </button>
    </div>
  );
}
