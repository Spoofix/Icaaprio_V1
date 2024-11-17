import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '../../services/admin/organization';
import type { Organization } from '../../types/admin';

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const organizationsQuery = useQuery({
    queryKey: ['organizations'],
    queryFn: organizationService.getOrganizations
  });

  const updateOrganization = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Organization> }) =>
      organizationService.updateOrganization(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    }
  });

  const updateSeats = useMutation({
    mutationFn: ({ id, seats }: { id: string; seats: number }) =>
      organizationService.updateSeats(id, seats),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    }
  });

  const toggleFeature = useMutation({
    mutationFn: ({ id, featureId, enabled }: { id: string; featureId: string; enabled: boolean }) =>
      organizationService.toggleFeature(id, featureId, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    }
  });

  return {
    organizations: organizationsQuery.data,
    isLoading: organizationsQuery.isLoading,
    error: organizationsQuery.error,
    updateOrganization: updateOrganization.mutate,
    updateSeats: updateSeats.mutate,
    toggleFeature: toggleFeature.mutate
  };
};