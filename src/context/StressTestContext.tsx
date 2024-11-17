import React, { createContext, useContext, ReactNode } from 'react';
import { useStressTest } from '../hooks/useStressTest';

const StressTestContext = createContext<ReturnType<typeof useStressTest> | undefined>(undefined);

export const StressTestProvider = ({ children }: { children: ReactNode }) => {
  const stressTest = useStressTest();
  return (
    <StressTestContext.Provider value={stressTest}>
      {children}
    </StressTestContext.Provider>
  );
};

export const useStressTestContext = () => {
  const context = useContext(StressTestContext);
  if (context === undefined) {
    throw new Error('useStressTestContext must be used within a StressTestProvider');
  }
  return context;
};