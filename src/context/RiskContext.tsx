import React, { createContext, useContext, ReactNode } from 'react';
import { useRisk } from '../hooks/useRisk';

const RiskContext = createContext<ReturnType<typeof useRisk> | undefined>(undefined);

export const RiskProvider = ({ children }: { children: ReactNode }) => {
  const risk = useRisk();
  return (
    <RiskContext.Provider value={risk}>
      {children}
    </RiskContext.Provider>
  );
};

export const useRiskContext = () => {
  const context = useContext(RiskContext);
  if (context === undefined) {
    throw new Error('useRiskContext must be used within a RiskProvider');
  }
  return context;
};