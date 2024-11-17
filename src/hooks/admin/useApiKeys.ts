import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiKeyService } from '../../services/admin/api-keys';
import type { ApiKey } from '../../types/admin';

export const useApiKeys = (organizationId: string) => {
  const queryClient = useQueryClient();

  const apiKeysQuery = useQuery({
    queryKey: ['apiKeys', organizationId],
    queryFn: () => apiKeyService.getApiKeys(organizationId)
  });

  const apiUsageQuery = useQuery({
    queryKey: ['apiUsage', organizationId],
    queryFn: () => Promise.all(
      (apiKeysQuery.data || []).map(key => 
        apiKeyService.getApiUsage(organizationId, key.id)
      )
    ),
    enabled: !!apiKeysQuery.data
  });

  const createApiKey = useMutation({
    mutationFn: (data: Partial<ApiKey>) => 
      apiKeyService.createApiKey(organizationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
    }
  });

  const revokeApiKey = useMutation({
    mutationFn: (keyId: string) => 
      apiKeyService.revokeApiKey(organizationId, keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
    }
  });

  return {
    apiKeys: apiKeysQuery.data,
    apiUsage: apiUsageQuery.data,
    isLoading: apiKeysQuery.isLoading || apiUsageQuery.isLoading,
    error: apiKeysQuery.error || apiUsageQuery.error,
    createApiKey: createApiKey.mutate,
    revokeApiKey: revokeApiKey.mutate
  };
};