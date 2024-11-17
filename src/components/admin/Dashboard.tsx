import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { Activity, Database, RefreshCw, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { health, metrics, isLoading, error, updateCacheSettings, clearCache } = useAdmin();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
          <p className="text-red-700 dark:text-red-300">
            {error instanceof Error ? error.message : 'An error occurred loading dashboard data'}
          </p>
        </div>
      </div>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* API Health Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">API Status</h3>
            <Activity className={`w-5 h-5 ${health?.status === 'healthy' ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Last checked: {health?.lastChecked ? formatTimestamp(health.lastChecked) : 'N/A'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cache Status</h3>
            <Database className="w-5 h-5 text-blue-500" />
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Hit Rate: {metrics?.cacheHitRate ?? 0}%
          </p>
          <button
            onClick={() => clearCache('all')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Clear Cache
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Request Rate</h3>
            <RefreshCw className="w-5 h-5 text-blue-500" />
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {metrics?.requestsPerMinute ?? 0} req/min
          </p>
        </div>
      </div>

      {/* API Usage Graph */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">API Usage</h3>
        <div className="h-80">
          {metrics?.usageData && metrics.usageData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatTimestamp}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={formatTimestamp}
                  formatter={(value: number) => [`${value} requests`, 'Requests']}
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#3B82F6"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              No usage data available
            </div>
          )}
        </div>
      </div>

      {/* Cache Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Cache Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cache Duration (minutes)
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              defaultValue={metrics?.cacheDuration ?? 5}
              min={1}
              max={60}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value)) {
                  updateCacheSettings({ duration: value, maxSize: metrics?.maxCacheSize ?? 100 });
                }
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Cache Size (MB)
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              defaultValue={metrics?.maxCacheSize ?? 100}
              min={10}
              max={1000}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value)) {
                  updateCacheSettings({ maxSize: value, duration: metrics?.cacheDuration ?? 5 });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}