import { apiClient } from '../api';
import { ApiKey, ApiUsage } from '../../types/admin';

export const apiKeyService = {
  getApiKeys: async (organizationId: string) => {
    const response = await apiClient.get<ApiKey[]>(`/api/admin/organizations/${organizationId}/api-keys`);
    return response.data;
  },

  createApiKey: async (organizationId: string, data: Partial<ApiKey>) => {
    const response = await apiClient.post<ApiKey>(`/api/admin/organizations/${organizationId}/api-keys`, data);
    return response.data;
  },

  revokeApiKey: async (organizationId: string, keyId: string) => {
    const response = await apiClient.delete<{ success: boolean }>(
      `/api/admin/organizations/${organizationId}/api-keys/${keyId}`
    );
    return response.data;
  },

  getApiUsage: async (organizationId: string, keyId: string) => {
    const response = await apiClient.get<ApiUsage[]>(
      `/api/admin/organizations/${organizationId}/api-keys/${keyId}/usage`
    );
    return response.data;
  }
};