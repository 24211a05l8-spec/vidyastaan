"use client";

export interface Chapter {
  id: string;
  title: string;
  subject: string;
  grade: number;
  description: string;
  pdfUrl?: string;
  videoUrl?: string;
}

const getYoutubeSearchUrl = (grade: number, subject: string, topic: string) => 
  `https://www.youtube.com/results?search_query=NCERT+Class+${grade}+${subject}+${encodeURIComponent(topic)}+explanation`;

const getNCERTPortal = (grade: number) => `https://ncert.nic.in/textbook.php?classes=${grade}`;

export const NCERT_DATA: Record<number, Record<string, Chapter[]>> = {
  5: {
    "Telugu": [
      { id: "5t1", title: "Chapter 1", subject: "Telugu", grade: 5, description: "Basic Telugu lessons and stories.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-Telugu-Textbook.pdf", videoUrl: getYoutubeSearchUrl(5, "Telugu", "Chapter 1") }
    ],
    "Hindi": [
      { id: "5h1", title: "Chapter 1", subject: "Hindi", grade: 5, description: "Introduction to Hindi literature.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-Hindi-Textbook.pdf", videoUrl: getYoutubeSearchUrl(5, "Hindi", "Chapter 1") }
    ],
    "English": [
      { id: "5en1", title: "Ice-cream Man", subject: "English", grade: 5, description: "Poetry appreciation and vocabulary building.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-English-Textbook.pdf", videoUrl: getYoutubeSearchUrl(5, "English", "Ice-cream Man") },
      { id: "5en2", title: "Wonderful Waste!", subject: "English", grade: 5, description: "Storytelling and creativity from scraps.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-English-Textbook.pdf", videoUrl: getYoutubeSearchUrl(5, "English", "Wonderful Waste!") },
      { id: "5en7", title: "Gulliver’s Travels", subject: "English", grade: 5, description: "Adventure literature and descriptive language.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-English-Textbook.pdf", videoUrl: getYoutubeSearchUrl(5, "English", "Gulliver’s Travels") }
    ],
    "Maths": [
      { id: "5m1", title: "The Fish Tale", subject: "Maths", grade: 5, description: "Numbers and basic operations through the world of fish.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-Maths-Textbook-in-English.pdf", videoUrl: getYoutubeSearchUrl(5, "Maths", "The Fish Tale") },
      { id: "5m2", title: "Shapes and Angles", subject: "Maths", grade: 5, description: "Understanding geometry through everyday objects.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-Maths-Textbook-in-English.pdf", videoUrl: getYoutubeSearchUrl(5, "Maths", "Shapes and Angles") },
      { id: "5m4", title: "Parts and Wholes", subject: "Maths", grade: 5, description: "Introduction to fractions and decimal basics.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-Maths-Textbook-in-English.pdf", videoUrl: getYoutubeSearchUrl(5, "Maths", "Parts and Wholes") }
    ],
    "Science": [
      { id: "5s1", title: "Super Senses", subject: "Science", grade: 5, description: "How animals see, hear, and feel the world.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-EVS-Textbook-in-English.pdf", videoUrl: getYoutubeSearchUrl(5, "Science", "Super Senses") },
      { id: "5s3", title: "Experiments with Water", subject: "Science", grade: 5, description: "Floating, sinking, and properties of liquids.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-EVS-Textbook-in-English.pdf", videoUrl: getYoutubeSearchUrl(5, "Science", "Experiments with Water") }
    ],
    "Social": [
      { id: "5so1", title: "Chapter 1", subject: "Social", grade: 5, description: "Understanding our society and history.", pdfUrl: "https://cdn1.byjus.com/wp-content/uploads/2020/07/Telangana-Board-Class-5-EVS-Textbook-in-English.pdf", videoUrl: getYoutubeSearchUrl(5, "Social", "Chapter 1") }
    ]
  },
  10: {
    "Math": [
      { id: "10m1", title: "Real Numbers", subject: "Math", grade: 10, description: "Euclid's division and fundamental theorem of arithmetic.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "Math", "Real Numbers") },
      { id: "10m2", title: "Polynomials", subject: "Math", grade: 10, description: "Geometrical meaning of zeros and coefficients.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "Math", "Polynomials") },
      { id: "10m8", title: "Trigonometry", subject: "Math", grade: 10, description: "Introduction to sine, cosine, and tangent ratios.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "Math", "Trigonometry") },
      { id: "10m14", title: "Probability", subject: "Math", grade: 10, description: "Calculating chances in everyday life.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "Math", "Probability") }
    ],
    "Science": [
      { id: "10s1", title: "Chemical Reactions", subject: "Science", grade: 10, description: "Balanced equations and types of chemical changes.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "Science", "Chemical Reactions") },
      { id: "10s2", title: "Acids, Bases and Salts", subject: "Science", grade: 10, description: "pH scales and chemical properties of compounds.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "Science", "Acids, Bases and Salts") },
      { id: "10s5", title: "Life Processes", subject: "Science", grade: 10, description: "Nutrition, respiration, and excretion in humans.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "Science", "Life Processes") },
      { id: "10s11", title: "Electricity", subject: "Science", grade: 10, description: "Circuits, Ohm's law, and heating effects.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "Science", "Electricity") }
    ],
    "English": [
      { id: "10en1", title: "A Letter to God", subject: "English", grade: 10, description: "Faith and irony in modern literature.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "English", "A Letter to God") },
      { id: "10en2", title: "Nelson Mandela", subject: "English", grade: 10, description: "Inauguration and the struggle for freedom.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "English", "Nelson Mandela") },
      { id: "10en4", title: "Anne Frank", subject: "English", grade: 10, description: "Journaling and the human experience.", pdfUrl: getNCERTPortal(10), videoUrl: getYoutubeSearchUrl(10, "English", "Anne Frank") }
    ]
  }
};
