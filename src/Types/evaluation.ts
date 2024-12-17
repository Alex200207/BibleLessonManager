export type QuestionOption = {
  id: string;
  text: string;
};

export type MultipleChoiceQuestion = {
  id: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
};

export type OpenQuestion = {
  id: string;
  question: string;
  expectedLength?: 'short' | 'medium' | 'long';
};

export type CompletionTask = {
  id: string;
  title: string;
  description: string;
  completionCriteria: string;
};

export type EvaluationType = 'multiple-choice' | 'open-ended' | 'completion';

export type Evaluation = {
  id: string;
  title: string;
  type: EvaluationType;
  description: string;
  questions?: (MultipleChoiceQuestion | OpenQuestion)[];
  tasks?: CompletionTask[];
  createdAt: Date;
};