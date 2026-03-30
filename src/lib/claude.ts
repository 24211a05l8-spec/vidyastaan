/**
 * Vidyastaan AI Helper
 * This module handles communication with Claude API for:
 * 1. AI Study Buddy (explanation of topics)
 * 2. Lesson Plan Generation (curriculum-aligned)
 * 3. Matching Students & Volunteers (logic-based)
 * 4. Dropout Risk Detection
 * 5. Impact Report Generation
 */

interface ClaudeOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export async function callClaude(prompt: string, options: ClaudeOptions = {}) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to call AI API");
    }

    const data = await response.json();
    return data.reply || "I couldn't process that. Please try again.";
  } catch (error) {
    console.error("AI API Error:", error);
    return "I'm having trouble thinking right now. Please try again in a moment.";
  }
}

// Specialized Prompt Helpers

export async function generateLessonPlan(grade: string, topic: string) {
  const prompt = `Create a structured 45-minute lesson plan for Grade ${grade} students on the topic "${topic}". 
  Include: learning objectives, warm-up activity (5 min), main teaching activity (25 min), practice exercise (10 min), wrap-up (5 min), materials needed. 
  Make it engaging and age-appropriate for students in India.`;
  return await callClaude(prompt);
}

export async function generateWorkshopOutline(skill: string, audience: string) {
  const prompt = `Create a beginner-friendly workshop outline for teaching "${skill}" to ${audience}. 
  Include: session goals, icebreaker, 3 main activities with time estimates, key takeaways, what students will be able to do after. 
  Keep it fun and hands-on.`;
  return await callClaude(prompt);
}

export async function suggestMatches(unassignedStudents: any[], availableVolunteers: any[]) {
  const prompt = `Given these unassigned students: ${JSON.stringify(unassignedStudents)} 
  and these available volunteers: ${JSON.stringify(availableVolunteers)}, 
  suggest the best student-volunteer pairings. For each pairing explain why they match. 
  Return ONLY a JSON array: [{"studentId": "...", "volunteerId": "...", "reason": "...", "confidenceScore": 0.95}].`;
  
  const response = await callClaude(prompt, { temperature: 0 });
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse Claude JSON response");
    return [];
  }
}

export async function aiStudyBuddyChat(question: string, grade: string, language: string) {
  const prompt = `System: You are a friendly study buddy for a Grade ${grade} student in India. 
  Explain concepts simply, use relatable examples from everyday Indian life, be encouraging, keep answers short and easy to understand. 
  Respond in ${language} if the student asks in that language.
  
  User message: ${question}`;
  return await callClaude(prompt);
}
