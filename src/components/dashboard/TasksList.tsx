import React from 'react';
import { Clock, User, FileText } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Review Q1 Capital Assessment',
    assignee: 'Sarah Chen',
    dueDate: '2024-03-25',
    priority: 'high',
    type: 'review',
  },
  {
    id: 2,
    title: 'Update Stress Test Parameters',
    assignee: 'Michael Wong',
    dueDate: '2024-03-28',
    priority: 'medium',
    type: 'update',
  },
  {
    id: 3,
    title: 'Prepare ICAAP Documentation',
    assignee: 'Emily Johnson',
    dueDate: '2024-04-01',
    priority: 'high',
    type: 'document',
  },
];

export default function TasksList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Pending Tasks</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3">Task</th>
              <th className="px-6 py-3">Assignee</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {task.assignee}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {task.dueDate}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${task.priority === 'high' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                    {task.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}