import { NextResponse } from "next/server";
import { generateAdvancedMatches } from "@/lib/advanced-matching";
import { mockStudents, mockVolunteers } from "@/lib/ngoMockData";

export async function POST(req: Request) {
  try {
    const { adminId } = await req.json();

    if (!adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    // Rather than crashing out on an empty Firebase instance during the Hackathon, 
    // we seamlessly pull from the newly enriched mock database arrays.
    console.log("🔄 Fetching mock data arrays for advanced matching simulation...");

    const students = mockStudents;
    const volunteers = mockVolunteers;

    if (students.length === 0 || volunteers.length === 0) {
      return NextResponse.json({ success: false, error: "Missing required datasets" }, { status: 400 });
    }

    console.log(`📊 Data ready: ${students.length} students, ${volunteers.length} volunteers... Engaging Gemini.`);

    // Wait for the synchronous Gemini HTTP process to crunch the data
    const matchingResult = await generateAdvancedMatches({
      students,
      volunteers,
      pastMatches: [],    // No past matches needed for demo
      platformMetrics: { successRate: 85, avgSessions: 10, studentSatisfaction: 4.5, mentorSatisfaction: 4.8, avgDuration: 3 },
    });

    console.log(`✅ Gemini processing complete in ${matchingResult.matchingMetadata.processing_time_ms}ms.`);

    return NextResponse.json({
      success: true,
      data: matchingResult,
      summary: {
        matchesGenerated: matchingResult.matches.length,
        studentsMatched: matchingResult.matches.length,
        averageConfidence: (
          matchingResult.matches.reduce((sum, m) => sum + m.confidenceScore, 0) /
          matchingResult.matches.length
        ).toFixed(3),
        processingTime: `${matchingResult.matchingMetadata.processing_time_ms}ms`,
      },
    });
  } catch (error) {
    console.error("Advanced Matching Route Error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Matching pipeline failed",
    }, { status: 500 });
  }
}
