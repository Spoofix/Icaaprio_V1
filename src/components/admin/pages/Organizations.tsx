import React from 'react';
import { useOrganizations } from '../../../hooks/admin/useOrganizations';
import { Building2, Users, Key, Settings } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

export default function Organizations() {
  const { organizations, isLoading, error, updateOrganization } = useOrganizations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-400">Error loading organizations</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Organizations</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Organization
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {organizations?.map((org) => (
          <div key={org.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{org.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                org.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {org.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  Seats
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {org.usedSeats} / {org.seats}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Key className="w-4 h-4 mr-2" />
                  API Keys
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {org.apiKeys.length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Building2 className="w-4 h-4 mr-2" />
                  Plan
                </div>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {org.plan}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {/* Handle settings */}}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Settings className="w-4 h-4 mr-1" />
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}