import { useState, useCallback } from 'react';
import { stressTestService } from '../services/stress-test';
import { MacroFactors } from '../types/macro';

export const useStressTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const runSimulation = useCallback(async (portfolioData: any, macroFactors: MacroFactors) => {
    setLoading(true);
    setError(null);
    try {
      const simulationResults = await stressTestService.runSimulation(portfolioData, macroFactors);
      setResults(simulationResults);
      return simulationResults;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getHistoricalResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const historicalResults = await stressTestService.getHistoricalResults();
      return historicalResults;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    results,
    runSimulation,
    getHistoricalResults
  };
};