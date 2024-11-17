// Add to existing types
export interface StepProgress {
  id: string;
  completed: boolean;
  data: any;
  lastUpdated: string;
}

export interface ICAAPProgress {
  steps: Record<string, StepProgress>;
  currentStep: number;
  lastSaved: string;
}