import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../services/admin/users';
import type { User } from '../../types/admin';

export const useUsers = (organizationId?: string) => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users', organizationId],
    queryFn: () => userService.getUsers(organizationId)
  });

  const userActivityQuery = useQuery({
    queryKey: ['userActivity'],
    queryFn: () => Promise.all(
      (usersQuery.data || []).map(user => 
        userService.getUserActivity(user.id)
      )
    ),
    enabled: !!usersQuery.data
  });

  const createUser = useMutation({
    mutationFn: (data: Partial<User>) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  return {
    users: usersQuery.data,
    userActivity: userActivityQuery.data,
    isLoading: usersQuery.isLoading || userActivityQuery.isLoading,
    error: usersQuery.error || userActivityQuery.error,
    createUser: createUser.mutate,
    updateUser: updateUser.mutate
  };
};