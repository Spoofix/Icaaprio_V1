import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';

const riskWeightData = [
  { rating: 'Senior AAA', base: 15, moderate: 20, severe: 30, extreme: 40 },
  { rating: 'Junior AAA', base: 20, moderate: 30, severe: 45, extreme: 60 },
  { rating: 'AA', base: 30, moderate: 45, severe: 65, extreme: 85 },
  { rating: 'A', base: 50, moderate: 75, severe: 100, extreme: 125 },
  { rating: 'BBB', base: 100, moderate: 150, severe: 200, extreme: 250 }
];

export function RiskWeightAnalysis() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="group relative mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          Risk Weight Analysis
          <Info className="w-4 h-4 ml-2 text-gray-400" />
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64">
          Risk weight sensitivity across different rating categories under stress scenarios
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={riskWeightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="base" name="Base" stroke="#3B82F6" />
            <Line type="monotone" dataKey="moderate" name="Moderate" stroke="#F59E0B" />
            <Line type="monotone" dataKey="severe" name="Severe" stroke="#EF4444" />
            <Line type="monotone" dataKey="extreme" name="Extreme" stroke="#7C3AED" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}