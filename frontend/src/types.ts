export interface QuizItem {
    question: string;
    choices: string[];
    correctIndex: number;
    description: string;
    user_select?: number | null;
}