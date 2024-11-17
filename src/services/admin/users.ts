import { apiClient } from '../api';
import { User, UserActivity } from '../../types/admin';

export const userService = {
  getUsers: async (organizationId?: string) => {
    const url = organizationId 
      ? `/api/admin/organizations/${organizationId}/users`
      : '/api/admin/users';
    const response = await apiClient.get<User[]>(url);
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await apiClient.get<User>(`/api/admin/users/${id}`);
    return response.data;
  },

  createUser: async (data: Partial<User>) => {
    const response = await apiClient.post<User>('/api/admin/users', data);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>) => {
    const response = await apiClient.put<User>(`/api/admin/users/${id}`, data);
    return response.data;
  },

  getUserActivity: async (userId: string) => {
    const response = await apiClient.get<UserActivity[]>(`/api/admin/users/${userId}/activity`);
    return response.data;
  }
};