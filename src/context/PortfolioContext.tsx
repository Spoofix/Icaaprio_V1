import React, { createContext, useContext, ReactNode } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';

const PortfolioContext = createContext<ReturnType<typeof usePortfolio> | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const portfolio = usePortfolio();
  return (
    <PortfolioContext.Provider value={portfolio}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  return context;
};