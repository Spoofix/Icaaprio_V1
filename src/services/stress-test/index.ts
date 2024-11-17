import { apiClient } from '../api';
import { MacroFactors } from '../../types/macro';

export const stressTestService = {
  // Run stress test simulation
  runSimulation: async (portfolioData: any, macroFactors: MacroFactors) => {
    try {
      const response = await apiClient.post('/api/stress-test/simulate', {
        portfolioData,
        macroFactors
      });
      return response.data;
    } catch (error) {
      console.error('Error running stress test simulation:', error);
      throw error;
    }
  },

  // Get historical stress test results
  getHistoricalResults: async () => {
    try {
      const response = await apiClient.get('/api/stress-test/historical');
      return response.data;
    } catch (error) {
      console.error('Error fetching historical results:', error);
      throw error;
    }
  },

  // Save stress test results
  saveResults: async (results: any) => {
    try {
      const response = await apiClient.post('/api/stress-test/results', results);
      return response.data;
    } catch (error) {
      console.error('Error saving stress test results:', error);
      throw error;
    }
  }
};