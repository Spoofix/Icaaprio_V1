import React, { useState } from 'react';
import { Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  department: string;
  dueDate: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review Q1 Capital Assessment',
    description: 'Conduct detailed review of Q1 capital adequacy calculations and assumptions',
    assignee: 'Sarah Chen',
    department: 'Risk Management',
    dueDate: '2024-03-25',
    status: 'in-review',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Update Market Risk Parameters',
    description: 'Incorporate latest market volatility data into stress test scenarios',
    assignee: 'Michael Wong',
    department: 'Market Risk',
    dueDate: '2024-03-28',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Validate Stress Test Results',
    description: 'Independent validation of severe scenario outcomes',
    assignee: 'Emily Johnson',
    department: 'Model Validation',
    dueDate: '2024-04-01',
    status: 'approved',
    priority: 'high'
  }
];

const departments = [
  'Risk Management',
  'Market Risk',
  'Credit Risk',
  'Model Validation',
  'Executive Leadership',
  'Internal Audit'
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredTasks = selectedDepartment === 'all'
    ? tasks
    : tasks.filter(task => task.department === selectedDepartment);

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'in-review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Task Management</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and track ICAAP tasks across departments
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              New Task
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="block w-48 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>

                <div className="mt-4 flex items-center space-x-6 text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    {task.assignee}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {task.department}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    Due: {task.dueDate}
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${task.priority === 'high' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    View Details
                  </button>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Add Comment
                  </button>
                  {task.status === 'in-review' && (
                    <>
                      <button className="text-sm text-green-600 dark:text-green-400 hover:underline">
                        Approve
                      </button>
                      <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}