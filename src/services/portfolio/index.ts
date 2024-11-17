import { apiClient } from '../api';

export const portfolioService = {
  // Upload portfolio data
  uploadData: async (data: FormData) => {
    try {
      const response = await apiClient.post('/api/portfolio/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading portfolio data:', error);
      throw error;
    }
  },

  // Get portfolio analysis
  getAnalysis: async (portfolioId: string) => {
    try {
      const response = await apiClient.get(`/api/portfolio/${portfolioId}/analysis`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio analysis:', error);
      throw error;
    }
  },

  // Get portfolio metrics
  getMetrics: async (portfolioId: string) => {
    try {
      const response = await apiClient.get(`/api/portfolio/${portfolioId}/metrics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio metrics:', error);
      throw error;
    }
  }
};