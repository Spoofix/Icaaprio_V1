import React from 'react';
import { BarChart3, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import StressTestCard from './StressTestCard';
import MetricsOverview from './MetricsOverview';
import TasksList from './TasksList';
import Timeline from './Timeline';

export default function DashboardLayout() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsOverview
          title="Capital Ratio"
          value="12.5%"
          change="+0.8%"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="positive"
        />
        <MetricsOverview
          title="Risk Weight"
          value="85.2%"
          change="-1.2%"
          icon={<AlertCircle className="h-6 w-6" />}
          trend="negative"
        />
        <MetricsOverview
          title="Pending Tasks"
          value="8"
          change="+2"
          icon={<Clock className="h-6 w-6" />}
          trend="neutral"
        />
        <MetricsOverview
          title="Stress Tests"
          value="3"
          change="0"
          icon={<BarChart3 className="h-6 w-6" />}
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StressTestCard />
        <Timeline />
      </div>

      <TasksList />
    </div>
  );
}