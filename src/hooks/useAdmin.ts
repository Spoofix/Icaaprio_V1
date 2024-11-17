import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/admin';
import type { CacheSettings } from '../services/admin';

export function useAdmin() {
  const queryClient = useQueryClient();

  // API Health Query
  const healthQuery = useQuery({
    queryKey: ['apiHealth'],
    queryFn: () => adminService.getApiHealth(),
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    useErrorBoundary: false, // Handle errors gracefully
    staleTime: 10000, // Consider data stale after 10 seconds
  });

  // API Metrics Query
  const metricsQuery = useQuery({
    queryKey: ['apiMetrics'],
    queryFn: () => adminService.getApiMetrics('24h'),
    refetchInterval: 60000, // Refresh every minute
    retry: 3,
    useErrorBoundary: false, // Handle errors gracefully
    staleTime: 30000, // Consider data stale after 30 seconds
  });

  // Cache Settings Mutation
  const cacheMutation = useMutation({
    mutationFn: (settings: CacheSettings) => adminService.updateCacheSettings(settings),
    onSuccess: () => {
      // Invalidate and refetch metrics after cache settings update
      queryClient.invalidateQueries({ queryKey: ['apiMetrics'] });
    }
  });

  // Clear Cache Mutation
  const clearCacheMutation = useMutation({
    mutationFn: (target: string) => adminService.clearCache(target),
    onSuccess: () => {
      // Invalidate and refetch metrics after cache clear
      queryClient.invalidateQueries({ queryKey: ['apiMetrics'] });
    }
  });

  return {
    health: healthQuery.data,
    metrics: metricsQuery.data,
    isLoading: healthQuery.isLoading || metricsQuery.isLoading,
    error: healthQuery.error || metricsQuery.error,
    updateCacheSettings: cacheMutation.mutate,
    clearCache: clearCacheMutation.mutate,
    isError: healthQuery.isError || metricsQuery.isError,
    isFetching: healthQuery.isFetching || metricsQuery.isFetching,
  };
}