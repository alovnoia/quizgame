export class Question {
  id: string;
  content: string;
  image: string;
  level: string;
  topic: [string];
  answers: { content: string, correct: boolean }[];
}
