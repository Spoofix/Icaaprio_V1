import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Building, Info, AlertTriangle } from 'lucide-react';

interface LTVMigrationData {
  originalLTV: string;
  baseCount: number;
  moderateCount: number;
  severeCount: number;
  extremeCount: number;
  propertyType: string;
  region: string;
}

export const LTVAnalysis: React.FC = () => {
  const ltvMigrationData: LTVMigrationData[] = [
    {
      originalLTV: "<50%",
      baseCount: 1000,
      moderateCount: 800,
      severeCount: 600,
      extremeCount: 400,
      propertyType: "Residential",
      region: "Ontario"
    },
    {
      originalLTV: "50-60%",
      baseCount: 2000,
      moderateCount: 1500,
      severeCount: 1000,
      extremeCount: 800,
      propertyType: "Residential",
      region: "Ontario"
    },
    {
      originalLTV: "60-70%",
      baseCount: 3000,
      moderateCount: 2000,
      severeCount: 1500,
      extremeCount: 1000,
      propertyType: "Residential",
      region: "Ontario"
    },
    {
      originalLTV: "70-75%",
      baseCount: 2500,
      moderateCount: 1500,
      severeCount: 1000,
      extremeCount: 500,
      propertyType: "Residential",
      region: "Ontario"
    },
    {
      originalLTV: ">75%",
      baseCount: 1500,
      moderateCount: 800,
      severeCount: 400,
      extremeCount: 200,
      propertyType: "Residential",
      region: "Ontario"
    }
  ];

  const propertyValueDeclines = {
    moderate: {
      residential: -15,
      commercial: -20,
      industrial: -18
    },
    severe: {
      residential: -25,
      commercial: -35,
      industrial: -30
    },
    extreme: {
      residential: -35,
      commercial: -45,
      industrial: -40
    }
  };

  const historicalEvents = [
    {
      event: "2008 Crisis",
      residentialDecline: -28,
      commercialDecline: -42,
      industrialDecline: -38,
      recoveryPeriod: "24 months"
    },
    {
      event: "2015 Oil Shock",
      residentialDecline: -12,
      commercialDecline: -18,
      industrialDecline: -15,
      recoveryPeriod: "12 months"
    },
    {
      event: "2020 COVID",
      residentialDecline: -15,
      commercialDecline: -25,
      industrialDecline: -20,
      recoveryPeriod: "18 months"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          LTV Migration Analysis
        </h3>
        <div className="flex items-center">
          <Building className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-sm text-blue-600 dark:text-blue-400">
            Portfolio Mapping
          </span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ltvMigrationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="originalLTV" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="baseCount" 
              name="Base" 
              stroke="#3B82F6" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="moderateCount" 
              name="Moderate Stress" 
              stroke="#F59E0B" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="severeCount" 
              name="Severe Stress" 
              stroke="#EF4444" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="extremeCount" 
              name="Extreme Stress" 
              stroke="#7C3AED" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {historicalEvents.map((event) => (
          <div key={event.event} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {event.event}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Residential</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {event.residentialDecline}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Commercial</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {event.commercialDecline}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Recovery</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {event.recoveryPeriod}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};