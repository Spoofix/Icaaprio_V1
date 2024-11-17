import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MetricsOverviewProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'positive' | 'negative' | 'neutral';
}

export default function MetricsOverview({ title, value, change, icon, trend }: MetricsOverviewProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const TrendIcon = () => {
    switch (trend) {
      case 'positive':
        return <ArrowUp className="h-4 w-4" />;
      case 'negative':
        return <ArrowDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 dark:text-gray-400">{title}</span>
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</span>
        <div className={`flex items-center mt-2 ${getTrendColor()}`}>
          <TrendIcon />
          <span className="ml-1 text-sm">{change}</span>
        </div>
      </div>
    </div>
  );
}