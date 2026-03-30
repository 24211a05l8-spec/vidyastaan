// src/lib/matchingUtils.ts

export interface StudentMatchData {
  name: string;
  interests: string[];
}

export interface VolunteerMatchData {
  name: string;
  skills: string[];
}

export interface MatchResult extends VolunteerMatchData {
  score: number;
}

/**
 * Calculates a match score between a student and a volunteer 
 * by finding the intersection of their interests and skills.
 * 
 * @param studentInterests Array of strings representing what the student wants to learn.
 * @param volunteerSkills Array of strings representing what the volunteer can teach.
 * @returns The total score (number of common subjects).
 */
export function calculateMatchScore(studentInterests: string[], volunteerSkills: string[]): number {
  // We use filter to iterate over the student's interests, 
  // and includes to check if the volunteer has that skill.
  // The .length of the resulting array is our score!
  const matches = studentInterests.filter(interest => 
    volunteerSkills.includes(interest)
  );
  
  return matches.length;
}

/**
 * Compares a student against a list of volunteers and returns them ranked by best match.
 * 
 * @param student The student object needing a match.
 * @param volunteers Array of available volunteer objects.
 * @returns Sorted array of MatchResults (descending score). Volunteers with 0 score are excluded.
 */
export function rankVolunteers(student: StudentMatchData, volunteers: VolunteerMatchData[]): MatchResult[] {
  // 1. Map over volunteers to calculate their individual scores
  const scoredVolunteers: MatchResult[] = volunteers.map(volunteer => {
    const score = calculateMatchScore(student.interests, volunteer.skills);
    return { ...volunteer, score };
  });

  // 2. Filter out volunteers that have absolutely no matching skills (score === 0)
  const viableMatches = scoredVolunteers.filter(v => v.score > 0);

  // 3. Sort the matched volunteers by highest score
  viableMatches.sort((a, b) => b.score - a.score);

  return viableMatches;
}

// ==========================================
// Sample Data for Testing / Hackathon UI
// ==========================================

export const SAMPLE_STUDENT: StudentMatchData = {
  name: "Ravi",
  interests: ["Math", "Arts"]
};

export const SAMPLE_VOLUNTEERS: VolunteerMatchData[] = [
  { name: "Anita", skills: ["Math", "Science"] },
  { name: "Rahul", skills: ["Arts", "History"] },
  { name: "Sneha", skills: ["Math", "Arts"] }
];
