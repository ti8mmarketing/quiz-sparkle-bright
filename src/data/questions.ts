export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Was ist die Hauptstadt von Deutschland?",
    answers: ["München", "Hamburg", "Berlin", "Frankfurt"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Wie viele Kontinente gibt es auf der Erde?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "Wer hat die Relativitätstheorie entwickelt?",
    answers: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Nikola Tesla"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Welches ist das größte Säugetier der Welt?",
    answers: ["Elefant", "Blauwal", "Giraffe", "Nashorn"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "In welchem Jahr fiel die Berliner Mauer?",
    answers: ["1987", "1988", "1989", "1990"],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Wie viele Planeten hat unser Sonnensystem?",
    answers: ["7", "8", "9", "10"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Was ist das chemische Symbol für Gold?",
    answers: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "Welcher ist der längste Fluss der Welt?",
    answers: ["Amazonas", "Nil", "Mississippi", "Jangtse"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Wie viele Sekunden hat eine Stunde?",
    answers: ["3000", "3600", "4200", "3200"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Wer malte die Mona Lisa?",
    answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
  },
];
