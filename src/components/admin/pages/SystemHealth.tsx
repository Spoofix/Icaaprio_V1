import React from 'react';
import { useAdmin } from '../../../hooks/useAdmin';
import { Activity, Database, Server, AlertTriangle } from 'lucide-react';

export default function SystemHealth() {
  const { health, metrics, isLoading, error } = useAdmin();

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
        <p className="text-red-600 dark:text-red-400">Error loading system health data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Health</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          health?.status === 'healthy'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {health?.status === 'healthy' ? 'All Systems Operational' : 'System Issues Detected'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {health?.services.map((service) => (
          <div key={service.name} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Server className="w-5 h-5 text-gray-400 mr-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {service.name}
                </h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                service.status === 'up'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {service.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Latency: {service.latency}ms
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          System Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                CPU Usage
              </h4>
              <Activity className="w-4 h-4 text-gray-400" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              45%
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Memory Usage
              </h4>
              <Database className="w-4 h-4 text-gray-400" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              2.1 GB
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Disk Usage
              </h4>
              <Server className="w-4 h-4 text-gray-400" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              68%
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Error Rate
              </h4>
              <AlertTriangle className="w-4 h-4 text-gray-400" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
              0.02%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}