// src/lib/matching-prompt.ts

// Since we're using mock objects, we'll type them generally or loosely here
export type Student = any;
export type Volunteer = any;
export type PastMatch = any;
export type PlatformMetrics = any;

export function generateAdvancedMatchingPrompt(
  students: Student[],
  volunteers: Volunteer[],
  pastMatches?: PastMatch[],
  platformMetrics?: PlatformMetrics
): string {
  
  return `
YOU ARE AN ADVANCED EDUCATION AI MATCHING ENGINE
===============================================

SYSTEM OBJECTIVE:
Create optimal student-volunteer mentor matches maximizing:
1. Academic success (learning outcomes)
2. Relationship longevity (retention)
3. Student satisfaction & engagement
4. Mentor impact & fulfillment
5. Platform efficiency & fairness

CONTEXT & DATA:
===============

STUDENT POOL (${students.length} students needing mentors):
${generateStudentDataTable(students)}

VOLUNTEER MENTOR POOL (${volunteers.length} available mentors):
${generateVolunteerDataTable(volunteers)}

HISTORICAL MATCHING DATA:
${generateHistoricalAnalysis(pastMatches)}

PLATFORM METRICS:
- Average match success rate: ${platformMetrics?.successRate || "82"}%
- Average session completion: ${platformMetrics?.avgSessions || "12"} sessions
- Student satisfaction: ${platformMetrics?.studentSatisfaction || "4.6"}/5.0
- Mentor satisfaction: ${platformMetrics?.mentorSatisfaction || "4.8"}/5.0
- Average match duration: ${platformMetrics?.avgDuration || "5"} months

ADVANCED MATCHING ALGORITHM:
============================

LAYER 1: ACADEMIC FIT SCORING (Weight: 35%)
-------------------------------------------
For each student-volunteer pair, calculate:

1. PRIMARY SUBJECT ALIGNMENT
   - Exact match bonus: +40 points
   - Related subject: +25 points
   - Can teach topic: +15 points
   - No expertise: 0 points
   Formula: (subjectScore / 40) * 0.4

2. GRADE LEVEL COMPATIBILITY
   - Within 2 grades: +30 points
   - Within 4 grades: +15 points
   - Outside range: 0 points
   Formula: (gradeScore / 30) * 0.3

3. LEARNING STYLE MATCH
   - Volunteer's teaching style matches student's pace:
     * Slow learner + Patient teacher: +25 points
     * Fast learner + Challenging teacher: +25 points
     * Flexible student + Adaptive teacher: +20 points
   Formula: (styleScore / 25) * 0.3

ACADEMIC_FIT = (subjectScore + gradeScore + styleScore) / 3


LAYER 2: AVAILABILITY & LOGISTICS (Weight: 25%)
-----------------------------------------------
1. SCHEDULE OVERLAP SCORING
   - Perfect overlap (same days & times): 100 points
   - Good overlap (3+ matching slots): 75 points
   - Moderate overlap (1-2 slots): 50 points
   - No overlap: 0 points
   
   Calculate overlap hours:
   overlapHours = minutes_of_overlap / totalStudentAvailability
   SCHEDULE_SCORE = overlapHours * 100

2. LOCATION FEASIBILITY
   - Same city: +40 points
   - Mentor can travel to student: +25 points
   - Distance feasible (online): +15 points
   - Not feasible: 0 points
   LOCATION_SCORE = locationScore / 40

3. COMMUNICATION CHANNELS
   - Shared language(s): +30 points
   - Online-only possible: +15 points
   - Translation needed: -10 points
   LANGUAGE_SCORE = languageScore / 30

LOGISTICS_FIT = (SCHEDULE_SCORE * 0.5 + LOCATION_SCORE * 0.3 + LANGUAGE_SCORE * 0.2)


LAYER 3: ENGAGEMENT & MOTIVATION (Weight: 25%)
----------------------------------------------
1. STUDENT READINESS
   - High engagement (progress > 70%): +35 points
   - Medium engagement (40-70%): +20 points
   - Low engagement (< 40%): +5 points
   - Has internet & device: +10 points
   STUDENT_READINESS = engagementScore + deviceScore

2. VOLUNTEER COMMITMENT
   - High impact score (>8/10): +35 points
   - Proven track record (3+ students): +20 points
   - New but motivated: +10 points
   - Available capacity: +5 points
   VOLUNTEER_COMMITMENT = commitmentScore / 70

3. INTRINSIC MOTIVATION ALIGNMENT
   - Student's goals align with volunteer's teaching passion: +25 points
   - Student's interests match volunteer's skill areas: +15 points
   - Neutral alignment: +5 points
   MOTIVATION_MATCH = (goalsAlign + interestsAlign) / 40

ENGAGEMENT_FIT = (STUDENT_READINESS + VOLUNTEER_COMMITMENT + MOTIVATION_MATCH) / 3


LAYER 4: PSYCHOLOGICAL & PERSONALITY FIT (Weight: 15%)
-----------------------------------------------------
1. PERSONALITY COMPATIBILITY
   - Teaching style matches learning preference:
     * Strict teacher + self-motivated student: +30 points
     * Patient teacher + anxious student: +30 points
     * Fun teacher + extrovert student: +25 points
     * Flexible mentor + diverse learner: +20 points
   PERSONALITY_MATCH = personalityScore / 30

2. COMMUNICATION PREFERENCE
   - Formal + Detail-oriented: +20 points
   - Casual + Fun-loving: +20 points
   - Flexible approach: +15 points
   COMMUNICATION_FIT = commScore / 20

3. CULTURAL & SOCIAL FIT
   - Same cultural background (if student prefers): +15 points
   - Similar socioeconomic background: +10 points
   - Diverse but respectful: +5 points
   CULTURAL_FIT = cultureScore / 15

PERSONALITY_FIT = (PERSONALITY_MATCH + COMMUNICATION_FIT + CULTURAL_FIT) / 3


FINAL SCORING FORMULA:
======================

CONFIDENCE_SCORE = (
  ACADEMIC_FIT * 0.35 +
  LOGISTICS_FIT * 0.25 +
  ENGAGEMENT_FIT * 0.25 +
  PERSONALITY_FIT * 0.15
) / 100

Clamp between 0.0 and 1.0


MATCHING CONSTRAINTS:
=====================
1. Volunteer must have capacity (studentsAssigned < maxAllowed) MUST ADHERE TO THIS.
2. Confidence score must be >= 0.65 (don't force bad matches)
3. Each student gets exactly 1 match
4. No student matched twice
5. No volunteer assigned >2 new students per cycle
6. Prioritize long-waiting students (waiting > 30 days)
7. Balance mentor load (avoid overloading one mentor)


MATCHING OUTPUT FORMAT:
=======================
Return ONLY valid JSON (NO markdown, NO code block ticks around JSON). Return purely the object:
{
  "matchingMetadata": {
    "timestamp": "ISO8601",
    "algorithm_version": "2.0",
    "cycles_completed": 1,
    "processing_time_ms": 5000,
    "total_comparisons": ${students.length * volunteers.length},
    "valid_matches_found": 0,
    "matches_above_threshold": 0,
    "secondary_options_provided": 0
  },
  "matches": [
    {
      "rank": 1,
      "studentId": "str_uid",
      "studentName": "str_name",
      "studentGrade": "10",
      "studentNeeds": ["Math", "Physics"],
      "studentWaitingDays": 15,
      "volunteerId": "vol_uid",
      "volunteerName": "str_name",
      "volunteerExperience": "str_description",
      "volunteerCapacity": { "current": 2, "max": 3 },
      "confidenceScore": 0.87,
      "matchScores": {
        "academicFit": 0.92,
        "logisticsFit": 0.78,
        "engagementFit": 0.85,
        "personalityFit": 0.82
      },
      "reasoning": {
        "primaryReason": "str",
        "academicAlignment": "str",
        "scheduleAlignment": "str",
        "personalityMatch": "str",
        "potentialChallenges": ["str"],
        "mitigationStrategies": ["str"]
      },
      "expectedOutcome": {
        "probable_duration_months": 4,
        "expected_sessions_count": 16,
        "success_likelihood": "87%",
        "learning_gain_estimate": "Improve Math from 60% to 75%",
        "mentor_impact_rating": 8.2
      },
      "matchQuality": {
        "tier": "EXCELLENT",
        "requiresMonitoring": false,
        "recommendedCheckInWeek": 2,
        "earlyWarningFlags": [],
        "supportNeeded": []
      }
    }
  ],
  "unmatchedStudents": [],
  "platformInsights": {
    "totalMatched": 0,
    "matchRatePercentage": 0,
    "averageConfidence": 0,
    "subjectGaps": ["str"],
    "volunteerShortages": ["str"],
    "nextCycleRecommendations": ["str"]
  }
}
`;
}

