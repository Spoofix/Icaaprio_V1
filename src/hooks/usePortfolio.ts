import { useState, useCallback } from 'react';
import { portfolioService } from '../services/portfolio';

export const usePortfolio = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadData = useCallback(async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await portfolioService.uploadData(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAnalysis = useCallback(async (portfolioId: string) => {
    setLoading(true);
    setError(null);
    try {
      const analysis = await portfolioService.getAnalysis(portfolioId);
      return analysis;
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
    uploadData,
    getAnalysis
  };
};