import { apiClient } from '../api';

export interface ApiHealth {
  status: 'healthy' | 'unhealthy';
  lastChecked: string;
  services: Array<{
    name: string;
    status: 'up' | 'down';
    latency: number;
  }>;
}

export interface ApiMetrics {
  requestsPerMinute: number;
  cacheHitRate: number;
  cacheDuration: number;
  maxCacheSize: number;
  usageData: Array<{
    timestamp: string;
    requests: number;
  }>;
}

export interface CacheSettings {
  duration: number;
  maxSize: number;
}

export const adminService = {
  getApiHealth: async (): Promise<ApiHealth> => {
    try {
      const response = await apiClient.get<ApiHealth>('/api/admin/health');
      return response.data;
    } catch (error) {
      // Return a default health status instead of throwing
      return {
        status: 'unhealthy',
        lastChecked: new Date().toISOString(),
        services: []
      };
    }
  },

  getApiMetrics: async (timeframe: string): Promise<ApiMetrics> => {
    try {
      const response = await apiClient.get<ApiMetrics>(`/api/admin/metrics?timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      // Return default metrics instead of throwing
      return {
        requestsPerMinute: 0,
        cacheHitRate: 0,
        cacheDuration: 300,
        maxCacheSize: 100,
        usageData: []
      };
    }
  },

  updateCacheSettings: async (settings: CacheSettings): Promise<CacheSettings> => {
    const response = await apiClient.put<CacheSettings>('/api/admin/cache/settings', settings);
    return response.data;
  },

  clearCache: async (target: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>(
      '/api/admin/cache/clear',
      { target }
    );
    return response.data;
  }
};