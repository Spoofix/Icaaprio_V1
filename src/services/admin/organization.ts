import { apiClient } from '../api';
import { Organization } from '../../types/admin';

export const organizationService = {
  getOrganizations: async () => {
    const response = await apiClient.get<Organization[]>('/api/admin/organizations');
    return response.data;
  },

  getOrganization: async (id: string) => {
    const response = await apiClient.get<Organization>(`/api/admin/organizations/${id}`);
    return response.data;
  },

  updateOrganization: async (id: string, data: Partial<Organization>) => {
    const response = await apiClient.put<Organization>(`/api/admin/organizations/${id}`, data);
    return response.data;
  },

  updateSeats: async (id: string, seats: number) => {
    const response = await apiClient.put<Organization>(`/api/admin/organizations/${id}/seats`, { seats });
    return response.data;
  },

  toggleFeature: async (id: string, featureId: string, enabled: boolean) => {
    const response = await apiClient.put<Organization>(
      `/api/admin/organizations/${id}/features/${featureId}`,
      { enabled }
    );
    return response.data;
  }
};