import { apiClient } from '../api';

export const riskService = {
  // Calculate risk metrics
  calculateMetrics: async (portfolioData: any) => {
    try {
      const response = await apiClient.post('/api/risk/metrics', portfolioData);
      return response.data;
    } catch (error) {
      console.error('Error calculating risk metrics:', error);
      throw error;
    }
  },

  // Get risk limits
  getRiskLimits: async () => {
    try {
      const response = await apiClient.get('/api/risk/limits');
      return response.data;
    } catch (error) {
      console.error('Error fetching risk limits:', error);
      throw error;
    }
  },

  // Update risk thresholds
  updateThresholds: async (thresholds: any) => {
    try {
      const response = await apiClient.put('/api/risk/thresholds', thresholds);
      return response.data;
    } catch (error) {
      console.error('Error updating risk thresholds:', error);
      throw error;
    }
  }
};