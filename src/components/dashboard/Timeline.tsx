import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const timelineData = [
  {
    title: 'Capital Assessment Updated',
    time: '2 hours ago',
    status: 'success',
  },
  {
    title: 'Stress Test Completed',
    time: '5 hours ago',
    status: 'success',
  },
  {
    title: 'Risk Review Required',
    time: '1 day ago',
    status: 'warning',
  },
];

export default function Timeline() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {timelineData.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            {item.status === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}