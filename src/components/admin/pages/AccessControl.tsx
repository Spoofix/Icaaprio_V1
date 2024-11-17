import React from 'react';
import { Shield, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AccessControl() {
  const roles = [
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Can manage users and view analytics',
      permissions: ['users.manage', 'analytics.view']
    },
    {
      id: '3',
      name: 'User',
      description: 'Basic access to system features',
      permissions: ['api.use', 'reports.view']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Control</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </button>
      </div>

      <div className="grid gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {role.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {role.description}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Permissions
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}