import { useState, useCallback } from 'react';
import { riskService } from '../services/risk';

export const useRisk = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateMetrics = useCallback(async (portfolioData: any) => {
    setLoading(true);
    setError(null);
    try {
      const metrics = await riskService.calculateMetrics(portfolioData);
      return metrics;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRiskLimits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const limits = await riskService.getRiskLimits();
      return limits;
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
    calculateMetrics,
    getRiskLimits
  };
};