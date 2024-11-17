import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Download } from 'lucide-react';

export default function Analytics() {
  const data = [
    { date: '2024-03-01', requests: 1200, errors: 23 },
    { date: '2024-03-02', requests: 1300, errors: 18 },
    { date: '2024-03-03', requests: 1400, errors: 25 },
    { date: '2024-03-04', requests: 1100, errors: 15 },
    { date: '2024-03-05', requests: 1500, errors: 30 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Usage Analytics</h2>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </button>
          <button className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Requests</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">6,500</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Rate</h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">1.8%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Avg Response Time</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">245ms</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Request Volume</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Bar dataKey="requests" name="Requests" fill="#3B82F6" />
              <Bar dataKey="errors" name="Errors" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}