// ----------------------------------------------------
// Formatting Utilities
// ----------------------------------------------------

function generateStudentDataTable(students: Student[]): string {
  return students
    .map(
      (s) => `
STUDENT ID: ${s.uid}
├─ Name: ${s.name}
├─ Grade: ${s.grade}
├─ Subjects Need Help: ${s.subjects?.join(", ") || "None"}
├─ Learning Pace: ${s.learningPace || "Average"}
├─ Interests/Skills: ${s.curiosities?.join(", ") || "None"}
├─ Learning Style: ${s.learningPreference || "NA"}
├─ Languages: ${s.language || "English"}
├─ Location: ${s.city || "Remote"}
├─ Available Hours: ${s.availableHours?.join(", ") || "Flexible"}
├─ Progress Score: ${s.progressScore || 0}%
├─ Device Available: ${s.hasSmartphone ? "Yes" : "No"}
├─ Waiting Days: ${calculateWaitingDays(s.createdAt)}
└─ Special Needs: ${s.specialNeeds || "None"}
`
    )
    .join("\n");
}

function generateVolunteerDataTable(volunteers: Volunteer[]): string {
  return volunteers
    .map(
      (v) => `
VOLUNTEER ID: ${v.uid}
├─ Name: ${v.name}
├─ Expert Subjects: ${v.subjects?.join(", ") || "None"}
├─ Can Teach Grades: ${v.grades?.join(", ") || "None"}
├─ Teaching Style: ${v.teachingStyle || "Adaptive"}
├─ Skills/Workshops: ${v.skills?.join(", ") || "None"}
├─ Languages: ${v.languages?.join(", ") || "English"}
├─ Location: ${v.city || "Remote"}
├─ Availability:
│  ├─ Days: ${v.availability?.days?.join(", ") || "Flexible"}
│  ├─ Time Slots: ${v.availability?.slots?.join(", ") || "Flexible"}
│  └─ Hours/Week: ${v.availability?.hoursPerWeek || 2}
├─ Students Assigned: ${v.studentsAssigned?.length || 0}/${v.maxStudentsAllowed || 3}
├─ Impact Score: ${v.impactScore || 0}/10
├─ Experience: ${v.yearsExperience || "Not specified"}
└─ Bio: ${v.bio || ""}
`
    )
    .join("\n");
}

function generateHistoricalAnalysis(
  pastMatches?: PastMatch[]
): string {
  if (!pastMatches || pastMatches.length === 0) {
    return "No historical data available (first matching cycle)";
  }
  const successful = pastMatches.filter((m: any) => m.status === "completed").length;
  const failed = pastMatches.filter((m: any) => m.status === "failed").length;
  return `
Total Past Matches: ${pastMatches.length}
├─ Successful: ${successful}
└─ Failed: ${failed}
  `;
}

function calculateWaitingDays(createdAt: string | Date | undefined): number {
  if (!createdAt) return 0;
  return Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
}
