"use client";

// AI Assistant engine for Vidyastaan
// Generates structured learning resources and quizzes

export interface AIContent {
  platform: string;
  grade: string;
  subject: string;
  topic: string;
  status: string;
  content: {
    definition: string;
    key_points: string[];
    examples: string[];
    summary: string;
  };
  quiz: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

const PRE_GENERATED_CONTENT: Record<string, AIContent> = {
  // --- Class 5: Parts and Wholes (Maths - Fractions) ---
  "5_Maths_Parts and Wholes": {
    platform: "Vidyastaan",
    grade: "5th Class",
    subject: "Maths",
    topic: "Parts and Wholes",
    status: "completed",
    content: {
      definition: "A 'Whole' is a complete thing, like one whole apple. 'Parts' are the smaller pieces we get when we cut the whole thing into equal slices!",
      key_points: [
          "Wait! To make fair parts, all pieces must be the same size.",
          "We use a 'Fraction' to name these parts (like 1/2 or 1/4).",
          "The bottom number (Denominator) tells us how many parts make the whole.",
          "The top number (Numerator) tells us how many parts we are talking about."
      ],
      examples: [
          "Imagine cutting a Paratha into 4 equal triangles. If you eat 1, you ate 1/4 of the Paratha!",
          "If a box of 6 Laddoos is shared between 2 friends, each gets 3/6, which is exactly half (1/2)!"
      ],
      summary: "Parts and Wholes teach us how to share fairly. Just remember: 'Fraction' is just a fancy name for a part of a whole thing!"
    },
    quiz: [
      {
        question: "If you cut a watermelon into 10 equal parts and give 3 to your neighbor, what fraction did you give?",
        options: ["3/10", "10/3", "1/10", "7/10"],
        answer: "3/10"
      },
      {
        question: "In the fraction 1/2, what does the number 2 represent?",
        options: ["A whole apple", "The number of parts we have", "Total equal parts in the whole", "The person eating it"],
        answer: "Total equal parts in the whole"
      },
      {
        question: "Which of these is 1/4 of an hour (60 minutes)?",
        options: ["10 minutes", "15 minutes", "20 minutes", "30 minutes"],
        answer: "15 minutes"
      },
      {
        question: "If a chocolate bar has 8 small squares, what is 1/2 of it?",
        options: ["2 squares", "4 squares", "1 square", "8 squares"],
        answer: "4 squares"
      },
      {
        question: "What is 1/2 + 1/2 equal to?",
        options: ["1/4", "1", "2", "0"],
        answer: "1"
      }
    ]
  },

  // --- Class 10: Chemical Reactions (Science) ---
  "10_Science_Chemical Reactions": {
    platform: "Vidyastaan",
    grade: "10th Class",
    subject: "Science",
    topic: "Chemical Reactions",
    status: "completed",
    content: {
      definition: "A chemical reaction is a process where substances change into new substances with different properties.",
      key_points: [
          "Reactants are the starting materials, and Products are the new substances formed.",
          "A balanced chemical equation follows the Law of Conservation of Mass.",
          "Types of reactions include Combination, Decomposition, and Displacement.",
          "Exothermic reactions release heat, while Endothermic reactions absorb it."
      ],
      examples: [
          "The rusting of an iron nail when left in moist air is a slow chemical reaction.",
          "Burning a magnesium ribbon in air produces a white powder (Magnesium Oxide) with a bright light."
      ],
      summary: "Chemical reactions are all around us, from cooking food to breathing. We represent them using equations to show how atoms rearrange themselves."
    },
    quiz: [
      {
        question: "What are the substances called that take part in a chemical reaction?",
        options: ["Products", "Reactants", "Catalysts", "Atoms"],
        answer: "Reactants"
      },
      {
        question: "In which type of reaction does a single reactant break down to give simpler products?",
        options: ["Combination", "Decomposition", "Displacement", "Redox"],
        answer: "Decomposition"
      },
      {
        question: "The reaction C + O₂ → CO₂ is an example of which type of reaction?",
        options: ["Combination", "Decomposition", "Displacement", "Double Displacement"],
        answer: "Combination"
      },
      {
        question: "What is an exothermic reaction?",
        options: ["A reaction that absorbs heat", "A reaction that releases heat", "A reaction that only uses gas", "A reaction that never ends"],
        answer: "A reaction that releases heat"
      },
      {
        question: "Why must a chemical equation be balanced?",
        options: ["To look neat", "To follow Law of Conservation of Mass", "To make it longer", "To save scientists' time"],
        answer: "To follow Law of Conservation of Mass"
      }
    ]
  }
};

export async function getAIResource(grade: number, subject: string, topic: string, language: string = "English"): Promise<AIContent> {
  const key1 = `${grade}_${subject}_${topic}`;
  const key2 = `${grade}_${subject}_${decodeURIComponent(topic)}`;
  
  if (PRE_GENERATED_CONTENT[key1]) return PRE_GENERATED_CONTENT[key1];
  if (PRE_GENERATED_CONTENT[key2]) return PRE_GENERATED_CONTENT[key2];

  // Fallback / Generator simulation
  return {
    platform: "Vidyastaan",
    grade: `${grade}th Class`,
    subject: subject,
    topic: topic,
    status: "completed",
    content: {
      definition: `In ${subject}, ${topic} is an important concept that helps us understand the world better.`,
      key_points: [
          `Topic focus: exploring how ${topic} works.`,
          "Key fundamental principles and characteristics.",
          "Relating the concept to everyday observations.",
          "Step-by-step simple explanation for clear understanding."
      ],
      examples: [
          "Example 1: A relatable scenario for Indian students.",
          "Example 2: How this happens in your local community."
      ],
      summary: `We've learned that ${topic} is essential for mastering ${subject}. Keep practicing!`
    },
    quiz: Array(5).fill(0).map((_, i) => ({
      question: `Review Question ${i + 1} about ${topic}: What is a core fact?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option A"
    }))
  };
}
