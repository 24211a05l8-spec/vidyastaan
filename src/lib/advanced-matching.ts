// src/lib/advanced-matching.ts

import { callGemini } from "./gemini";
import { generateAdvancedMatchingPrompt, Student, Volunteer, PastMatch, PlatformMetrics } from "./matching-prompt";

// Types derived from the user's expected output
export interface Match {
  rank: number;
  studentId: string;
  studentName: string;
  studentGrade: string | number;
  studentNeeds: string[];
  studentWaitingDays: number;
  volunteerId: string;
  volunteerName: string;
  volunteerExperience: string;
  volunteerCapacity: { current: number; max: number };
  confidenceScore: number;
  matchScores: {
    academicFit: number;
    logisticsFit: number;
    engagementFit: number;
    personalityFit: number;
  };
  reasoning: {
    primaryReason: string;
    academicAlignment: string;
    scheduleAlignment: string;
    personalityMatch: string;
    potentialChallenges: string[];
    mitigationStrategies: string[];
  };
  expectedOutcome: {
    probable_duration_months: number;
    expected_sessions_count: number;
    success_likelihood: string;
    learning_gain_estimate: string;
    mentor_impact_rating: number;
  };
  matchQuality: {
    tier: "EXCELLENT" | "GOOD" | "ACCEPTABLE" | "RISKY";
    requiresMonitoring: boolean;
    recommendedCheckInWeek: number;
    earlyWarningFlags: string[];
    supportNeeded: string[];
  };
}

export interface UnmatchedStudent {
  studentId: string;
  studentName: string;
  reason: string;
  recommendation: string;
}

export interface PlatformInsights {
  totalMatched: number;
  matchRatePercentage: number;
  averageConfidence: number;
  subjectGaps: string[];
  volunteerShortages: string[];
  nextCycleRecommendations: string[];
}

export interface MatchingResponse {
  matchingMetadata: {
    timestamp: string;
    algorithm_version: string;
    cycles_completed: number;
    processing_time_ms: number;
    total_comparisons: number;
    valid_matches_found: number;
    matches_above_threshold: number;
    secondary_options_provided: number;
  };
  matches: Match[];
  unmatchedStudents: UnmatchedStudent[];
  platformInsights: PlatformInsights;
}

export interface MatchingRequest {
  students: Student[];
  volunteers: Volunteer[];
  pastMatches?: PastMatch[];
  platformMetrics?: PlatformMetrics;
  forceRefresh?: boolean;
}

export async function generateAdvancedMatches(
  request: MatchingRequest
): Promise<MatchingResponse> {
  const startTime = Date.now();
  console.log("Starting advanced AI matching algorithm...");

  const { students, volunteers, pastMatches = [], platformMetrics = {} } = request;

  if (students.length === 0 || volunteers.length === 0) {
    throw new Error("Cannot match because there are zero students or zero volunteers provided.");
  }

  try {
    // 1. Generate massive prompt block
    const prompt = generateAdvancedMatchingPrompt(
      students,
      volunteers,
      pastMatches,
      platformMetrics
    );

    // 2. Call our secure Gemini integration helper
    // Temperature 0 is deterministic - gives identical matches for identical inputs.
    // We are forcing JSON return format implicitly through prompt engineering.
    const responseText = await callGemini(prompt, {
      model: "gemini-3-flash-preview", // Enforce correct user model
      temperature: 0,
      maxTokens: 8000,
    });

    // 3. Extract JSON object aggressively using regex
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("AI Output:", responseText);
      throw new Error("No valid JSON found in Gemini output.");
    }

    // 4. Parse payload
    const matchingResult: MatchingResponse = JSON.parse(jsonMatch[0]);

    // 5. Annotate processing analytics
    matchingResult.matchingMetadata.processing_time_ms = Date.now() - startTime;
    return matchingResult;
  } catch (error) {
    console.error("Advanced Matching Engine Error:", error);
    throw error;
  }
}
