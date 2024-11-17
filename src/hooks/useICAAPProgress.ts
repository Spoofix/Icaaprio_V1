import { useState, useEffect } from 'react';
import type { StepProgress, ICAAPProgress } from '../types/icaap';

const STORAGE_KEY = 'icaap_progress';

export function useICAAPProgress(icaapId: string) {
  const [progress, setProgress] = useState<ICAAPProgress>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_${icaapId}`);
    return saved ? JSON.parse(saved) : {
      steps: {},
      currentStep: 0,
      lastSaved: new Date().toISOString()
    };
  });

  const saveStepProgress = (stepId: string, data: any) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        steps: {
          ...prev.steps,
          [stepId]: {
            id: stepId,
            completed: true,
            data,
            lastUpdated: new Date().toISOString()
          }
        },
        lastSaved: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem(`${STORAGE_KEY}_${icaapId}`, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getStepData = (stepId: string): any => {
    return progress.steps[stepId]?.data;
  };

  const isStepCompleted = (stepId: string): boolean => {
    return !!progress.steps[stepId]?.completed;
  };

  const clearProgress = () => {
    localStorage.removeItem(`${STORAGE_KEY}_${icaapId}`);
    setProgress({
      steps: {},
      currentStep: 0,
      lastSaved: new Date().toISOString()
    });
  };

  return {
    progress,
    saveStepProgress,
    getStepData,
    isStepCompleted,
    clearProgress
  };
}