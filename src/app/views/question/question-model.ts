export class Question {
  id: string;
  content: string;
  image: string;
  answers: { content: string, correct: boolean }[];
}
