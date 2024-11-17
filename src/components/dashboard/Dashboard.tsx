import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, AlertCircle, TrendingUp, Users, Building2, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StressTestCard from './StressTestCard';
import Timeline from './Timeline';
import TasksList from './TasksList';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const metrics = [
    {
      title: 'Capital Ratio',
      value: '12.5%',
      change: '+0.8%',
      trend: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Risk-Weighted Assets',
      value: '$8.5B',
      change: '-1.2%',
      trend: 'negative',
      icon: Building2
    },
    {
      title: 'Active ICAAPs',
      value: '3',
      change: '+1',
      trend: 'neutral',
      icon: FileText
    },
    {
      title: 'Collaborators',
      value: '12',
      change: '+2',
      trend: 'positive',
      icon: Users
    }
  ];

  const recentICAAPList = [
    { id: '1', title: 'ICAAP 2024', status: 'draft', updatedAt: '2024-03-15' },
    { id: '2', title: 'ICAAP 2023', status: 'approved', updatedAt: '2023-12-20' }
  ];

  const pendingReviews = [
    { id: '3', title: 'ICAAP 2024 - Q1 Update', assignedBy: 'John Doe', dueDate: '2024-03-30' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.firstName}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here's what's happening with your ICAAPs
          </p>
        </div>
        <button
          onClick={() => navigate('/icaap/new')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New ICAAP
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</span>
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {metric.value}
                </span>
                <span className={`ml-2 text-sm ${
                  metric.trend === 'positive' ? 'text-green-500' :
                  metric.trend === 'negative' ? 'text-red-500' :
                  'text-gray-500'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StressTestCard />
        <Timeline />
      </div>

      {/* Tasks and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Recent ICAAPs
          </h2>
          <div className="space-y-4">
            {recentICAAPList.map((icaap) => (
              <div
                key={icaap.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => navigate(`/icaap/${icaap.id}`)}
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{icaap.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {new Date(icaap.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  icaap.status === 'approved'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {icaap.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Pending Reviews
          </h2>
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => navigate(`/icaap/${review.id}/review`)}
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{review.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Assigned by: {review.assignedBy}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due date: {new Date(review.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TasksList />
    </div>
  );
}